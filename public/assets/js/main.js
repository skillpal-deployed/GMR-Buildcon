/* GMR Buildcon — theme interactions */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    var backdrop = document.getElementById("nav-backdrop");

    /* ---- Sticky header background on scroll ---- */
    var onScroll = function () {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- Mobile navigation ---- */
    var closeNav = function () {
      if (!nav) return;
      nav.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
      if (toggle) {
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
      }
      document.body.style.overflow = "";
    };

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.classList.toggle("is-active", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (backdrop) backdrop.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
    }

    if (backdrop) backdrop.addEventListener("click", closeNav);

    // Close menu when a link is tapped or on Escape / resize to desktop.
    if (nav) {
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeNav();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });

    /* ---- Scroll reveal ---- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    /* ---- Count-up for stat numbers ---- */
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var cio = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var target = parseFloat(el.getAttribute("data-count"));
            var suffix = el.getAttribute("data-suffix") || "";
            var dur = 1400;
            var start = null;
            var step = function (ts) {
              if (!start) start = ts;
              var p = Math.min((ts - start) / dur, 1);
              var eased = 1 - Math.pow(1 - p, 3);
              var val = target * eased;
              el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(2)) + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (el) {
        cio.observe(el);
      });
    }
  });
})();
