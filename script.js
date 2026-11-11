(function () {
  "use strict";

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("[data-nav-links]");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initCountUp() {
    var els = document.querySelectorAll("[data-countup]");
    if (!els.length) return;
    var done = new WeakSet();

    function animate(el) {
      if (done.has(el)) return;
      done.add(el);
      var target = parseFloat(el.getAttribute("data-countup"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1100;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(target * eased);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) animate(entry.target);
          });
        },
        { threshold: 0.5 }
      );
      els.forEach(function (el) { observer.observe(el); });
    } else {
      els.forEach(animate);
    }
  }

  // Generic "tap a button -> reveal the matching panel" behavior, used for
  // both the cause-area mini-quiz and the everyday-spending comparison.
  // Markup contract: a [data-reveal-group] wraps buttons with
  // [data-reveal="<id>"] and panels with [data-reveal-panel="<id>"].
  function initRevealGroups() {
    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      var buttons = group.querySelectorAll("[data-reveal]");
      var panels = group.querySelectorAll("[data-reveal-panel]");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-reveal");
          buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
          panels.forEach(function (p) {
            p.classList.toggle("is-visible", p.getAttribute("data-reveal-panel") === target);
          });
        });
      });
    });
  }

  // Birth-lottery-style luck reveal. A [data-luck-default] card (the draw
  // the visitor actually got) is visible from the start — self-contained,
  // not written as a contrast to anything — so the page has real content
  // at rest with no click needed. The trigger then draws a random
  // [data-luck-card] from the rest, excluding the one just shown where
  // possible so re-clicking feels like a fresh draw, and permanently hides
  // the default card the first time it's clicked.
  function initLuckReveal() {
    document.querySelectorAll("[data-luck-group]").forEach(function (group) {
      var trigger = group.querySelector("[data-luck-trigger]");
      var defaultCard = group.querySelector("[data-luck-default]");
      var cards = Array.prototype.slice.call(group.querySelectorAll("[data-luck-card]"));
      if (!trigger || !cards.length) return;
      var lastIndex = -1;

      trigger.addEventListener("click", function () {
        if (defaultCard) defaultCard.classList.remove("is-visible");
        var index = Math.floor(Math.random() * cards.length);
        if (cards.length > 1 && index === lastIndex) {
          index = (index + 1) % cards.length;
        }
        lastIndex = index;
        cards.forEach(function (card, i) {
          card.classList.toggle("is-visible", i === index);
        });
        trigger.textContent = trigger.getAttribute("data-luck-again") || trigger.textContent;
      });
    });
  }

  // Scroll-reveal: elements render fully visible by default (no-JS, or JS
  // disabled, always shows the complete page). Only once this function runs
  // do we add "js-animate" to <html>, which is what makes [data-animate]
  // start hidden in CSS — so the hidden state only ever exists when a
  // working observer is about to reveal it again.
  function initScrollReveal() {
    var els = document.querySelectorAll("[data-animate]");
    if (!els.length) return;
    document.documentElement.classList.add("js-animate");

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      els.forEach(function (el) { observer.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  // Chart bars: plain HTML/CSS (not SVG — SVG text scales with its viewBox
  // and goes illegibly small on a phone). Each [data-chart-bar] ships with
  // its real final width as a % in data-final (so a no-JS view shows the
  // correct, finished chart). When JS runs, we drop it to 0% and animate
  // back up to that same value the first time its chart scrolls into view.
  function initChartBars() {
    var charts = document.querySelectorAll("[data-chart]");
    if (!charts.length) return;
    var done = new WeakSet();

    function animate(chart) {
      if (done.has(chart)) return;
      done.add(chart);
      var bars = chart.querySelectorAll("[data-chart-bar]");
      bars.forEach(function (bar) {
        var final = bar.getAttribute("data-final");
        bar.style.width = "0%";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            bar.style.width = final + "%";
          });
        });
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) animate(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      charts.forEach(function (chart) { observer.observe(chart); });
    }
  }

  // Chart hover/focus detail: a [data-chart-tip] hit target (bigger than
  // the visible bar, for an easy hover/tap/keyboard target) swaps the
  // chart's caption text while hovered or focused, reverting on exit.
  function initChartTooltips() {
    document.querySelectorAll("[data-chart]").forEach(function (chart) {
      var card = chart.closest(".chart-card");
      var tooltip = card && card.querySelector("[data-chart-tooltip]");
      if (!tooltip) return;
      var defaultText = tooltip.textContent;
      chart.querySelectorAll("[data-chart-tip]").forEach(function (hit) {
        function show() { tooltip.textContent = hit.getAttribute("data-chart-tip"); }
        function hide() { tooltip.textContent = defaultText; }
        hit.addEventListener("mouseenter", show);
        hit.addEventListener("mouseleave", hide);
        hit.addEventListener("focus", show);
        hit.addEventListener("blur", hide);
      });
    });
  }

  // Accordion: independent expand/collapse per row, animated with the
  // grid-template-rows CSS trick (no JS height measuring needed).
  function initAccordions() {
    document.querySelectorAll("[data-accordion]").forEach(function (acc) {
      acc.querySelectorAll(".accordion__row").forEach(function (row) {
        row.addEventListener("click", function () {
          var open = row.getAttribute("aria-expanded") === "true";
          row.setAttribute("aria-expanded", open ? "false" : "true");
        });
      });
    });
  }

  // Lazy video embed: shows a thumbnail + play button until clicked, so no
  // YouTube script/iframe loads unless the visitor actually wants to watch.
  // Only wires up elements that opt in with [data-video] + [data-video-id]
  // — a plain link-out version (used where an inline embed isn't possible)
  // is untouched by this.
  function initVideoEmbeds() {
    document.querySelectorAll("[data-video]").forEach(function (wrap) {
      function play() {
        var id = wrap.getAttribute("data-video-id");
        if (!id) return;
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
        iframe.title = wrap.getAttribute("data-video-title") || "Video";
        iframe.allow = "autoplay; encrypted-media; picture-in-picture";
        iframe.allowFullscreen = true;
        wrap.innerHTML = "";
        wrap.appendChild(iframe);
      }
      wrap.addEventListener("click", play, { once: true });
      wrap.addEventListener(
        "keydown",
        function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            play();
          }
        },
        { once: true }
      );
    });
  }

  // Events come from data/events.json (edited via Pages CMS, see
  // .pages.yml), so adding an event never touches the HTML. Containers opt
  // in with [data-events="next" | "upcoming" | "past"] plus
  // data-events-src (path to the JSON) and data-lang ("de" | "en"). Their
  // static content is the fallback shown without JS or if loading fails.
  // An event counts as upcoming through the whole of its day, judged by the
  // visitor's local date.
  var EVENTS_PAST_LIMIT = 6;
  var EVENT_TEXT = {
    de: {
      months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      date: function (d) { return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); },
      signup: "Kurz anmelden (optional) →",
      noneTitle: "Der nächste Termin steht noch nicht fest",
      none: "Neue Termine kündigen wir zuerst in unserer Signal- und WhatsApp-Gruppe an. " +
        "Tritt bei, dann verpasst du nichts.",
      noneLink: "Zur Gruppe →",
      contact: "kontakt.html"
    },
    en: {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      date: function (d) { return d.getDate() + " " + EVENT_TEXT.en.months[d.getMonth()] + " " + d.getFullYear(); },
      signup: "Quick sign-up (optional) →",
      noneTitle: "The next date isn't set yet",
      none: "We announce new events first in our Signal and WhatsApp groups. " +
        "Join so you don't miss the next one.",
      noneLink: "Join the group →",
      contact: "contact.html"
    }
  };
  var ICON_CAL = '<svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>';
  var ICON_PIN = '<svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>';

  var ICON_CAL_LG = '<span class="events-none__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M12 14v4"/><path d="M10 16h4"/></svg></span>';

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Localised field with German fallback, so an untranslated event still shows.
  function field(ev, name, lang) {
    var v = ev[name + "_" + lang];
    if (v == null || String(v).trim() === "") v = ev[name + "_de"];
    return v == null ? "" : String(v).trim();
  }

  // "2026-10-28" -> local Date at midnight (new Date("2026-10-28") would be UTC).
  function parseDay(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  function renderEvent(ev, lang, kind) {
    var t = EVENT_TEXT[lang];
    var d = ev._day;
    var meta = [];
    var note = field(ev, "note", lang);
    if (kind === "past") {
      meta.push(ICON_CAL + esc(d.getFullYear() + (note ? " · " + note : "")));
    } else {
      var when = t.days[d.getDay()] + ", " + t.date(d);
      var start = (ev.start || "").trim(), end = (ev.end || "").trim();
      if (start) when += " · " + start + (end ? "–" + end : "");
      if (note) when += " · " + note;
      meta.push(ICON_CAL + esc(when));
      var loc = field(ev, "location", lang);
      if (loc) meta.push(ICON_PIN + esc(loc));
    }
    var desc = field(ev, "description", lang).split(/\n\s*\n/).filter(function (p) {
      return p.trim();
    }).map(function (p) { return "<p>" + esc(p.trim()) + "</p>"; }).join("");
    var signup = "";
    if (kind !== "past" && /^https?:\/\//.test((ev.signup_url || "").trim())) {
      signup = '<a class="btn ' + (kind === "featured" ? "btn--on-dark" : "btn--primary") +
        '" href="' + esc(ev.signup_url.trim()) + '">' + esc(t.signup) + "</a>";
    }
    var cls = kind === "featured" ? " is-featured" : kind === "past" ? " is-past" : "";
    return '<div class="event-card' + cls + '">' +
      '<div class="event-date"><span class="event-date__day">' + d.getDate() +
      '</span><span class="event-date__month">' + esc(t.months[d.getMonth()]) + "</span></div>" +
      "<div><h3>" + esc(field(ev, "title", lang)) + "</h3>" +
      '<div class="event-meta">' + meta.map(function (m) { return "<span>" + m + "</span>"; }).join("") +
      "</div>" + desc + signup + "</div></div>";
  }

  function renderEventContainer(el, events) {
    var lang = el.getAttribute("data-lang") === "en" ? "en" : "de";
    var mode = el.getAttribute("data-events");
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var upcoming = events.filter(function (e) { return e._day >= today; })
      .sort(function (a, b) { return a._day - b._day || (a.start || "").localeCompare(b.start || ""); });

    if (mode === "past") {
      var past = events.filter(function (e) { return e._day < today && e.archive !== false; })
        .sort(function (a, b) { return b._day - a._day; })
        .slice(0, EVENTS_PAST_LIMIT);
      el.innerHTML = past.map(function (e) { return renderEvent(e, lang, "past"); }).join("");
      return;
    }
    if (!upcoming.length) {
      var t = EVENT_TEXT[lang];
      el.innerHTML = '<div class="events-none">' + ICON_CAL_LG +
        "<h3>" + esc(t.noneTitle) + "</h3><p>" + esc(t.none) + "</p>" +
        '<a class="btn btn--primary" href="' + t.contact + '">' + esc(t.noneLink) + "</a></div>";
      return;
    }
    if (mode === "next") upcoming = upcoming.slice(0, 1);
    el.innerHTML = upcoming.map(function (e, i) {
      return renderEvent(e, lang, i === 0 ? "featured" : "upcoming");
    }).join("");
  }

  function initEvents() {
    var containers = document.querySelectorAll("[data-events][data-events-src]");
    if (!containers.length || !window.fetch) return;
    var src = containers[0].getAttribute("data-events-src");
    // no-cache = revalidate with the server each time, so a freshly saved
    // event shows up without waiting for GitHub Pages' 10-minute cache.
    fetch(src, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        var events = (Array.isArray(data) ? data : []).filter(function (e) {
          return e && (e._day = parseDay(e.date)) && field(e, "title", "de");
        });
        containers.forEach(function (el) { renderEventContainer(el, events); });
      })
      .catch(function (err) {
        // Leave the static fallback text in place.
        if (window.console) console.warn("Events could not be loaded:", err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initEvents();
    initCountUp();
    initRevealGroups();
    initLuckReveal();
    initScrollReveal();
    initChartBars();
    initChartTooltips();
    initAccordions();
    initVideoEmbeds();
  });
})();

/* ---------- gallery lightbox ----------
   Progressive enhancement: without JS each thumbnail is a plain link to the
   full-size photo. With JS it opens in a native <dialog> (Esc closes it,
   focus is handled by the browser), with arrow-key / button navigation. */
(function () {
  var dialog = document.querySelector("[data-lightbox-dialog]");
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (!dialog || !items.length || typeof dialog.showModal !== "function") return;
  var img = dialog.querySelector("img");
  var cap = dialog.querySelector("figcaption");
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var thumb = items[index].querySelector("img");
    img.src = items[index].getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    cap.textContent = (thumb ? thumb.alt : "") + "  (" + (index + 1) + " / " + items.length + ")";
  }

  items.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector("[data-lightbox-prev]").addEventListener("click", function () { show(index - 1); });
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", function () { show(index + 1); });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  // click on the dark backdrop (outside the photo) closes
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", function () { img.removeAttribute("src"); });
})();
