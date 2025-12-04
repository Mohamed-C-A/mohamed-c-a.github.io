/**
 * Template Name: MyResume
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Selects DOM element(s) by CSS selector.
   * @param {string} el - CSS selector string
   * @param {boolean} all - If true, returns all matching elements; otherwise returns first match
   * @returns {Element|Element[]|null} Selected element(s) or null
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Attaches event listener(s) to element(s).
   * @param {string} type - Event type (e.g., 'click', 'scroll')
   * @param {string} el - CSS selector for target element(s)
   * @param {Function} listener - Event handler function
   * @param {boolean} all - If true, attaches listener to all matching elements
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;

    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  /**
   * Attaches scroll event listener to an element.
   * @param {Element} el - Target element
   * @param {Function} listener - Scroll event handler
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Smoothly scrolls to the specified element.
   * @param {string} el - CSS selector of target element
   */
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  // Navbar: Highlight active section link on scroll
  const navbarlinks = select("#navbar .scrollto", true);

  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  // Back to top button: Show/hide based on scroll position
  const backtotop = select(".back-to-top");

  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Mobile navigation: Toggle menu visibility
  on("click", ".mobile-nav-toggle", function () {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  // Smooth scroll: Handle clicks on navigation links
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        const body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          const navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  // Deep linking: Scroll to section if URL contains hash on page load
  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  // Preloader: Remove loading overlay after page loads
  const preloader = select("#preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  // Typed.js: Animated typing effect in hero section
  const typed = select(".typed");

  if (typed) {
    const typedStrings = typed.getAttribute("data-typed-items").split(";");
    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 30,
      backSpeed: 5,
      backDelay: 1500,
    });
  }

  // Skills: Animate progress bars when section enters viewport
  const skilsContent = select(".skills-content");

  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function () {
        const progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  // Portfolio: Isotope grid filtering
  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");
    if (!portfolioContainer) return;

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
    });

    const portfolioFilters = select("#portfolio-flters li", true);

    on(
      "click",
      "#portfolio-flters li",
      function (e) {
        e.preventDefault();
        portfolioFilters.forEach((el) => el.classList.remove("filter-active"));
        this.classList.add("filter-active");

        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        portfolioIsotope.on("arrangeComplete", () => AOS.refresh());
      },
      true
    );
  });

  // Lightbox: Initialize portfolio image lightboxes
  GLightbox({ selector: ".portfolio-lightbox" });

  GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  // Swiper: Portfolio details carousel
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  // Swiper: Testimonials carousel
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  // AOS: Initialize scroll-triggered animations
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // PureCounter: Initialize number counting animations
  new PureCounter();
})();
