// POST /api/portal/check — is the staff code right? Used when signing in to portal.html.
import { checkCode, json } from '../lib/portal.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  const wrong = await checkCode(req);
  return wrong || json({ ok: true });
};

export const config = { path: '/api/portal/check' };
