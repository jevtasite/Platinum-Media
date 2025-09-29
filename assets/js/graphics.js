/*
==============================================
PLATINUM MEDIA - GRAPHICS PAGE JAVASCRIPT
==============================================
*/

// Sample graphics data - replace with actual CMS/API data
const graphicsData = {
  "social-media": [
    {
      id: 1,
      title: "Instagram Story - Game Announcement",
      category: "Social Media",
      type: "Story",
      date: "2024-12-15",
      image: "../assets/img/showcase/showcase-1.webp",
      ratio: "story",
    },
    {
      id: 2,
      title: "Facebook Cover - Season Campaign",
      category: "Social Media",
      type: "Cover",
      date: "2024-12-10",
      image: "../assets/img/showcase/showcase-2.webp",
      ratio: "landscape",
    },
    {
      id: 3,
      title: "Twitter Post - Athlete Stats",
      category: "Social Media",
      type: "Post",
      date: "2024-12-08",
      image: "../assets/img/showcase/showcase-3.webp",
      ratio: "square",
    },
    {
      id: 4,
      title: "Instagram Feed Post - Training",
      category: "Social Media",
      type: "Post",
      date: "2024-12-05",
      image: "../assets/img/showcase/showcase-4.webp",
      ratio: "square",
    },
  ],
  "athlete-highlights": [
    {
      id: 5,
      title: "Athlete Performance Analysis",
      category: "Athlete Highlights",
      type: "Infographic",
      date: "2024-12-12",
      image: "../assets/img/showcase/showcase-5.webp",
      ratio: "portrait",
    },
    {
      id: 6,
      title: "Season Goals Compilation",
      category: "Athlete Highlights",
      type: "Stats",
      date: "2024-12-09",
      image: "../assets/img/showcase/showcase-6.webp",
      ratio: "landscape",
    },
    {
      id: 7,
      title: "Athlete Achievement Badge",
      category: "Athlete Highlights",
      type: "Badge",
      date: "2024-12-06",
      image: "../assets/img/showcase/showcase-7.webp",
      ratio: "square",
    },
    {
      id: 8,
      title: "Career Milestone Graphic",
      category: "Athlete Highlights",
      type: "Milestone",
      date: "2024-12-03",
      image: "../assets/img/showcase/showcase-8.webp",
      ratio: "portrait",
    },
  ],
  "game-day": [
    {
      id: 9,
      title: "Starting Lineup",
      category: "Game Day",
      type: "Lineup",
      date: "2024-12-14",
      image: "../assets/img/showcase/showcase-9.webp",
      ratio: "square",
    },
    {
      id: 10,
      title: "Live Score Update",
      category: "Game Day",
      type: "Score",
      date: "2024-12-14",
      image: "../assets/img/showcase/showcase-10.webp",
      ratio: "landscape",
    },
    {
      id: 11,
      title: "Pre-Game Hype Graphic",
      category: "Game Day",
      type: "Promo",
      date: "2024-12-13",
      image: "../assets/img/showcase/showcase-1.webp",
      ratio: "story",
    },
    {
      id: 12,
      title: "Post-Game Results",
      category: "Game Day",
      type: "Results",
      date: "2024-12-14",
      image: "../assets/img/showcase/showcase-2.webp",
      ratio: "square",
    },
  ],
  "brand-identity": [
    {
      id: 13,
      title: "Team Logo Design",
      category: "Brand Identity",
      type: "Logo",
      date: "2024-11-25",
      image: "../assets/img/showcase/showcase-3.webp",
      ratio: "square",
    },
    {
      id: 14,
      title: "Brand Guidelines Document",
      category: "Brand Identity",
      type: "Guidelines",
      date: "2024-11-20",
      image: "../assets/img/showcase/showcase-4.webp",
      ratio: "portrait",
    },
    {
      id: 15,
      title: "Jersey Design Concept",
      category: "Brand Identity",
      type: "Jersey",
      date: "2024-11-15",
      image: "../assets/img/showcase/showcase-5.webp",
      ratio: "landscape",
    },
  ],
  infographics: [
    {
      id: 16,
      title: "Transfer Market Analysis",
      category: "Infographics",
      type: "Analysis",
      date: "2024-12-01",
      image: "../assets/img/showcase/showcase-6.webp",
      ratio: "portrait",
    },
    {
      id: 17,
      title: "League Statistics Overview",
      category: "Infographics",
      type: "Stats",
      date: "2024-11-28",
      image: "../assets/img/showcase/showcase-7.webp",
      ratio: "landscape",
    },
    {
      id: 18,
      title: "Team Formation Breakdown",
      category: "Infographics",
      type: "Tactical",
      date: "2024-11-25",
      image: "../assets/img/showcase/showcase-8.webp",
      ratio: "square",
    },
  ],
};

// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeStatsCounters();
  initializeBackToTop();
  initializePerformanceOptimizations();
  initializeShowMoreButton();
  initializeContactToggle();
  initializeTestimonialsSwiper();
  initializeContactForm();

  // Initialize hero 3D flip card
  initializeHero3DFlipCard();

  // Initialize lightbox after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeGraphicsLightbox();
  }, 100);

  console.log("Graphics page initialized with lightbox and static gallery");
});

/*
==============================================
GRAPHICS PAGE INITIALIZATION
==============================================
*/
function initializeGraphicsPage() {
  // Load all graphics by default
  loadGraphics("all");

  // Add loading animation
  showLoadingState();

  // Simulate loading delay for better UX
  setTimeout(() => {
    hideLoadingState();
  }, 800);
}

/*
==============================================
GRAPHICS FILTERING SYSTEM
==============================================
*/
function initializeGraphicsFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn-platinum");

  if (filterButtons.length > 0) {
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

        // Filter graphics with smooth animation
        filterGraphics(filter);
      });
    });
  }
}

function filterGraphics(category) {
  const graphicsGrid = document.querySelector(".graphics-grid");
  if (!graphicsGrid) return;

  // Show loading state
  showLoadingState();

  // Animate out current items
  const currentItems = graphicsGrid.querySelectorAll(".graphics-item");
  currentItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-20px) scale(0.9)";
    }, index * 30);
  });

  // Load new content after animation
  setTimeout(() => {
    loadGraphics(category);
    hideLoadingState();
  }, currentItems.length * 30 + 300);
}

function loadGraphics(category) {
  const graphicsGrid = document.querySelector(".graphics-grid");
  if (!graphicsGrid) return;

  let graphicsToShow = [];

  if (category === "all") {
    // Combine all graphics
    Object.values(graphicsData).forEach((categoryGraphics) => {
      graphicsToShow = graphicsToShow.concat(categoryGraphics);
    });
    // Sort by date (newest first)
    graphicsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    graphicsToShow = graphicsData[category] || [];
  }

  if (graphicsToShow.length === 0) {
    showEmptyState(category);
    return;
  }

  // Generate HTML
  const graphicsHTML = generateGraphicsHTML(graphicsToShow);
  graphicsGrid.innerHTML = graphicsHTML;

  // Animate in new items
  const newItems = graphicsGrid.querySelectorAll(".graphics-item");
  newItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px) scale(0.9)";

    setTimeout(() => {
      item.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      item.style.opacity = "1";
      item.style.transform = "translateY(0) scale(1)";
    }, index * 60 + 100);
  });

  // Re-initialize lightbox for new items
  setTimeout(() => {
    if (window.lightbox) {
      window.lightbox.updateTriggers();
    }
  }, 500);
}

function generateGraphicsHTML(graphics) {
  let html = '<div class="row">';

  graphics.forEach((graphic, index) => {
    const colClass = getColumnClass(index, graphic.ratio);

    html += `
      <div class="${colClass}">
        <article class="graphics-item ${
          graphic.ratio ? `ratio-${graphic.ratio}` : "ratio-square"
        }" data-category="${graphic.category.toLowerCase().replace(" ", "-")}">
          <div class="graphics-item-image">
            <img
              src="${graphic.image}"
              alt="${graphic.title}"
              class="lightbox-trigger"
              data-lightbox="graphics-gallery"
              data-title="${graphic.title} - ${graphic.category}"
              loading="lazy"
            />
            <div class="graphics-item-overlay">
              <div class="graphics-item-content">
                <h3 class="graphics-item-title">${graphic.title}</h3>
                <p class="graphics-item-category">${graphic.category}</p>
                <div class="graphics-item-meta">
                  <span class="graphics-item-date">${formatDate(
                    graphic.date
                  )}</span>
                  <span class="graphics-item-type">${graphic.type}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;
  });

  html += "</div>";
  return html;
}

function getColumnClass(index, ratio) {
  // Responsive column classes for varied layout
  const patterns = [
    "col-12 col-md-6 col-lg-4", // Regular
    "col-12 col-md-6 col-lg-3", // Smaller
    "col-12 col-md-8 col-lg-6", // Wider
    "col-12 col-md-4 col-lg-3", // Smaller
  ];

  // Special handling for story ratio (always smaller)
  if (ratio === "story") {
    return "col-12 col-md-4 col-lg-3";
  }

  // Special handling for landscape (sometimes wider)
  if (ratio === "landscape" && index % 3 === 0) {
    return "col-12 col-md-8 col-lg-6";
  }

  return patterns[index % patterns.length];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/*
==============================================
LOADING AND EMPTY STATES
==============================================
*/
function showLoadingState() {
  const graphicsGrid = document.querySelector(".graphics-grid");
  if (!graphicsGrid) return;

  graphicsGrid.innerHTML = `
    <div class="graphics-loading">
      <div class="graphics-loading-spinner"></div>
      <p class="graphics-loading-text">Loading graphics...</p>
    </div>
  `;
}

function hideLoadingState() {
  // Loading state will be replaced by actual content
}

function showEmptyState(category) {
  const graphicsGrid = document.querySelector(".graphics-grid");
  if (!graphicsGrid) return;

  const categoryName = category
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  graphicsGrid.innerHTML = `
    <div class="graphics-empty">
      <div class="graphics-empty-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
      <h3 class="graphics-empty-title">No ${categoryName} Graphics Found</h3>
      <p class="graphics-empty-text">
        We're constantly adding new graphics to our portfolio. Check back soon for updates!
      </p>
    </div>
  `;
}

/*
==============================================
CONTACT TOGGLE FUNCTIONALITY
==============================================
*/
function initializeContactToggle() {
  const startProjectBtn = document.getElementById('startProjectBtn');
  const contactSection = document.getElementById('contact');

  if (!startProjectBtn || !contactSection) return;

  let isContactVisible = false;

  startProjectBtn.addEventListener('click', function() {
    if (isContactVisible) {
      // Hide contact section
      contactSection.classList.remove('contact-visible');
      contactSection.classList.add('contact-hidden');
      startProjectBtn.querySelector('.btn-text').textContent = 'Start Your Project';
      isContactVisible = false;
    } else {
      // Show contact section
      contactSection.classList.remove('contact-hidden');
      contactSection.classList.add('contact-visible');
      startProjectBtn.querySelector('.btn-text').textContent = 'Close Contact';
      isContactVisible = true;

      // Smooth scroll to contact section
      setTimeout(() => {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  });
}

/*
==============================================
TESTIMONIALS SWIPER FUNCTIONALITY
==============================================
*/
function initializeTestimonialsSwiper() {
  const testimonialsSwiper = document.querySelector('.testimonials-swiper');

  if (!testimonialsSwiper || typeof Swiper === 'undefined') return;

  let swiper;
  let currentDirection = 1; // 1 for forward, -1 for reverse
  let autoplayInterval;

  swiper = new Swiper('.testimonials-swiper', {
    // Basic settings
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },

    // Effects
    effect: 'slide',
    speed: 600,

    // Responsive breakpoints
    breakpoints: {
      // Mobile devices
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: true,
      },
      // Mobile landscape and small tablets
      576: {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
      },
      // Tablets
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
        centeredSlides: false,
      },
      // Large tablets and small desktops
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
      },
      // Large desktops
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: true,
      }
    },

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous testimonial',
      nextSlideMessage: 'Next testimonial',
    },

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Events
    on: {
      init: function() {
        console.log('Testimonials swiper initialized with center focus');
        startCustomAutoplay();
      }
    }
  });

  function startCustomAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }

    autoplayInterval = setInterval(() => {
      const currentIndex = swiper.activeIndex;
      const totalSlides = swiper.slides.length;
      const maxIndex = totalSlides - 1;

      if (currentDirection === 1) {
        // Moving forward
        if (currentIndex < maxIndex) {
          swiper.slideNext();
        } else {
          // Reached the end, reverse direction
          currentDirection = -1;
          swiper.slidePrev();
        }
      } else {
        // Moving backward
        if (currentIndex > 0) {
          swiper.slidePrev();
        } else {
          // Reached the beginning, go forward again
          currentDirection = 1;
          swiper.slideNext();
        }
      }
    }, 4000);
  }

  function stopCustomAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Pause on hover
  testimonialsSwiper.addEventListener('mouseenter', stopCustomAutoplay);
  testimonialsSwiper.addEventListener('mouseleave', startCustomAutoplay);

  // Pause on user interaction
  swiper.on('slideChange', function() {
    if (this.touches && this.touches.diff) {
      // User is interacting, pause for a moment
      stopCustomAutoplay();
      setTimeout(startCustomAutoplay, 6000);
    }
  });
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
        const originalText = submitButton.querySelector('.btn-text').textContent;
        submitButton.querySelector('.btn-text').textContent = "Sending...";
        submitButton.disabled = true;

        setTimeout(() => {
          submitButton.querySelector('.btn-text').textContent = "Message Sent!";
          submitButton.style.background = "#10b981";

          // Reset form after success
          setTimeout(() => {
            this.reset();
            submitButton.querySelector('.btn-text').textContent = originalText;
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
SHOW MORE GALLERY FUNCTIONALITY
==============================================
*/
function initializeShowMoreButton() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenItems = document.querySelectorAll('.gallery-item-hidden');

  if (!showMoreBtn || hiddenItems.length === 0) return;

  let isExpanded = false;

  showMoreBtn.addEventListener('click', function() {
    if (isExpanded) {
      // Hide items in reverse order (bottom to top) with horizontal slide
      const reversedItems = Array.from(hiddenItems).reverse();
      reversedItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('gallery-item-visible');
          item.classList.add('gallery-item-hiding');
        }, index * 80);
      });

      // After all animations complete, actually hide the items
      setTimeout(() => {
        hiddenItems.forEach(item => {
          item.classList.remove('gallery-item-hiding');
          item.classList.add('gallery-item-hidden');
        });
      }, reversedItems.length * 80 + 500);

      showMoreBtn.innerHTML = `
        Show More
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="ms-2">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      `;
      showMoreBtn.classList.remove('expanded');
      isExpanded = false;
    } else {
      // Show additional items
      hiddenItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('gallery-item-hidden');
          item.classList.add('gallery-item-visible');
        }, index * 100);
      });

      showMoreBtn.innerHTML = `
        Show Less
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="ms-2">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      `;
      showMoreBtn.classList.add('expanded');
      isExpanded = true;

      // Update lightbox triggers after showing new items
      setTimeout(() => {
        if (window.lightbox) {
          window.lightbox.updateTriggers();
        }
      }, hiddenItems.length * 100 + 200);
    }
  });
}

/*
==============================================
LIGHTBOX FUNCTIONALITY
==============================================
*/
function initializeGraphicsLightbox() {
  // Always create a new lightbox instance for graphics page
  window.lightbox = new GraphicsLightbox();
}

class GraphicsLightbox {
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
    this.updateTriggers();

    if (!this.closeBtn || !this.prevBtn || !this.nextBtn || !this.overlay) {
      return;
    }

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

    // Remove any existing delegation handler
    if (this.delegationHandler) {
      document.removeEventListener("click", this.delegationHandler);
    }

    // Use event delegation
    this.delegationHandler = (e) => {
      const trigger = e.target.closest(".lightbox-trigger");
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const index = this.triggers.indexOf(trigger);
        if (index !== -1) {
          this.open(index);
        }
      }
    };

    document.addEventListener("click", this.delegationHandler);
  }

  open(index) {
    this.currentIndex = index;
    const trigger = this.triggers[index];

    if (!trigger) return;

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
  const duration = 2000;
  const startTime = performance.now();

  const animateCount = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic function
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easedProgress * target);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(animateCount);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(animateCount);
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*
==============================================
PERFORMANCE OPTIMIZATIONS
==============================================
*/
function initializePerformanceOptimizations() {
  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
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
  }

  // Preload critical images
  const criticalImages = [
    "../assets/img/showcase/showcase-1.webp",
    "../assets/img/showcase/showcase-2.webp",
    "../assets/img/showcase/showcase-3.webp",
  ];

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
HERO 3D FLIP CARD SYSTEM
==============================================
*/
function initializeHero3DFlipCard() {
  const heroCard = document.getElementById("heroFlipCard");

  if (!heroCard) return;

  // Array of all showcase images
  const showcaseImages = [
    "../assets/img/showcase/showcase-2.webp",
    "../assets/img/showcase/showcase-3.webp",
    "../assets/img/showcase/showcase-4.webp",
    "../assets/img/showcase/showcase-5.webp",
    "../assets/img/showcase/showcase-6.webp",
    "../assets/img/showcase/showcase-7.webp",
    "../assets/img/showcase/showcase-8.webp",
    "../assets/img/showcase/showcase-9.webp",
    "../assets/img/showcase/showcase-10.webp",
  ];

  let currentImageIndex = 0;
  let isFlipped = false;

  // Start automatic image cycling
  setInterval(() => {
    cycleHeroCardImage(heroCard, showcaseImages, currentImageIndex);
    currentImageIndex = (currentImageIndex + 1) % showcaseImages.length;
  }, 3000); // Change image every 3 seconds

  // Add subtle mouse parallax effect
  addHeroCardParallaxEffect(heroCard);
}

function cycleHeroCardImage(card, images, nextIndex) {
  const frontImg = card.querySelector(".hero-flip-card-front img");
  const backImg = card.querySelector(".hero-flip-card-back img");

  // Determine which side is currently visible
  const isCurrentlyFlipped = card.classList.contains("flipped");

  // Update the hidden side with the next image
  if (isCurrentlyFlipped) {
    // Back is visible, update front
    frontImg.src = images[nextIndex];
  } else {
    // Front is visible, update back
    backImg.src = images[nextIndex];
  }

  // Wait a moment for image to load, then flip
  setTimeout(() => {
    flipHeroCard(card);
  }, 100);
}

function flipHeroCard(card) {
  // Toggle the flipped class to trigger the 3D flip animation
  card.classList.toggle("flipped");
}

// Add subtle mouse parallax effect for hero card
function addHeroCardParallaxEffect(heroCard) {
  const cardContainer = heroCard.closest(".hero-flip-card-container");

  if (!cardContainer) return;

  // Throttled mouse move handler for performance
  const handleMouseMove = throttle((e) => {
    const rect = cardContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate parallax offset (very subtle effect)
    const maxRotation = 8;
    const rotateX = (mouseY / rect.height) * maxRotation;
    const rotateY = -(mouseX / rect.width) * maxRotation;

    // Apply subtle parallax transform
    heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, 16); // ~60fps

  // Add mouse move listener to the container
  cardContainer.addEventListener("mousemove", handleMouseMove);

  // Reset position when mouse leaves
  cardContainer.addEventListener("mouseleave", () => {
    heroCard.style.transform = "";
  });
}

/*
==============================================
UTILITY FUNCTIONS
==============================================
*/

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

// Export functions for external use
window.GraphicsPortfolio = {
  animateCounter,
  initializeHero3DFlipCard,
  flipHeroCard,
};
