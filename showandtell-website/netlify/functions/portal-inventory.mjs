// The staff portal's Inventory tool. Every request needs the staff code (header x-portal-code).
// GET  /api/portal/inventory                                    — every counted product and the latest changes
// POST /api/portal/inventory {action:'set', product, count, low, reason, staff}  — set the count (and the "low at" number)
// POST /api/portal/inventory {action:'adjust', product, change, reason, staff}   — add or take away some
// POST /api/portal/inventory {action:'remove', product, staff}                   — stop counting a product
// Sending a receipt also takes its products off (see takeOffReceipt in netlify/lib/portal.mjs).
import { store, checkCode, json, getStock, saveStock, logChange, productName, whole } from '../lib/portal.mjs';

const view = (inv) => json({ items: inv.items, log: inv.log.slice(0, 100) });

export default async (req) => {
  const wrong = await checkCode(req);
  if (wrong) return wrong;
  const s = store();
  if (req.method === 'GET') return view(await getStock(s));
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  const body = await req.json().catch(() => ({}));
  const product = productName(body.product);
  if (!product) return json({ error: 'invalid', message: 'Choose a product.' }, 400);
  const inv = await getStock(s);
  const it = inv.items[product];
  const now = new Date().toISOString();

  if (body.action === 'set') {
    const count = whole(body.count, -99999, 99999);
    if (count === null) return json({ error: 'invalid', message: 'Enter how many are in stock, as a whole number.' }, 400);
    const low = body.low === '' || body.low == null ? null : whole(body.low, 0, 99999);
    if (low === null && !(body.low === '' || body.low == null)) return json({ error: 'invalid', message: 'The “low at” number should be a whole number.' }, 400);
    const before = it ? it.count : 0;
    inv.items[product] = { count, low, updatedAt: now };
    logChange(inv, { product, change: count - before, count, reason: body.reason || (it ? 'Counted' : 'Started counting'), staff: body.staff });
  } else if (body.action === 'adjust') {
    const change = whole(body.change, -99999, 99999);
    if (!change) return json({ error: 'invalid', message: 'Enter how many to add or take away.' }, 400);
    const next = it || { count: 0, low: null };
    next.count += change; next.updatedAt = now;
    inv.items[product] = next;
    logChange(inv, { product, change, count: next.count, reason: body.reason || (change > 0 ? 'Added' : 'Taken away'), staff: body.staff });
  } else if (body.action === 'remove') {
    if (!it) return view(inv);
    delete inv.items[product];
    logChange(inv, { product, change: 0, count: null, reason: 'Stopped counting', staff: body.staff });
  } else {
    return json({ error: 'invalid', message: 'Unknown action.' }, 400);
  }
  await saveStock(s, inv);
  return view(inv);
};

export const config = { path: '/api/portal/inventory' };
