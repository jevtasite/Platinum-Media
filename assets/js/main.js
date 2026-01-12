/*
==============================================
PLATINUM MEDIA - MAIN JAVASCRIPT
==============================================
*/

// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeNavigation();
  initializeWorkFilters();
  initializeContactForm();
  initializeScrollAnimations();
  initializePerformanceOptimizations();
  initializeBackToTop();
  initializeStatsCounters();
  initializeMainVideoPlayers();

  console.log("Platinum Media website initialized");
});

/*
==============================================
NAVIGATION FUNCTIONALITY
==============================================
*/
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const allInternalLinks = document.querySelectorAll('a[href^="#"]');

  // Smooth scrolling for all internal links (navbar + footer)
  allInternalLinks.forEach((link) => {
    if (link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Close mobile menu if open first
          const navbarCollapse = document.querySelector(".navbar-collapse");
          const navbarToggler = document.querySelector(".navbar-toggler");
          const isMobileMenuOpen = navbarCollapse.classList.contains("show");

          if (isMobileMenuOpen) {
            navbarToggler.click();
          }

          // Calculate proper offset after menu is closed
          setTimeout(
            () => {
              // Get the actual navbar height (without collapsed menu)
              const headerHeight = navbar.offsetHeight;
              // Add extra offset for mobile devices
              const isMobile = window.innerWidth <= 991;
              const extraOffset = isMobile ? -100 : 0;
              const targetPosition =
                targetElement.offsetTop - headerHeight - extraOffset;

              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            },
            isMobileMenuOpen ? 300 : 0
          ); // Wait for menu close animation if needed
        }
      });
    }
  });

  // Close navbar when clicking outside
  document.addEventListener("click", function (e) {
    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbarToggler = document.querySelector(".navbar-toggler");

    // Check if navbar is open and click is outside navbar
    if (
      navbarCollapse.classList.contains("show") &&
      !navbar.contains(e.target)
    ) {
      navbarToggler.click();
    }
  });

  // Header background on scroll
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener(
    "scroll",
    function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add solid background when scrolled
      if (scrollTop > 50) {
        header.style.background = "rgba(13, 13, 13, 0.98)";
        header.style.backdropFilter = "blur(20px)";
      } else {
        header.style.background = "rgba(13, 13, 13, 0.95)";
        header.style.backdropFilter = "blur(20px)";
      }

      lastScrollTop = scrollTop;
    },
    { passive: true }
  );

  // Set active nav link based on current page
  setActiveNavLink();

  // Update active nav link on scroll for anchor links
  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const allNavLinks = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname;

  let homeActivated = false;

  allNavLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // Skip anchor links - they'll be handled by scroll
    if (href && href.startsWith("#")) {
      return;
    }

    // Check for exact page match
    if (href === "/" || href === "/index.html" || href === "./index.html" || href === "../index.html" || href === "../") {
      // Home page: check if we're at root or index.html
      if (currentPath === "/" ||
          currentPath === "/index.html" ||
          currentPath.endsWith("/Platinum-Media/") ||
          currentPath.endsWith("/Platinum-Media/index.html") ||
          (!currentPath.includes("/graphics") && !currentPath.includes("/videos"))) {
        link.classList.add("active");
        homeActivated = true;
      }
    } else if (href && !href.startsWith("#")) {
      // Other pages (Graphics, Videos)
      const normalizedHref = href.replace(/\/$/, ''); // Remove trailing slash
      const normalizedPath = currentPath.replace(/\/$/, ''); // Remove trailing slash

      if (normalizedPath.includes(normalizedHref)) {
        link.classList.add("active");
      }
    }
  });
}

/**
 * Update active state for anchor links based on scroll position
 */
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const homeLinks = document.querySelectorAll('.nav-link[href="/"], .nav-link[href="../"], .nav-link[href="./"], .nav-link[href="index.html"]');

  if (sections.length === 0) return;

  let currentSection = '';
  const scrollPosition = window.pageYOffset + 200; // Offset for better UX

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  // If at the very top of the page, keep home link active
  if (window.pageYOffset < 100) {
    homeLinks.forEach(link => link.classList.add('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    return;
  }

  // Update anchor nav links based on section
  navLinks.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href');

    if (currentSection && href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Remove active from home link when scrolling to sections
  if (currentSection) {
    homeLinks.forEach(link => link.classList.remove('active'));
  }
}

/*
==============================================
WORK FILTER FUNCTIONALITY
==============================================
*/
function initializeWorkFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn-platinum");
  const workGrid = document.querySelector(".work-grid");

  // Sample content for Graphics and Videos
  const contentData = {
    graphics: `
            <div class="row g-4">
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="assets/img/showcase/showcase-1.webp"
                                alt="Player Highlight Graphic Design"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Player Highlight - Social Media Graphics"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Player Highlight</h4>
                                    <p class="work-item-category">Social Media Graphics</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                               src="assets/img/showcase/showcase-2.webp"
                                alt="Match Day Graphics Design"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Match Day Graphics - Event Promotion"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Match Day Graphics</h4>
                                    <p class="work-item-category">Event Promotion</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="assets/img/showcase/showcase-3.webp"
                                alt="Team Branding Design"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Team Branding - Brand Identity"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Team Branding</h4>
                                    <p class="work-item-category">Brand Identity</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                               src="assets/img/showcase/showcase-4.webp"
                                alt="Player Statistics Infographic"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Player Statistics - Infographics"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Player Statistics</h4>
                                    <p class="work-item-category">Infographics</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                               src="assets/img/showcase/showcase-5.webp"
                                alt="Season Announcement Campaign"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Season Announcement - Campaign Graphics"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Season Announcement</h4>
                                    <p class="work-item-category">Campaign Graphics</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="assets/img/showcase/showcase-6.webp"
                                alt="Player Highlight Graphic Design"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Player Highlight - Social Media Graphics"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Player Highlight</h4>
                                    <p class="work-item-category">Social Media Graphics</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                               src="assets/img/showcase/showcase-7.webp"
                                alt="Match Day Graphics Design"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Match Day Graphics - Event Promotion"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Match Day Graphics</h4>
                                    <p class="work-item-category">Event Promotion</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                               src="assets/img/showcase/showcase-8.webp"
                                alt="Team Branding Design"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Team Branding - Brand Identity"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Team Branding</h4>
                                    <p class="work-item-category">Brand Identity</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                               src="assets/img/showcase/showcase-9.webp"
                                alt="Player Statistics Infographic"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Player Statistics - Infographics"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Player Statistics</h4>
                                    <p class="work-item-category">Infographics</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="assets/img/showcase/showcase-10.webp"
                                alt="Season Announcement Campaign"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Season Announcement - Campaign Graphics"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Season Announcement</h4>
                                    <p class="work-item-category">Campaign Graphics</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        `,
    videos: `
            <div class="videos-grid-custom">
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-1.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-2.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-3.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-4.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-5.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-6.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-7.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
                <article class="work-item-platinum">
                    <div class="work-item-image">
                        <video class="work-video-player" preload="metadata" controls playsinline>
                            <source src="assets/vid/vid-showcase-8.mp4#t=0.1" type="video/mp4" />
                        </video>
                    </div>
                </article>
            </div>
        `,
  };

  if (filterButtons.length > 0 && workGrid) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Update ARIA attributes
        filterButtons.forEach((btn) =>
          btn.setAttribute("aria-selected", "false")
        );
        this.setAttribute("aria-selected", "true");

        // Smooth filter transition with staggered card animations
        animateFilterTransition(
          workGrid,
          contentData[filter] || contentData.graphics
        );
      });
    });

    // Load default graphics content on page load
    workGrid.innerHTML = contentData.graphics;
    workGrid.style.opacity = "1";
    workGrid.style.transform = "translateY(0)";

    // Initialize lightbox for default content
    setTimeout(() => {
      if (window.lightbox) {
        window.lightbox.updateTriggers();
      }
    }, 100);
  }
}

/*
==============================================
FILTER ANIMATION SYSTEM
==============================================
*/
function animateFilterTransition(workGrid, newContent) {
  const existingItems = workGrid.querySelectorAll(".work-item-platinum");

  // Phase 1: Animate out existing items with faster staggered timing
  existingItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("filter-exit");
    }, index * 30); // Reduced from 60ms to 30ms
  });

  // Calculate total exit time - much shorter
  const exitDuration = existingItems.length * 30 + 200; // Reduced animation duration

  // Phase 2: Replace content and animate in new items
  setTimeout(() => {
    workGrid.innerHTML = newContent;

    // Get new items and set initial state
    const newItems = workGrid.querySelectorAll(".work-item-platinum");

    // Set initial invisible state for all new items
    newItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px) scale(0.95) translateZ(0)"; // Reduced movement
    });

    // Animate in new items with faster staggered timing
    newItems.forEach((item, index) => {
      setTimeout(() => {
        // Use CSS class for smooth performance
        item.classList.add("filter-enter");

        // Also use direct style for immediate effect
        requestAnimationFrame(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0) scale(1) translateZ(0)";
          item.style.transition =
            "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"; // Reduced from 0.6s to 0.3s
        });
      }, index * 40 + 50); // Reduced stagger to 40ms and delay to 50ms
    });

    // Clean up animation classes after completion - faster
    setTimeout(() => {
      newItems.forEach((item) => {
        item.classList.remove("filter-enter");
        item.style.transition = ""; // Reset to default
      });
    }, newItems.length * 40 + 50 + 300); // Shorter total time

    // Re-initialize functionality for new content - faster
    setTimeout(() => {
      initializeLazyLoading();
      if (window.lightbox) {
        window.lightbox.updateTriggers();
      }
    }, 150); // Reduced from 300ms to 150ms
  }, exitDuration);
}

/*
==============================================
CONTACT FORM FUNCTIONALITY
==============================================
*/
function initializeContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form elements
      const nameField = this.querySelector("#name");
      const emailField = this.querySelector("#email");
      const messageField = this.querySelector("#message");
      const submitButton = this.querySelector('button[type="submit"]');

      // Basic validation
      let isValid = true;

      // Reset previous validation states
      this.querySelectorAll(".form-control").forEach((field) => {
        field.classList.remove("is-invalid", "is-valid");
      });

      // Validate name
      if (!nameField.value.trim()) {
        nameField.classList.add("is-invalid");
        isValid = false;
      } else {
        nameField.classList.add("is-valid");
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
        emailField.classList.add("is-invalid");
        isValid = false;
      } else {
        emailField.classList.add("is-valid");
      }

      // Validate message
      if (!messageField.value.trim()) {
        messageField.classList.add("is-invalid");
        isValid = false;
      } else {
        messageField.classList.add("is-valid");
      }

      if (isValid) {
        // Form validation passed
        const originalText = submitButton.textContent;
        submitButton.textContent = "Message Sent!";
        submitButton.style.background = "#10b981";
        submitButton.disabled = true;

        // Reset form after success
        setTimeout(() => {
          this.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.style.background = "";
          this.querySelectorAll(".form-control").forEach((field) => {
            field.classList.remove("is-invalid", "is-valid");
          });
        }, 2000);
      }
    });

    // Real-time validation
    const formFields = contactForm.querySelectorAll(".form-control");
    formFields.forEach((field) => {
      field.addEventListener("blur", function () {
        if (this.value.trim()) {
          this.classList.remove("is-invalid");
          this.classList.add("is-valid");
        }
      });
    });
  }
}

/*
==============================================
SCROLL ANIMATIONS
==============================================
*/
function initializeScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    ".service-card, .work-item, .section-title, .section-subtitle"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition =
      "opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    observer.observe(element);
  });
}

/*
==============================================
PERFORMANCE OPTIMIZATIONS
==============================================
*/
function initializePerformanceOptimizations() {
  // Lazy loading for images
  initializeLazyLoading();

  // Debounced scroll handler
  let scrollTimeout;
  const debouncedScrollHandler = function () {
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(function () {
      // Scroll-dependent operations here
    });
  };

  window.addEventListener("scroll", debouncedScrollHandler, { passive: true });

  // Preload critical images
  const criticalImages = ["assets/img/logo.webp", "assets/img/hero-bg.webp"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

/*
==============================================
LAZY LOADING
==============================================
*/
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
      }
    );

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      img.src = img.src || img.dataset.src;
    });
  }
}

/*
==============================================
BACK TO TOP FUNCTIONALITY
==============================================
*/
function initializeBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  if (!backToTopButton) return;

  // Show/hide button based on scroll position
  window.addEventListener(
    "scroll",
    function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    },
    { passive: true }
  );

  // Click event to scroll to top
  backToTopButton.addEventListener("click", function () {
    scrollToTop();
  });
}

/*
==============================================
UTILITY FUNCTIONS
==============================================
*/

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Get scroll position
function getScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// LIGHTBOX FUNCTIONALITY
class Lightbox {
  constructor() {
    this.overlay = document.getElementById("lightbox");
    this.image = document.getElementById("lightbox-image");
    this.title = document.getElementById("lightbox-title");
    this.closeBtn = document.getElementById("lightbox-close");
    this.prevBtn = document.getElementById("lightbox-prev");
    this.nextBtn = document.getElementById("lightbox-next");
    this.triggers = [];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    // Get all lightbox triggers
    this.updateTriggers();

    // Event listeners
    this.closeBtn.addEventListener("click", () => this.close());
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    // Close on overlay click
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.overlay.classList.contains("active")) return;

      switch (e.key) {
        case "Escape":
          this.close();
          break;
        case "ArrowLeft":
          this.prev();
          break;
        case "ArrowRight":
          this.next();
          break;
      }
    });
  }

  updateTriggers() {
    this.triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));
    console.log("Lightbox found triggers:", this.triggers.length);

    // Remove any existing delegation handler
    if (this.delegationHandler) {
      document.removeEventListener("click", this.delegationHandler);
    }

    // Use event delegation for better reliability
    this.delegationHandler = (e) => {
      const trigger = e.target.closest(".lightbox-trigger");
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const index = this.triggers.indexOf(trigger);
        console.log("Lightbox trigger clicked via delegation:", index);
        if (index !== -1) {
          this.open(index);
        }
      }
    };

    document.addEventListener("click", this.delegationHandler);
  }

  open(index) {
    console.log("Opening lightbox for index:", index);
    this.currentIndex = index;
    const trigger = this.triggers[index];

    if (!trigger) {
      console.error("No trigger found for index:", index);
      return;
    }

    console.log("Trigger src:", trigger.src);
    // Set image and title
    this.image.src = trigger.src;
    this.image.alt = trigger.alt;
    this.title.textContent = trigger.dataset.title || trigger.alt;

    // Show/hide navigation buttons
    this.prevBtn.style.display = this.triggers.length > 1 ? "flex" : "none";
    this.nextBtn.style.display = this.triggers.length > 1 ? "flex" : "none";

    // Show lightbox
    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  prev() {
    this.currentIndex =
      this.currentIndex === 0
        ? this.triggers.length - 1
        : this.currentIndex - 1;
    this.updateImage();
  }

  next() {
    this.currentIndex =
      this.currentIndex === this.triggers.length - 1
        ? 0
        : this.currentIndex + 1;
    this.updateImage();
  }

  updateImage() {
    const trigger = this.triggers[this.currentIndex];
    this.image.src = trigger.src;
    this.image.alt = trigger.alt;
    this.title.textContent = trigger.dataset.title || trigger.alt;
  }
}

// Initialize lightbox when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.lightbox = new Lightbox();
});

/*
==============================================
STATS COUNTER ANIMATIONS
==============================================
*/
function initializeStatsCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    counterObserver.observe(stat);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-count"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);

  // Add a smooth ease-out effect
  const startTime = performance.now();
  const animateSmooth = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic function for smooth deceleration
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easedProgress * target);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(animateSmooth);
    } else {
      element.textContent = target;
    }
  };

  // Use the smooth animation instead of the linear one
  clearInterval(timer);
  requestAnimationFrame(animateSmooth);
}

/*
==============================================
MAIN PAGE VIDEO PLAYERS
==============================================
*/
function initializeMainVideoPlayers() {
  let touchStartY = 0;
  let touchEndY = 0;

  // Use event delegation to handle dynamically loaded videos
  document.addEventListener('click', function(e) {
    const video = e.target.closest('.work-video-player');
    if (video) {
      e.preventDefault();
      e.stopPropagation();

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  });

  // Track touch start position
  document.addEventListener('touchstart', function(e) {
    const video = e.target.closest('.work-video-player');
    if (video) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  // Handle touch events for mobile - only if not scrolling
  document.addEventListener('touchend', function(e) {
    const video = e.target.closest('.work-video-player');
    if (video) {
      touchEndY = e.changedTouches[0].clientY;
      const scrollDistance = Math.abs(touchEndY - touchStartY);

      // Only play/pause if user didn't scroll (moved less than 10px)
      if (scrollDistance < 10) {
        e.preventDefault();
        e.stopPropagation();

        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  });

  // Handle fullscreen changes to maintain aspect ratio
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);
}

function handleFullscreenChange() {
  const fullscreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  if (fullscreenElement && fullscreenElement.classList.contains('work-video-player')) {
    // Force aspect ratio styles
    fullscreenElement.style.width = 'auto';
    fullscreenElement.style.height = '100vh';
    fullscreenElement.style.maxWidth = 'calc(100vh * 9 / 16)';
    fullscreenElement.style.maxHeight = '100vh';
    fullscreenElement.style.objectFit = 'contain';
    fullscreenElement.style.margin = '0 auto';
    fullscreenElement.style.position = 'absolute';
    fullscreenElement.style.left = '50%';
    fullscreenElement.style.top = '50%';
    fullscreenElement.style.transform = 'translate(-50%, -50%)';
    fullscreenElement.style.background = '#000';
  }
}

// Export functions for external use if needed
window.PlatinumMedia = {
  scrollToTop,
  getScrollPosition,
  isInViewport,
  throttle,
  debounce,
  animateCounter,
};
