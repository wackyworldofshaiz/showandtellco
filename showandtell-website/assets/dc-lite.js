/*
 * dc-lite.js: the small engine that runs the interactive pages
 * (Build your tote, Cards, Patches).
 *
 * Each page keeps its layout inside <template id="dc-template"> and its logic
 * in a `class Component extends DCLogic` with a renderVals() method.
 * This file fills the template with those values and keeps the page updated
 * whenever the component calls setState(). It needs morphdom.min.js.
 *
 * Template syntax:
 *   {{ a.b }}                        insert a value (text or attribute)
 *   <sc-for list="{{ items }}" as="x">  repeat for each item
 *   <sc-if value="{{ flag }}">         show only when flag is true
 *   onClick="{{ fn }}"                 event handlers (also onPointerDown,
 *                                      onPointerMove, onPointerUp,
 *                                      onPointerLeave, onKeyDown, onChange,
 *                                      onFocus)
 */
(function () {
  'use strict';

  var EVENT_ATTRS = {
    onclick: 'click',
    onpointerdown: 'pointerdown',
    onpointermove: 'pointermove',
    onpointerup: 'pointerup',
    onpointerleave: 'pointerleave',
    onkeydown: 'keydown',
    onchange: 'input',
    oninput: 'input',
    onfocus: 'focusin'
  };
  var EVENT_TYPES = ['click', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'keydown', 'input', 'focusin'];
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var SINGLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var parts = path.split('.');
    var v = scope;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function resolve(str, scope) {
    var m = SINGLE.exec(str || '');
    return m ? lookup(m[1], scope) : str;
  }

  function renderNodes(src, scope, out, ctx) {
    var kids = src.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var node = kids[i];
      if (node.nodeType === 3) {
        out.appendChild(document.createTextNode(node.data.indexOf('{{') < 0 ? node.data : interp(node.data, scope)));
        continue;
      }
      if (node.nodeType !== 1) continue;
      var tag = node.localName;

      if (tag === 'sc-for') {
        var list = resolve(node.getAttribute('list'), scope) || [];
        var as = node.getAttribute('as') || 'item';
        for (var j = 0; j < list.length; j++) {
          var s = Object.create(scope);
          s[as] = list[j];
          renderNodes(node, s, out, ctx);
        }
        continue;
      }
      if (tag === 'sc-if') {
        if (resolve(node.getAttribute('value'), scope)) renderNodes(node, scope, out, ctx);
        continue;
      }

      var el = node.namespaceURI && node.namespaceURI !== 'http://www.w3.org/1999/xhtml'
        ? document.createElementNS(node.namespaceURI, node.tagName)
        : document.createElement(tag);
      var textValue = null;
      for (var a = 0; a < node.attributes.length; a++) {
        var attr = node.attributes[a];
        var name = attr.name;
        var lname = name.toLowerCase();
        if (lname.indexOf('hint-') === 0) continue;
        if (EVENT_ATTRS[lname]) {
          var fn = resolve(attr.value, scope);
          if (typeof fn === 'function') {
            var id = 'h' + (ctx.n++);
            ctx.handlers[id] = fn;
            el.setAttribute('data-dc-' + EVENT_ATTRS[lname], id);
          }
          continue;
        }
        var raw = attr.value;
        var val;
        if (raw.indexOf('{{') < 0) {
          val = raw;
        } else if (SINGLE.test(raw)) {
          var v = resolve(raw, scope);
          if (v === false || v == null) continue;
          val = v === true ? '' : String(v);
        } else {
          val = interp(raw, scope);
        }
        if (lname === 'value' && tag === 'textarea') { textValue = val; continue; }
        el.setAttribute(name, val);
      }
      if (textValue != null) {
        el.textContent = textValue;
      } else {
        renderNodes(node, scope, el, ctx);
      }
      out.appendChild(el);
    }
  }

  function wrapEvent(e, el) {
    return new Proxy(e, {
      get: function (t, k) {
        if (k === 'currentTarget') return el;
        var v = t[k];
        return typeof v === 'function' ? v.bind(t) : v;
      }
    });
  }

  function bindEvents(root, ctx) {
    EVENT_TYPES.forEach(function (type) {
      root.addEventListener(type, function (e) {
        var node = e.target;
        var key = 'data-dc-' + type;
        while (node && node !== root.parentNode) {
          if (node.nodeType === 1) {
            var id = node.getAttribute(key);
            if (id && ctx.handlers[id]) ctx.handlers[id](wrapEvent(e, node));
          }
          if (type === 'pointerleave') break; // this event is only for the element itself
          node = node.parentNode;
        }
      }, true);
    });
  }

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (partial) {
    var upd = typeof partial === 'function' ? partial(this.state, this.props) : partial;
    this.state = Object.assign({}, this.state, upd);
    if (this.__schedule) this.__schedule();
  };
  DCLogic.prototype.renderVals = function () { return {}; };

  function mount(Component) {
    var tpl = document.getElementById('dc-template');
    var root = document.getElementById('dc-root');
    var comp = new Component({});
    var ctx = { handlers: {}, n: 0 };
    var queued = false;

    function render() {
      queued = false;
      ctx.handlers = {};
      ctx.n = 0;
      var next = document.createElement('div');
      renderNodes(tpl.content, comp.renderVals(), next, ctx);
      morphdom(root, next, {
        childrenOnly: true,
        onBeforeElUpdated: function (from, to) {
          // Keep accordions open or closed the way the visitor left them.
          if (from.tagName === 'DETAILS') {
            if (from.open) to.setAttribute('open', ''); else to.removeAttribute('open');
          }
          return true;
        }
      });
    }

    comp.__schedule = function () {
      if (!queued) { queued = true; Promise.resolve().then(render); }
    };
    bindEvents(root, ctx);
    render();
  }

  window.DCLogic = DCLogic;
  window.DCLite = { mount: mount };
})();
