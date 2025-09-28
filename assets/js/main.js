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

  console.log("Platinum Media website initialized");
});

/*
==============================================
NAVIGATION FUNCTIONALITY
==============================================
*/
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Smooth scrolling for internal links
  navLinks.forEach((link) => {
    if (link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          const navbarToggler = document.querySelector(".navbar-toggler");

          if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
          }
        }
      });
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

  // Active nav link highlighting (exclude about and contact)
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener(
    "scroll",
    function () {
      const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;
      let activeFound = false;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        const correspondingLink = document.querySelector(
          `a[href="#${sectionId}"]`
        );

        // Skip about and contact sections for active highlighting
        if (sectionId === "about" || sectionId === "contact") {
          return;
        }

        if (
          correspondingLink &&
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          // Remove active class from all links
          navLinks.forEach((link) => link.classList.remove("active"));

          // Add active class to current link
          correspondingLink.classList.add("active");
          activeFound = true;
        }
      });

      // If no section is active and we're near the top, activate Home
      if (!activeFound && window.pageYOffset < 200) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const homeLink = document.querySelector(
          'a[href="index.html"], a[href="#"]'
        );
        if (homeLink) {
          homeLink.classList.add("active");
        }
      }
    },
    { passive: true }
  );
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
                                src="/assets/img/showcase/showcase-1.webp"
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
                               src="/assets/img/showcase/showcase-2.webp"
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
                                src="/assets/img/showcase/showcase-3.webp"
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
                               src="/assets/img/showcase/showcase-4.webp"
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
                               src="/assets/img/showcase/showcase-5.webp"
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
                                src="/assets/img/showcase/showcase-6.webp"
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
                               src="/assets/img/showcase/showcase-7.webp"
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
                               src="/assets/img/showcase/showcase-8.webp"
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
                               src="/assets/img/showcase/showcase-9.webp"
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
                                src="/assets/img/showcase/showcase-10.webp"
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
            <div class="row g-4">
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/highlight-reel.webp"
                                alt="Player Highlight Reel Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Highlight Reel - Player Showcase"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Highlight Reel</h4>
                                    <p class="work-item-category">Player Showcase</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/training-montage.webp"
                                alt="Training Montage Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Training Montage - Behind the Scenes"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Training Montage</h4>
                                    <p class="work-item-category">Behind the Scenes</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/match-recap.webp"
                                alt="Match Recap Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Match Recap - Game Analysis"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Match Recap</h4>
                                    <p class="work-item-category">Game Analysis</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/player-interview.webp"
                                alt="Player Interview Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Player Interview - Documentary"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Player Interview</h4>
                                    <p class="work-item-category">Documentary</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/team-announcement.webp"
                                alt="Team Announcement Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Team Announcement - Promotional"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Team Announcement</h4>
                                    <p class="work-item-category">Promotional</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/highlight-reel.webp"
                                alt="Player Highlight Reel Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Highlight Reel - Player Showcase"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Highlight Reel</h4>
                                    <p class="work-item-category">Player Showcase</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/training-montage.webp"
                                alt="Training Montage Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Training Montage - Behind the Scenes"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Training Montage</h4>
                                    <p class="work-item-category">Behind the Scenes</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/match-recap.webp"
                                alt="Match Recap Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Match Recap - Game Analysis"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Match Recap</h4>
                                    <p class="work-item-category">Game Analysis</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/player-interview.webp"
                                alt="Player Interview Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Player Interview - Documentary"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Player Interview</h4>
                                    <p class="work-item-category">Documentary</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-12 col-md col-lg">
                    <article class="work-item-platinum">
                        <div class="work-item-image">
                            <img
                                src="/assets/img/showcase/team-announcement.webp"
                                alt="Team Announcement Video"
                                class="lightbox-trigger work-image"
                                data-lightbox="gallery"
                                data-title="Team Announcement - Promotional"
                                loading="lazy"
                            />
                            <div class="work-item-overlay">
                                <div class="work-item-content">
                                    <h4 class="work-item-title">Team Announcement</h4>
                                    <p class="work-item-category">Promotional</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
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

        // Animate content change
        workGrid.style.opacity = "0";
        workGrid.style.transform = "translateY(20px)";

        setTimeout(() => {
          workGrid.innerHTML = contentData[filter] || contentData.graphics;
          workGrid.style.opacity = "1";
          workGrid.style.transform = "translateY(0)";

          // Re-initialize lazy loading for new images
          initializeLazyLoading();

          // Re-initialize lightbox for new images
          if (window.lightbox) {
            window.lightbox.updateTriggers();
          }
        }, 300);
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
CONTACT FORM FUNCTIONALITY
==============================================
*/
function initializeContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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
        // Simulate form submission
        const originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        setTimeout(() => {
          submitButton.textContent = "Message Sent!";
          submitButton.style.background = "#10b981";

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
        }, 1500);
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

// Export functions for external use if needed
window.PlatinumMedia = {
  scrollToTop,
  getScrollPosition,
  isInViewport,
  throttle,
  debounce,
};
