(function () {
  "use strict";

  var STORAGE_KEY = "gecc1130-portfolio-draft-v1";
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var statusEl = document.getElementById("draft-status");
  var progressFill = document.getElementById("draft-progress-fill");
  var progressText = document.getElementById("draft-progress-text");
  var saveTimer = null;

  function editableFields() {
    return Array.prototype.slice.call(
      document.querySelectorAll("[contenteditable='true'][id]")
    );
  }

  function fieldFilled(el) {
    var text = (el.textContent || "").replace(/\u00a0/g, " ").trim();
    if (!text) return false;
    var placeholder = el.getAttribute("data-placeholder") || "";
    if (placeholder && text === placeholder.replace(/^【|】$/g, "").trim()) {
      /* keep comparing full placeholder string */
    }
    if (placeholder && text === placeholder) return false;
    if (el.id === "student-name" && text.indexOf("請填寫姓名") !== -1) return false;
    return true;
  }

  function updateProgress() {
    var fields = editableFields();
    var total = fields.length;
    var filled = fields.filter(fieldFilled).length;
    if (progressText) {
      progressText.textContent = filled + " / " + total;
    }
    if (progressFill) {
      var pct = total ? Math.round((filled / total) * 100) : 0;
      progressFill.style.width = pct + "%";
      progressFill.parentElement.setAttribute("aria-valuenow", String(pct));
    }
  }

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function collectDraft() {
    var data = { savedAt: new Date().toISOString(), fields: {} };
    editableFields().forEach(function (el) {
      data.fields[el.id] = el.innerHTML;
    });
    return data;
  }

  function saveDraft(silent) {
    try {
      var data = collectDraft();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (!silent) {
        var t = new Date();
        var hh = String(t.getHours()).padStart(2, "0");
        var mm = String(t.getMinutes()).padStart(2, "0");
        setStatus("已自動儲存（本機）· " + hh + ":" + mm);
      }
      updateProgress();
    } catch (err) {
      setStatus("無法寫入本機儲存（可能處於私密模式）");
    }
  }

  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      saveDraft(false);
    }, 400);
  }

  function restoreDraft() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        updateProgress();
        return;
      }
      var data = JSON.parse(raw);
      if (!data || !data.fields) return;
      editableFields().forEach(function (el) {
        if (Object.prototype.hasOwnProperty.call(data.fields, el.id)) {
          var html = data.fields[el.id];
          if (typeof html === "string" && html.length) {
            el.innerHTML = html;
          }
        }
      });
      if (data.savedAt) {
        var d = new Date(data.savedAt);
        if (!isNaN(d.getTime())) {
          setStatus(
            "已還原本機草稿 · " +
              d.toLocaleString("zh-HK", { hour12: false })
          );
        }
      }
      updateProgress();
    } catch (err) {
      setStatus("草稿還原失敗，可重新填寫");
      updateProgress();
    }
  }

  function plainTextDraft() {
    var lines = [];
    lines.push("GECC1130 反思習作草稿（本機匯出）");
    lines.push("匯出時間：" + new Date().toLocaleString("zh-HK", { hour12: false }));
    lines.push("");
    editableFields().forEach(function (el) {
      var label =
        el.getAttribute("aria-label") ||
        (document.querySelector('label[for="' + el.id + '"]') || {}).textContent ||
        el.id;
      var text = (el.innerText || el.textContent || "").trim();
      lines.push("【" + String(label).trim() + "】");
      lines.push(text || "（空白）");
      lines.push("");
    });
    return lines.join("\n");
  }

  function copyDraft() {
    var text = plainTextDraft();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          setStatus("草稿文字已複製到剪貼簿");
        },
        function () {
          fallbackCopy(text);
        }
      );
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      setStatus("草稿文字已複製到剪貼簿");
    } catch (e) {
      setStatus("複製失敗：請手動選取後複製");
    }
    document.body.removeChild(ta);
  }

  function clearDraft() {
    if (
      !window.confirm(
        "確定清除本機瀏覽器儲存的草稿？頁面上已填的內容也會一併清空。"
      )
    ) {
      return;
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    editableFields().forEach(function (el) {
      if (el.id === "student-name") {
        el.textContent = "【請填寫姓名】";
      } else {
        el.innerHTML = "";
      }
    });
    setStatus("本機草稿已清除");
    updateProgress();
  }

  /* Mobile nav */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "開啟選單");
      });
    });
  }

  /* Smooth scroll + focus */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
    });
  });

  /* Scroll-spy active nav */
  var sectionIds = ["vision", "goals", "timeline", "wellbeing", "review", "closing"];
  var navLinks = sectionIds
    .map(function (id) {
      return document.querySelector('.site-nav a[href="#' + id + '"]');
    })
    .filter(Boolean);

  function updateActiveNav() {
    var headerOffset = 96;
    var current = null;
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var top = el.getBoundingClientRect().top;
      if (top - headerOffset <= 0) current = id;
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var on = current && href === "#" + current;
      link.classList.toggle("is-active", !!on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);

  /* Draft field listeners */
  editableFields().forEach(function (el) {
    el.addEventListener("input", scheduleSave);
    el.addEventListener("blur", function () {
      saveDraft(false);
    });
  });

  var btnCopy = document.getElementById("btn-copy-draft");
  var btnPrint = document.getElementById("btn-print");
  var btnClear = document.getElementById("btn-clear-draft");
  if (btnCopy) btnCopy.addEventListener("click", copyDraft);
  if (btnPrint) btnPrint.addEventListener("click", function () { window.print(); });
  if (btnClear) btnClear.addEventListener("click", clearDraft);

  restoreDraft();
  updateActiveNav();
})();
