/*! prof-dil v1.0.0 · rendu de leçons pour le prof IA d'Abdallah · MIT */
(function () {
  "use strict";
  var VERSION = "1.0.0";
  var KATEX = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";

  /* ---------- styles ---------- */
  var CSS = [
    ".dil{--d-fg:var(--text-primary,#0d0d0d);--d-mut:var(--text-secondary,#6b6b6b);--d-line:var(--border,#e3e3e3);--d-soft:var(--surface-1,#f4f4f5);--d-card:var(--surface-2,#ffffff);",
    "--d-acc:#2563EB;--d-acc-bg:#EAF1FF;--d-ok:#15803D;--d-ok-bg:#E7F6EC;--d-bad:#B91C1C;--d-bad-bg:#FDECEC;--d-warn:#B45309;--d-warn-bg:#FEF3C7;--d-vio:#7C3AED;--d-vio-bg:#F1EAFE;",
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:var(--d-fg);display:flex;flex-direction:column;gap:16px;padding:4px 0 8px;-webkit-font-smoothing:antialiased}",
    "@media (prefers-color-scheme:dark){.dil{--d-fg:var(--text-primary,#ececec);--d-mut:var(--text-secondary,#a3a3a3);--d-line:var(--border,#3a3a3a);--d-soft:var(--surface-1,#2a2a2a);--d-card:var(--surface-2,#1f1f1f);",
    "--d-acc:#7FA8FF;--d-acc-bg:rgba(96,140,255,.16);--d-ok:#5FD196;--d-ok-bg:rgba(60,190,120,.15);--d-bad:#F59292;--d-bad-bg:rgba(240,90,90,.15);--d-warn:#F2C062;--d-warn-bg:rgba(240,180,60,.15);--d-vio:#B9A0FF;--d-vio-bg:rgba(150,110,255,.16)}}",
    ".dil *{box-sizing:border-box}.dil p{margin:0}",
    ".dil .h{margin:6px 0 0;font-weight:650;line-height:1.25;letter-spacing:-.01em;text-wrap:balance}",
    ".dil .h.sm{font-size:16px}.dil .h.md{font-size:18px}.dil .h.lg{font-size:21px}.dil .h.xl{font-size:25px}.dil .h.x2{font-size:31px}",
    ".dil .center{text-align:center;align-items:center}",
    ".dil b{font-weight:600}.dil .sec{color:var(--d-mut)}.dil small,.dil .small{font-size:14px}",
    ".dil code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:var(--d-soft);padding:1px 6px;border-radius:6px}",
    ".dil .hl{padding:1px 6px;border-radius:6px;font-weight:600}",
    ".dil .card{border:1.5px solid var(--d-line);border-radius:16px;padding:18px 20px;display:flex;flex-direction:column;gap:12px;background:var(--d-card)}",
    ".dil .card.t-acc{border-color:var(--d-acc)}.dil .card.t-ok{border-color:var(--d-ok)}.dil .card.t-bad{border-color:var(--d-bad)}.dil .card.t-warn{border-color:var(--d-warn)}.dil .card.t-vio{border-color:var(--d-vio)}",
    ".dil .card .ct{font-weight:650;font-size:18px;line-height:1.3}",
    ".dil .note{border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;gap:8px}",
    ".dil .t-acc.note,.dil .bg-acc{background:var(--d-acc-bg)}.dil .t-ok.note,.dil .bg-ok{background:var(--d-ok-bg)}.dil .t-bad.note,.dil .bg-bad{background:var(--d-bad-bg)}.dil .t-warn.note,.dil .bg-warn{background:var(--d-warn-bg)}.dil .t-vio.note,.dil .bg-vio{background:var(--d-vio-bg)}.dil .t-neutral.note,.dil .bg-neutral{background:var(--d-soft)}",
    ".dil .note .nt{font-size:13px;font-weight:650;letter-spacing:.04em;text-transform:uppercase}",
    ".dil .c-acc{color:var(--d-acc)}.dil .c-ok{color:var(--d-ok)}.dil .c-bad{color:var(--d-bad)}.dil .c-warn{color:var(--d-warn)}.dil .c-vio{color:var(--d-vio)}.dil .c-neutral{color:var(--d-mut)}",
    ".dil .badge{align-self:flex-start;display:inline-flex;align-items:center;font-size:12.5px;font-weight:600;padding:3px 10px;border-radius:999px;white-space:nowrap}",
    ".dil .row{display:flex;flex-wrap:wrap;gap:12px;align-items:stretch}.dil .row>*{flex:1 1 140px;min-width:0}",
    ".dil .row.between{justify-content:space-between;align-items:center}.dil .row.between>*{flex:0 1 auto}",
    ".dil .col{display:flex;flex-direction:column;gap:6px;min-width:0}",
    ".dil .grid{display:grid;gap:12px}",
    ".dil .tile{background:var(--d-soft);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:2px;min-width:0}",
    ".dil .tile .tv{font-size:24px;font-weight:650;line-height:1.2;font-variant-numeric:tabular-nums}.dil .tile .tl{font-size:13px;color:var(--d-mut)}",
    ".dil .dot{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;min-width:0}",
    ".dil .dot .ball{border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:650;font-size:15px}",
    ".dil .dot .dl{font-weight:600;font-size:15px}.dil .dot .ds{font-size:13.5px;color:var(--d-mut)}",
    ".dil .prog{display:flex;flex-direction:column;gap:6px}.dil .prog .pt{display:flex;justify-content:space-between;gap:8px;font-size:14px}.dil .prog .pt span:last-child{color:var(--d-mut);font-variant-numeric:tabular-nums}",
    ".dil .bar{height:9px;border-radius:99px;background:var(--d-soft);overflow:hidden}.dil .bar i{display:block;height:100%;border-radius:99px;background:var(--d-acc)}",
    ".dil .f{text-align:center;font-size:20px;overflow-x:auto;padding:4px 0}.dil .f math{font-size:1.1em}.dil .fl{text-align:center;font-size:13.5px;color:var(--d-mut);margin-top:-8px}",
    ".dil .steps{display:flex;flex-direction:column;gap:0}.dil .step{display:flex;gap:14px;position:relative;padding-bottom:16px}.dil .step:last-child{padding-bottom:0}",
    ".dil .step .sn{flex:none;width:28px;height:28px;border-radius:50%;background:var(--d-acc-bg);color:var(--d-acc);font-size:13.5px;font-weight:650;display:flex;align-items:center;justify-content:center;z-index:1}",
    ".dil .steps.line .step:not(:last-child)::before{content:'';position:absolute;left:13.5px;top:28px;bottom:0;width:1.5px;background:var(--d-line)}",
    ".dil .step .sc{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1;padding-top:2px}",
    ".dil ul.bl{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px}",
    ".dil .tbl{overflow-x:auto}.dil table{border-collapse:collapse;width:100%;font-size:15px}.dil th,.dil td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--d-line);vertical-align:top}.dil th{font-weight:600;background:var(--d-soft)}",
    ".dil hr{border:none;border-top:1px solid var(--d-line);margin:4px 0;width:100%}",
    ".dil .tree{display:flex;flex-direction:column;gap:12px}.dil .tree .tq{font-weight:650}",
    ".dil .branches{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}",
    ".dil .branch{border-radius:14px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:8px}",
    ".dil .branch .bl2{font-weight:650}.dil .branch .arr{color:var(--d-mut);line-height:1}",
    ".dil .leaf{width:100%;text-align:center;padding:8px;border-radius:10px;border:1.5px solid currentColor;font-size:15px}",
    ".dil .opts{display:flex;flex-direction:column;gap:8px}",
    ".dil .opt{display:flex;gap:12px;align-items:center;padding:11px 14px;border:1.5px solid var(--d-line);border-radius:12px;font-size:15.5px;cursor:pointer;background:var(--d-card);transition:border-color .12s}",
    ".dil .opt:hover{border-color:var(--d-acc)}.dil .opt.sel{border-color:var(--d-acc);background:var(--d-acc-bg)}",
    ".dil .opt .rk{flex:none;width:18px;height:18px;border-radius:50%;border:1.5px solid var(--d-mut);display:flex;align-items:center;justify-content:center}",
    ".dil .opt.sel .rk{border-color:var(--d-acc)}.dil .opt.sel .rk::after{content:'';width:9px;height:9px;border-radius:50%;background:var(--d-acc)}",
    ".dil .btn{font:inherit;font-size:15px;font-weight:600;padding:11px 16px;border-radius:999px;border:none;background:var(--d-fg);color:var(--d-card);cursor:pointer;width:100%}",
    ".dil .btn.ghost{background:transparent;color:var(--d-fg);border:1.5px solid var(--d-line);width:auto}",
    ".dil .btn:focus-visible,.dil .opt:focus-visible,.dil textarea:focus-visible,.dil input:focus-visible{outline:2px solid var(--d-acc);outline-offset:2px}",
    ".dil .btns{display:flex;gap:8px;flex-wrap:wrap}",
    ".dil .err{font-size:13.5px;color:var(--d-bad);min-height:0}",
    ".dil textarea,.dil input.in{font:inherit;font-size:15.5px;width:100%;padding:10px 12px;border-radius:12px;border:1.5px solid var(--d-line);background:var(--d-card);color:var(--d-fg)}",
    ".dil .bars{display:flex;flex-direction:column;gap:10px}.dil .brow{display:grid;grid-template-columns:minmax(70px,30%) 1fr auto;gap:10px;align-items:center;font-size:14.5px}",
    ".dil .brow .bar{height:12px}.dil .brow .bv{font-variant-numeric:tabular-nums;color:var(--d-mut);font-size:13.5px}",
    ".dil .sent{font-size:13.5px;color:var(--d-mut)}",
    "@media (max-width:480px){.dil{font-size:15.5px}.dil .f{font-size:16px}.dil .h.x2{font-size:26px}.dil .h.xl{font-size:22px}.dil .card{padding:16px}}"
  ].join("");

  function injectCSS(doc) {
    if (doc.getElementById("dil-css")) return;
    var s = doc.createElement("style"); s.id = "dil-css"; s.textContent = CSS; doc.head.appendChild(s);
  }

  /* ---------- outils ---------- */
  var TONES = { acc: 1, ok: 1, bad: 1, warn: 1, vio: 1, neutral: 1 };
  var ALIAS = { info: "acc", accent: "acc", blue: "acc", bleu: "acc", success: "ok", vert: "ok", green: "ok", juste: "ok", danger: "bad", rouge: "bad", red: "bad", faux: "bad", warning: "warn", orange: "warn", purple: "vio", violet: "vio", secondary: "neutral", gris: "neutral", gray: "neutral" };
  function tone(v, d) { v = (v || d || "acc").toLowerCase(); v = ALIAS[v] || v; return TONES[v] ? v : (d || "acc"); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function attr(n, k, d) { var v = n.getAttribute && n.getAttribute(k); return v == null || v === "" ? d : v; }
  function now() { var d = new Date(); return d.getHours() + "h" + String(d.getMinutes()).padStart(2, "0"); }
  function send(text) {
    try { if (typeof window.sendPrompt === "function") { window.sendPrompt(text); return true; } } catch (e) {}
    try { if (window.parent && window.parent.sendPrompt) { window.parent.sendPrompt(text); return true; } } catch (e) {}
    try { navigator.clipboard.writeText(text); } catch (e) {}
    return false;
  }
  function withTime(n, text) { return attr(n, "heure", attr(n, "time", null)) != null ? text + " (il est " + now() + ")" : text; }

  /* ---------- maths ---------- */
  var mathQueue = [];
  function texNode(tex, block) {
    var e = el(block ? "div" : "span", block ? "f" : "m");
    e.setAttribute("data-tex", tex); e.textContent = tex; mathQueue.push(e); return e;
  }
  function renderMath() {
    if (!mathQueue.length) return;
    function go() { mathQueue.splice(0).forEach(function (e) { try { window.katex.render(e.getAttribute("data-tex"), e, { displayMode: e.classList.contains("f"), throwOnError: false, output: "mathml" }); } catch (x) {} }); }
    if (window.katex) return go();
    var s = document.querySelector("script[data-dil-katex]");
    if (!s) { s = document.createElement("script"); s.src = KATEX; s.setAttribute("data-dil-katex", "1"); document.head.appendChild(s); }
    s.addEventListener("load", go);
  }

  /* ---------- rendu ---------- */
  function kids(n, into) { Array.prototype.forEach.call(n.childNodes, function (c) { var r = render(c); if (r) into.appendChild(r); }); return into; }
  function inline(n, tag, cls) { return kids(n, el(tag, cls)); }
  var INL = { b: 1, i: 1, sec: 1, small: 1, code: 1, hl: 1, m: 1, br: 1 };
  function blockKids(n, into) {
    var p = null;
    Array.prototype.forEach.call(n.childNodes, function (c) {
      var isInl = c.nodeType === 3 || (c.nodeType === 1 && INL[c.localName.toLowerCase()]);
      if (isInl) { if (c.nodeType === 3 && !/\S/.test(c.textContent) && !p) return; var r = render(c); if (!r) return; if (!p) { p = el("p"); into.appendChild(p); } p.appendChild(r); }
      else { p = null; var r2 = render(c); if (r2) into.appendChild(r2); }
    });
    return into;
  }

  function render(n) {
    if (n.nodeType === 3) { var t = n.textContent; if (!/\S/.test(t)) return t.length ? document.createTextNode(" ") : null; return document.createTextNode(t.replace(/\s+/g, " ")); }
    if (n.nodeType !== 1) return null;
    var tag = n.localName.toLowerCase(), e, tn;
    switch (tag) {
      case "dil": case "lesson": e = el("div", "dil"); return blockKids(n, e);
      case "h": case "titre":
        var sz = { sm: "sm", md: "md", lg: "lg", xl: "xl", "2xl": "x2", x2: "x2" }[attr(n, "size", "lg")] || "lg";
        e = inline(n, "p", "h " + sz); if (attr(n, "tone")) e.classList.add("c-" + tone(attr(n, "tone"))); if (attr(n, "center") != null) e.classList.add("center"); return e;
      case "p": case "text": e = inline(n, "p"); if (attr(n, "center") != null) e.classList.add("center"); if (attr(n, "small") != null) e.classList.add("small"); if (attr(n, "sec") != null) e.classList.add("sec"); return e;
      case "b": return inline(n, "b");
      case "i": return inline(n, "i");
      case "sec": return inline(n, "span", "sec");
      case "small": return inline(n, "span", "small sec");
      case "code": return inline(n, "code");
      case "hl": tn = tone(attr(n, "tone"), "acc"); return inline(n, "span", "hl bg-" + tn + " c-" + tn);
      case "m": return texNode(n.textContent.trim(), false);
      case "f": case "formule":
        e = document.createDocumentFragment(); e.appendChild(texNode(n.textContent.trim(), true));
        if (attr(n, "label")) e.appendChild(el("p", "fl", attr(n, "label"))); return e;
      case "br": return el("br");
      case "hr": return el("hr");
      case "badge": tn = tone(attr(n, "tone", attr(n, "color")), "acc"); return inline(n, "span", "badge bg-" + tn + " c-" + tn);
      case "card":
        e = el("div", "card t-" + tone(attr(n, "tone"), "neutral")); if (attr(n, "center") != null) e.classList.add("center");
        if (attr(n, "title")) e.appendChild(el("p", "ct", attr(n, "title"))); return blockKids(n, e);
      case "note": case "retiens": case "callout":
        tn = tone(attr(n, "tone"), tag === "retiens" ? "ok" : "acc"); e = el("div", "note t-" + tn);
        var nt = attr(n, "title", tag === "retiens" ? "À retenir" : null); if (nt) e.appendChild(el("p", "nt c-" + tn, nt)); return blockKids(n, e);
      case "row": e = el("div", "row"); if (attr(n, "between") != null) e.classList.add("between"); return kids(n, e);
      case "col": e = el("div", "col"); if (attr(n, "center") != null) e.classList.add("center"); return kids(n, e);
      case "grid": e = el("div", "grid"); e.style.gridTemplateColumns = "repeat(auto-fit,minmax(" + attr(n, "min", "130") + "px,1fr))"; return kids(n, e);
      case "tile": e = el("div", "tile"); e.appendChild(el("span", "tl", attr(n, "label", ""))); tn = attr(n, "tone"); var tv = el("span", "tv" + (tn ? " c-" + tone(tn) : ""), attr(n, "value", n.textContent.trim())); e.appendChild(tv); return e;
      case "dot":
        e = el("div", "dot"); var sz2 = +attr(n, "size", 46); var ball = el("span", "ball", attr(n, "letter", "")); ball.style.width = ball.style.height = sz2 + "px";
        var col = attr(n, "color"); ball.style.background = col ? col : "var(--d-" + tone(attr(n, "tone"), "acc") + ")"; e.appendChild(ball);
        if (attr(n, "label")) e.appendChild(el("span", "dl", attr(n, "label"))); if (attr(n, "sub")) e.appendChild(el("span", "ds", attr(n, "sub"))); return e;
      case "progress": case "progression":
        e = el("div", "prog"); var lab = attr(n, "label"), v = Math.max(0, Math.min(100, +attr(n, "value", 0)));
        if (lab) { var pt = el("div", "pt"); pt.appendChild(el("span", null, lab)); pt.appendChild(el("span", null, attr(n, "text", Math.round(v) + " %"))); e.appendChild(pt); }
        var bar = el("div", "bar"), fill = el("i"); fill.style.width = v + "%"; fill.style.background = "var(--d-" + tone(attr(n, "tone"), "acc") + ")"; bar.appendChild(fill); e.appendChild(bar); return e;
      case "steps": case "list":
        var num = attr(n, "type", tag === "steps" ? "number" : "bullet");
        if (num === "bullet") { e = el("ul", "bl"); Array.prototype.forEach.call(n.children, function (c) { e.appendChild(inline(c, "li")); }); return e; }
        e = el("div", "steps" + (attr(n, "line") != null || tag === "steps" ? " line" : "")); var k = 0;
        Array.prototype.forEach.call(n.children, function (c) { k++; var s = el("div", "step"); s.appendChild(el("span", "sn", attr(c, "n", String(k)))); s.appendChild(kids(c, el("div", "sc"))); e.appendChild(s); }); return e;
      case "table": e = el("div", "tbl"); var tb = el("table"); Array.prototype.forEach.call(n.children, function (r) { var tr = el("tr"); Array.prototype.forEach.call(r.children, function (c) { tr.appendChild(inline(c, c.localName.toLowerCase() === "th" ? "th" : "td")); }); tb.appendChild(tr); }); e.appendChild(tb); return e;
      case "tree":
        e = el("div", "tree"); if (attr(n, "q")) e.appendChild(el("p", "tq", attr(n, "q"))); var bs = el("div", "branches");
        Array.prototype.forEach.call(n.children, function (b) { var t2 = tone(attr(b, "tone"), "acc"); var bx = el("div", "branch bg-" + t2 + " c-" + t2); bx.appendChild(el("span", "bl2", attr(b, "label", ""))); if (b.children.length) bx.appendChild(el("span", "arr", "↓")); Array.prototype.forEach.call(b.children, function (lf) { bx.appendChild(inline(lf, "div", "leaf")); }); bs.appendChild(bx); });
        e.appendChild(bs); if (attr(n, "conclusion")) e.appendChild(el("p", null, attr(n, "conclusion"))); return e;
      case "bars":
        e = el("div", "bars"); var mx = +attr(n, "max", 0); var items = Array.prototype.slice.call(n.children);
        if (!mx) items.forEach(function (b) { mx = Math.max(mx, +attr(b, "value", 0)); });
        items.forEach(function (b) { var r = el("div", "brow"); r.appendChild(el("span", null, attr(b, "label", ""))); var bb = el("div", "bar"), ff = el("i"); ff.style.width = (mx ? (+attr(b, "value", 0) / mx * 100) : 0) + "%"; ff.style.background = attr(b, "color") || "var(--d-" + tone(attr(b, "tone"), "acc") + ")"; bb.appendChild(ff); r.appendChild(bb); r.appendChild(el("span", "bv", attr(b, "text", attr(b, "value", "")))); e.appendChild(r); }); return e;
      case "qcm": return qcm(n);
      case "ask": case "question": return ask(n);
      case "buttons": case "btns":
        e = el("div", "btns"); Array.prototype.forEach.call(n.children, function (b) { var bt = el("button", "btn ghost", b.textContent.trim()); bt.type = "button"; bt.onclick = function () { send(withTime(b, attr(b, "send", b.textContent.trim()))); bt.parentNode.appendChild(el("span", "sent", "Envoyé")); }; e.appendChild(bt); }); return e;
      case "checkpoint": return checkpoint(n);
      case "reprise": return reprise(n);
      case "raw": e = el("div"); e.innerHTML = n.textContent; return e;
      default: return kids(n, el("div"));
    }
  }

  function qcm(n) {
    var box = el("div", "col"); box.style.gap = "10px";
    if (attr(n, "q")) box.appendChild(el("p", "h sm", attr(n, "q")));
    var list = el("div", "opts"), chosen = null, err = el("p", "err");
    Array.prototype.forEach.call(n.children, function (o) {
      var row = el("div", "opt"); row.tabIndex = 0; row.setAttribute("role", "radio"); row.appendChild(el("span", "rk")); row.appendChild(kids(o, el("span")));
      function pick() { Array.prototype.forEach.call(list.children, function (x) { x.classList.remove("sel"); x.setAttribute("aria-checked", "false"); }); row.classList.add("sel"); row.setAttribute("aria-checked", "true"); chosen = attr(o, "send", o.textContent.trim().replace(/\s+/g, " ")); err.textContent = ""; }
      row.onclick = pick; row.onkeydown = function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(); } };
      list.appendChild(row);
    });
    list.setAttribute("role", "radiogroup"); box.appendChild(list);
    var b = el("button", "btn", attr(n, "button", "Valider ma réponse ↗")); b.type = "button";
    b.onclick = function () { if (!chosen) { err.textContent = "Choisis une réponse d'abord."; return; } send(withTime(n, attr(n, "prefix", "Je choisis : ") + chosen)); b.disabled = true; b.textContent = "Réponse envoyée"; };
    box.appendChild(b); box.appendChild(err); return box;
  }

  function ask(n) {
    var box = el("div", "col"); box.style.gap = "10px";
    if (attr(n, "q")) box.appendChild(el("p", "h sm", attr(n, "q")));
    var ta = attr(n, "multiline") != null ? el("textarea") : el("input", "in"); if (ta.tagName === "TEXTAREA") ta.rows = 3; ta.placeholder = attr(n, "placeholder", "Ta réponse");
    var err = el("p", "err"), b = el("button", "btn", attr(n, "button", "Envoyer ↗")); b.type = "button";
    ta.oninput = function () { err.textContent = ""; };
    b.onclick = function () { var v = ta.value.trim(); if (!v) { err.textContent = "Écris ta réponse d'abord."; return; } send(withTime(n, attr(n, "prefix", "") + v)); b.disabled = true; b.textContent = "Réponse envoyée"; };
    box.appendChild(ta); box.appendChild(b); box.appendChild(err); return box;
  }

  function elapsed(start) {
    var m = /^(\d{1,2})[h:](\d{2})$/.exec(start || ""); if (!m) return null;
    var d = new Date(), s = new Date(); s.setHours(+m[1], +m[2], 0, 0); var min = Math.round((d - s) / 60000); if (min < 0) min += 1440;
    return min >= 60 ? Math.floor(min / 60) + " h " + String(min % 60).padStart(2, "0") : min + " min";
  }

  function checkpoint(n) {
    var c = el("div", "card t-acc"); var top = el("div", "row between");
    top.appendChild(el("span", "badge bg-acc c-acc", attr(n, "pos", "Checkpoint")));
    var el2 = elapsed(attr(n, "start")); if (el2) top.appendChild(el("span", "sec small", "Séance : " + el2)); c.appendChild(top);
    if (attr(n, "seance") != null) c.appendChild(render(mk("progress", { label: "Séance", value: attr(n, "seance") })));
    if (attr(n, "voie1") != null) c.appendChild(render(mk("progress", { label: attr(n, "voie1label", "Voie 1 · cours"), value: attr(n, "voie1"), text: attr(n, "voie1text") })));
    if (attr(n, "voie2") != null) c.appendChild(render(mk("progress", { label: attr(n, "voie2label", "Voie 2 · socle maths"), value: attr(n, "voie2"), tone: "ok", text: attr(n, "voie2text") })));
    if (attr(n, "acquis") || attr(n, "consolider")) {
      var g = el("div", "grid"); g.style.gridTemplateColumns = "repeat(auto-fit,minmax(140px,1fr))";
      if (attr(n, "acquis")) g.appendChild(note("ok", "Acquis", attr(n, "acquis"))); if (attr(n, "consolider")) g.appendChild(note("warn", "À consolider", attr(n, "consolider"))); c.appendChild(g);
    }
    return kids(n, c);
  }
  function note(t, title, txt) { var d = el("div", "note t-" + t); d.style.padding = "10px 12px"; d.style.gap = "2px"; d.appendChild(el("p", "nt c-" + t, title)); d.appendChild(el("p", "small", txt)); return d; }
  function mk(tag, a) { var d = document.createElement(tag); Object.keys(a).forEach(function (k) { if (a[k] != null) d.setAttribute(k, a[k]); }); return d; }

  function reprise(n) {
    var c = el("div", "card t-acc"); var top = el("div", "row between");
    top.appendChild(el("p", "h md", attr(n, "titre", "Reprise"))); if (attr(n, "depuis")) top.appendChild(el("span", "badge bg-warn c-warn", attr(n, "depuis"))); c.appendChild(top);
    if (attr(n, "voie1") != null) c.appendChild(render(mk("progress", { label: attr(n, "voie1label", "Voie 1 · cours"), value: attr(n, "voie1"), text: attr(n, "voie1text") })));
    if (attr(n, "voie2") != null) c.appendChild(render(mk("progress", { label: attr(n, "voie2label", "Voie 2 · socle maths"), value: attr(n, "voie2"), tone: "ok", text: attr(n, "voie2text") })));
    var g = el("div", "grid"); g.style.gridTemplateColumns = "repeat(3,minmax(0,1fr))";
    [["temps", "Temps cumulé", null], ["acquis", "Acquis", "ok"], ["consolider", "À consolider", "warn"]].forEach(function (x) { if (attr(n, x[0])) { var t = el("div", "tile"); t.appendChild(el("span", "tl", x[1])); t.appendChild(el("span", "tv" + (x[2] ? " c-" + x[2] : ""), attr(n, x[0]))); g.appendChild(t); } });
    if (g.children.length) c.appendChild(g);
    var info = el("div", "col"); info.style.gap = "2px";
    if (attr(n, "point")) { var p1 = el("p", "small"); p1.appendChild(el("span", "sec", "Point de reprise : ")); p1.appendChild(document.createTextNode(attr(n, "point"))); info.appendChild(p1); }
    if (attr(n, "aujourdhui")) { var p2 = el("p", "small"); p2.appendChild(el("span", "sec", "Aujourd'hui : ")); p2.appendChild(document.createTextNode(attr(n, "aujourdhui"))); info.appendChild(p2); }
    if (info.children.length) c.appendChild(info);
    var bt = el("div", "btns"); var durs = (attr(n, "durees", "30 min|1 h|2 h")).split("|");
    durs.forEach(function (d) { var b = el("button", "btn ghost", "J'ai " + d.trim() + " ↗"); b.type = "button"; b.onclick = function () { send("J'ai " + d.trim() + ", on commence. Il est " + now() + "."); b.parentNode.appendChild(el("span", "sent", "Envoyé")); }; bt.appendChild(b); });
    c.appendChild(bt); return kids(n, c);
  }

  /* ---------- analyse du balisage ---------- */
  function parse(src) {
    var s = src.trim(); if (!/^<(dil|lesson)\b/i.test(s)) s = "<dil>" + s + "</dil>";
    var xmlish = s.replace(/&(?!(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
    var doc = new DOMParser().parseFromString(xmlish, "application/xml");
    if (!doc.getElementsByTagName("parsererror").length) return doc.documentElement;
    var h = new DOMParser().parseFromString(s, "text/html"); return h.body.querySelector("dil,lesson") || h.body;
  }

  function mount(script) {
    if (script.getAttribute("data-dil-done")) return;
    script.setAttribute("data-dil-done", "1");
    var out;
    try { out = render(parse(script.textContent)); }
    catch (e) { out = el("pre", null, script.textContent); }
    if (!out.classList || !out.classList.contains("dil")) { var w = el("div", "dil"); w.appendChild(out); out = w; }
    script.parentNode.insertBefore(out, script);
    renderMath();
  }

  function run() {
    injectCSS(document);
    Array.prototype.forEach.call(document.querySelectorAll('script[type="text/dil"]'), mount);
  }

  window.ProfDIL = { version: VERSION, run: run, render: function (src, target) { injectCSS(document); var o = render(parse(src)); (target || document.body).appendChild(o); renderMath(); return o; } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  new MutationObserver(function () { run(); }).observe(document.documentElement, { childList: true, subtree: true });
})();
