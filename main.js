/* ============================================================
   Xinghao Wang — Pokemon Pixel Style GitHub Profile
   交互：贡献图生成 / 滚动出现 / 导航高亮 / 移动菜单
   ============================================================ */

(function () {
  "use strict";

  /* ---- 像素贡献图（随机绿色格子） ---- */
  var graph = document.getElementById("contribGraph");
  if (graph) {
    var COLS = 16, ROWS = 5;
    var frag = document.createDocumentFragment();
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var cell = document.createElement("i");
        var lv = Math.random();
        if (lv > 0.82)      cell.dataset.lv = "4";
        else if (lv > 0.62) cell.dataset.lv = "3";
        else if (lv > 0.38) cell.dataset.lv = "2";
        else if (lv > 0.18) cell.dataset.lv = "1";
        var n = cell.dataset.lv ? cell.dataset.lv * 3 : 0;
        cell.title = n === 0 ? "休息日：去宝可梦中心恢复体力" : "捕获了 " + n + " 只 bug！";
        frag.appendChild(cell);
      }
    }
    graph.appendChild(frag);
  }

  /* ---- 滚动出现（跳帧像素动画） ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- 左侧图鉴列表：点击高亮 ---- */
  var listLinks = document.querySelectorAll(".repolist a");
  listLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      listLinks.forEach(function (x) { x.classList.remove("is-active"); });
      a.classList.add("is-active");
    });
  });

  /* ---- 导航按钮 scrollspy ---- */
  var navBtns = document.querySelectorAll(".nav__links a");
  var sections = [];
  navBtns.forEach(function (btn) {
    var id = btn.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var sec = document.querySelector(id);
      if (sec) sections.push({ btn: btn, sec: sec });
    }
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navBtns.forEach(function (b) { b.classList.remove("is-active"); });
          var hit = sections.find(function (s) { return s.sec === entry.target; });
          if (hit) hit.btn.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s.sec); });
  }

  /* ---- 移动端菜单 ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---- 页脚年份 ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
