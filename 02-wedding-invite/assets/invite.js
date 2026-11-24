/* =========================================================
   모바일 청첩장 3종 — 동작 스크립트
   이름·날짜·예식장은 index.html 안에서, 날짜/장소는 아래
   WEDDING 객체에서 한 번만 고치면 세 템플릿에 함께 반영됩니다.
   ========================================================= */
(function () {
  "use strict";

  var WEDDING = {
    date: "2027-05-22T12:30:00+09:00",
    venue: {
      name: "메종 드 가든",
      hall: "3층 그랜드홀",
      address: "서울 성동구 서울숲길 24",
      lat: 37.5447,
      lng: 127.0444
    }
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 템플릿 전환 ---------------- */
  var TPLS = ["classic", "editorial", "garden"];
  function currentTpl() {
    var m = /(?:^|[?&])tpl=(classic|editorial|garden)/.exec(location.search);
    return m ? m[1] : "classic";
  }
  function setTpl(tpl, updateUrl) {
    if (TPLS.indexOf(tpl) < 0) tpl = "classic";
    document.body.setAttribute("data-tpl", tpl);
    $$(".inv").forEach(function (el) { el.classList.toggle("is-on", el.id === tpl); });
    $$("[data-tpl-btn]").forEach(function (btn) {
      var on = btn.getAttribute("data-tpl-btn") === tpl;
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var theme = $("#" + tpl + " .hero__photo img");
    if (theme && theme.src) {
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", tpl === "editorial" ? "#111110" : tpl === "garden" ? "#f6f3ea" : "#f8f4ee");
    }
    if (updateUrl && window.history && history.replaceState) {
      history.replaceState(null, "", location.pathname + (tpl === "classic" ? "" : "?tpl=" + tpl) + location.hash);
    }
    fxActivate(tpl);
  }
  $$("[data-tpl-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () { setTpl(btn.getAttribute("data-tpl-btn"), true); });
  });

  /* ---------------- 달력 ---------------- */
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function renderCalendars() {
    var d = new Date(WEDDING.date);
    var y = d.getFullYear(), m = d.getMonth(), day = d.getDate();
    var first = new Date(y, m, 1).getDay();
    var last = new Date(y, m + 1, 0).getDate();
    var heads = ["일", "월", "화", "수", "목", "금", "토"];
    var html = '<table class="cal"><caption>' + y + ". " + pad(m + 1) + '</caption><thead><tr>';
    heads.forEach(function (h, i) { html += '<th scope="col" class="' + (i === 0 ? "is-sun" : i === 6 ? "is-sat" : "") + '">' + h + "</th>"; });
    html += "</tr></thead><tbody>";
    var cells = first + last;
    for (var i = 0; i < Math.ceil(cells / 7) * 7; i++) {
      if (i % 7 === 0) html += "<tr>";
      var num = i - first + 1;
      if (num < 1 || num > last) {
        html += "<td class=\"is-empty\">·</td>";
      } else {
        var cls = [];
        if (num === day) cls.push("is-day");
        if (i % 7 === 0) cls.push("is-sun");
        if (i % 7 === 6) cls.push("is-sat");
        html += '<td' + (cls.length ? ' class="' + cls.join(" ") + '"' : "") + "><b>" + num + "</b></td>";
      }
      if (i % 7 === 6) html += "</tr>";
    }
    html += "</tbody></table>";
    $$("[data-cal]").forEach(function (box) { box.innerHTML = html; });
  }

  /* ---------------- D-day ---------------- */
  function renderDday() {
    var target = new Date(WEDDING.date).getTime();
    var now = Date.now();
    var left = target - now;
    var nodes = $$("[data-dday]");
    if (left <= 0) {
      nodes.forEach(function (n) {
        n.classList.add("is-past");
        n.innerHTML = "<b>함께해 주셔서 감사합니다</b>";
      });
      return;
    }
    var days = Math.ceil(left / 86400000);
    var hours = Math.floor((left % 86400000) / 3600000);
    var isHero = function (n) { return !!n.closest(".hero__meta, .card, .hero__dday"); };
    nodes.forEach(function (n) {
      n.innerHTML = isHero(n)
        ? "<b>D-" + days + "</b>"
        : "<b>D-" + days + "</b><span>" + days + "일 " + hours + "시간 남음</span>";
    });
  }

  /* ---------------- 혼주 연락 ---------------- */
  var dlg = $("#contactDlg");
  $$("[data-contact]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (dlg && dlg.showModal) dlg.showModal();
    });
  });
  if (dlg) {
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) dlg.close();
    });
  }

  /* ---------------- 계좌 아코디언 ---------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-acc-btn]");
    if (!btn) return;
    var item = btn.closest(".acc__item");
    var open = item.classList.toggle("on");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------------- 복사 ---------------- */
  var toastEl = $("#toast");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("on"); }, 1900);
  }
  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  function copy(text, msg) {
    text = (text || "").trim();
    if (!text) return;
    var done = function (ok) { toast(ok ? msg : "복사하지 못했습니다. 길게 눌러 복사해 주세요."); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(legacyCopy(text)); });
    } else {
      done(legacyCopy(text));
    }
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var val = btn.getAttribute("data-copy");
    var msg = /^[0-9-]/.test(val) ? "계좌번호를 복사했습니다" : "주소를 복사했습니다";
    if (/은행|뱅크/.test(val)) msg = "계좌번호를 복사했습니다";
    copy(val, msg);
  });
  $$("[data-copy-link]").forEach(function (btn) {
    btn.addEventListener("click", function () { copy(location.href, "청첩장 링크를 복사했습니다"); });
  });
  $$("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var data = {
        title: "김도현 · 이서연의 결혼식에 초대합니다",
        text: "2027년 5월 22일 토요일, 메종 드 가든",
        url: location.href
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else {
        copy(location.href, "청첩장 링크를 복사했습니다");
      }
    });
  });

  /* ---------------- 지도 링크 ---------------- */
  function renderMaps() {
    var v = WEDDING.venue;
    var q = encodeURIComponent(v.name + " " + v.address);
    var naver = "https://map.naver.com/p/search/" + q;
    var kakao = "https://map.kakao.com/link/search/" + q;
    var tmap = "tmap://route?goalname=" + encodeURIComponent(v.name) + "&goalx=" + v.lng + "&goaly=" + v.lat;
    $$("[data-map]").forEach(function (a) {
      var kind = a.getAttribute("data-map");
      a.href = kind === "naver" ? naver : kind === "kakao" ? kakao : tmap;
      if (kind !== "tmap") { a.target = "_blank"; a.rel = "noopener"; }
    });
  }

  /* ---------------- 라이트박스 ---------------- */
  var lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap"), lbCount = $("#lbCount");
  var lbList = [], lbIndex = 0, lbReturn = null, touchX = null;

  function openLb(list, index, opener) {
    lbList = list; lbIndex = index; lbReturn = opener || null;
    paintLb();
    lb.classList.add("on");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#lbClose").focus({ preventScroll: true });
  }
  function paintLb() {
    var a = lbList[lbIndex];
    if (!a) return;
    var img = a.querySelector("img");
    lbImg.src = a.getAttribute("href");
    lbImg.alt = img ? img.alt : "";
    lbCap.textContent = a.getAttribute("data-cap") || "";
    lbCount.textContent = (lbIndex + 1) + " / " + lbList.length;
    var multi = lbList.length > 1;
    $("#lbPrev").style.display = multi ? "" : "none";
    $("#lbNext").style.display = multi ? "" : "none";
  }
  function closeLb() {
    lb.classList.remove("on");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.removeAttribute("src");
    if (lbReturn && lbReturn.focus) lbReturn.focus({ preventScroll: true });
  }
  function stepLb(dir) {
    if (!lbList.length) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    paintLb();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".gal a");
    if (!a) return;
    e.preventDefault();
    var list = $$("a", a.closest(".gal"));
    openLb(list, list.indexOf(a), a);
  });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", function () { stepLb(-1); });
  $("#lbNext").addEventListener("click", function () { stepLb(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  lb.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 42) stepLb(dx < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") stepLb(1);
    else if (e.key === "ArrowLeft") stepLb(-1);
  });

  /* ---------------- 모바일 상단 바 숨김 ---------------- */
  var bar = $("#bar"), lastY = window.pageYOffset;
  window.addEventListener("scroll", function () {
    var y = window.pageYOffset;
    if (!bar || window.innerWidth >= 1000) { if (bar) bar.classList.remove("hide"); lastY = y; return; }
    if (y > 90 && y > lastY + 6) bar.classList.add("hide");
    else if (y < lastY - 6 || y < 90) bar.classList.remove("hide");
    lastY = y;
  }, { passive: true });

  /* ---------------- 히어로 미세 시차 ---------------- */
  var parallax = { y: 0, running: false };
  function onScrollParallax() {
    if (REDUCE) return;
    parallax.y = window.pageYOffset;
    if (parallax.running) return;
    parallax.running = true;
    requestAnimationFrame(function () {
      var img = $("#" + document.body.getAttribute("data-tpl") + " .hero__photo img");
      if (img && parallax.y < 900) {
        img.style.transform = "translate3d(0," + (parallax.y * 0.1).toFixed(1) + "px,0)";
      }
      parallax.running = false;
    });
  }
  window.addEventListener("scroll", onScrollParallax, { passive: true });

  /* ---------------- WebGL 먼지·꽃잎 ---------------- */
  var FX = {};
  var FX_THEMES = {
    classic: { count: 90, size: [0.05, 0.15], colors: ["#f0d3a4", "#dcb37c", "#fff0d6"], rise: 0.00035, sway: 0.5, blend: "add", opacity: 0.62 },
    editorial: { count: 130, size: [0.015, 0.06], colors: ["#ffffff", "#d9d5cc", "#a9a59d"], rise: 0.00018, sway: 0.25, blend: "normal", opacity: 0.55 },
    garden: { count: 44, size: [0.18, 0.42], colors: ["#f2f0e2", "#d6ddc2", "#b9c9a6"], fall: 0.0012, sway: 1.4, blend: "normal", opacity: 0.8, petal: true }
  };

  function texture(kind) {
    var s = 64, c = document.createElement("canvas");
    c.width = c.height = s;
    var g = c.getContext("2d");
    if (kind === "petal") {
      g.translate(s / 2, s / 2);
      g.rotate(-0.6);
      var pg = g.createRadialGradient(0, 0, 1, 0, 0, 30);
      pg.addColorStop(0, "rgba(255,255,255,.98)");
      pg.addColorStop(0.55, "rgba(255,255,255,.55)");
      pg.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = pg;
      g.beginPath();
      g.ellipse(0, 0, 30, 15, 0, 0, Math.PI * 2);
      g.fill();
    } else {
      var rg = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      rg.addColorStop(0, "rgba(255,255,255,1)");
      rg.addColorStop(0.32, "rgba(255,255,255,.7)");
      rg.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = rg;
      g.fillRect(0, 0, s, s);
    }
    var t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }

  function Drift(canvas, name) {
    var cfg = FX_THEMES[name];
    var THREE = window.THREE;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
    camera.position.z = 14;

    var count = cfg.count;
    var pos = new Float32Array(count * 3);
    var col = new Float32Array(count * 3);
    var vel = new Float32Array(count);
    var phase = new Float32Array(count);
    var scale = new Float32Array(count);
    var color = new THREE.Color();

    for (var i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      color.set(cfg.colors[i % cfg.colors.length]);
      col[i * 3] = color.r; col[i * 3 + 1] = color.g; col[i * 3 + 2] = color.b;
      vel[i] = (cfg.rise || -cfg.fall) * (0.55 + Math.random() * 0.9);
      phase[i] = Math.random() * Math.PI * 2;
      scale[i] = cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]);
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    var sizes = new Float32Array(count);
    for (var k = 0; k < count; k++) sizes[k] = scale[k];
    geo.setAttribute("aScale", new THREE.BufferAttribute(sizes, 1));

    var mat = new THREE.PointsMaterial({
      size: cfg.size[1] * 1.6,
      map: texture(cfg.petal ? "petal" : "dot"),
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      opacity: cfg.opacity,
      sizeAttenuation: true,
      blending: cfg.blend === "add" ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    var points = new THREE.Points(geo, mat);
    scene.add(points);

    var w = 1, h = 1, raf = 0, last = 0, active = false;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    function frame(now) {
      if (!active) return;
      var dt = last ? Math.min(now - last, 48) : 16;
      last = now;
      for (var i = 0; i < count; i++) {
        var yi = i * 3 + 1, xi = i * 3;
        pos[yi] += vel[i] * dt;
        pos[xi] += Math.sin(now * 0.0003 + phase[i]) * cfg.sway * dt * 0.0009;
        if (pos[yi] > 8.5) { pos[yi] = -8.5; pos[xi] = (Math.random() - 0.5) * 18; }
        if (pos[yi] < -8.5) { pos[yi] = 8.5; pos[xi] = (Math.random() - 0.5) * 18; }
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    this.start = function () {
      active = true;
      resize();
      last = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    this.stop = function () {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    var ro = new ResizeObserver(function () { if (active) resize(); });
    ro.observe(canvas);
  }

  function fxActivate(tpl) {
    if (REDUCE || !window.THREE) return;
    if (!FX[tpl]) {
      var cv = document.querySelector('canvas.fx[data-fx="' + tpl + '"]');
      if (!cv) return;
      try { FX[tpl] = new Drift(cv, tpl); } catch (e) { FX[tpl] = null; return; }
    }
    Object.keys(FX).forEach(function (k) {
      if (!FX[k]) return;
      if (k === tpl) FX[k].start(); else FX[k].stop();
    });
  }

  /* ---------------- 시작 ---------------- */
  renderCalendars();
  renderDday();
  setInterval(renderDday, 30000);
  renderMaps();
  setTpl(currentTpl(), false);
  window.addEventListener("load", function () { fxActivate(document.body.getAttribute("data-tpl")); });

  window.__invite = { WEDDING: WEDDING, setTpl: setTpl };
})();
