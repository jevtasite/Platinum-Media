/**
 * DIGITAL PITCH - PLATINUM MEDIA
 * Production-Level JavaScript
 * Advanced Interactions & Performance Optimizations
 */

class DigitalPitch {
  constructor() {
    this.init();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.createFieldGrid();
    this.initCounters();
    this.setupSmoothScroll();
    this.optimizePerformance();
  }

  /**
   * Initialize core functionality
   */
  init() {
    this.navbar = document.getElementById("mainNav");
    this.fieldGrid = document.getElementById("fieldGrid");
    this.body = document.body;
    this.isScrolling = false;
    this.scrollTimeout = null;

    // Performance tracking
    this.performanceMetrics = {
      scriptStart: performance.now(),
      domReady: null,
      firstInteraction: null,
    };

    // Throttled scroll handler
    this.handleScroll = this.throttle(this.onScroll.bind(this), 16); // 60fps

    console.log("🏈 Digital Pitch initialized");
  }

  /**
   * Bind event listeners with performance optimization
   */
  bindEvents() {
    // Passive listeners for better performance
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener(
      "resize",
      this.throttle(this.onResize.bind(this), 250),
      { passive: true }
    );

    // Navbar interactions
    document.querySelectorAll("[data-scroll-target]").forEach((link) => {
      link.addEventListener("click", this.smoothScrollTo.bind(this));
    });

    // Enhanced button hover effects
    this.setupButtonEffects();

    // Form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    // Performance tracking
    document.addEventListener("DOMContentLoaded", () => {
      this.performanceMetrics.domReady = performance.now();
    });

    // First user interaction
    ["click", "keydown", "touchstart"].forEach((event) => {
      document.addEventListener(
        event,
        () => {
          if (!this.performanceMetrics.firstInteraction) {
            this.performanceMetrics.firstInteraction = performance.now();
          }
        },
        { once: true, passive: true }
      );
    });
  }

  /**
   * Enhanced button effects
   */
  setupButtonEffects() {
    const buttons = document.querySelectorAll(".btn-primary-custom");

    buttons.forEach((button) => {
      // Add magnetic effect on desktop
      if (window.innerWidth > 768) {
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const distance = Math.sqrt(x * x + y * y);
          const maxDistance = 50;

          if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = x * strength * 0.1;
            const moveY = y * strength * 0.1;

            button.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-3px)`;
          }
        });

        button.addEventListener("mouseleave", () => {
          button.style.transform = "";
        });
      }

      // Click ripple effect
      button.addEventListener("click", (e) => {
        this.createRipple(e, button);
      });
    });
  }

  /**
   * Create ripple effect on button click
   */
  createRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("div");

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 100;
    `;

    button.style.position = "relative";
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Optimized scroll handler
   */
  onScroll() {
    const scrollY = window.pageYOffset;

    // Navbar scroll effect
    if (scrollY > 100) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }

    // Parallax effects for hero section
    if (scrollY < window.innerHeight) {
      this.updateParallax(scrollY);
    }

    // Update scroll indicator
    this.updateScrollIndicator(scrollY);

    // Mark scrolling state
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 150);
  }

  /**
   * Parallax effects with performance optimization
   */
  updateParallax(scrollY) {
    const heroContent = document.querySelector(".hero-content");
    const floatingElements = document.querySelectorAll(".element");

    if (heroContent && window.innerWidth > 768) {
      const translateY = scrollY * 0.5;
      heroContent.style.transform = `translateY(${translateY}px)`;
    }

    // Animate floating elements
    floatingElements.forEach((element, index) => {
      const speed = 0.3 + index * 0.1;
      const translateY = scrollY * speed;
      const rotate = scrollY * 0.1;
      element.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    });
  }

  /**
   * Update scroll indicator
   */
  updateScrollIndicator(scrollY) {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - scrollY / 300);
      scrollIndicator.style.opacity = opacity;
    }
  }

  /**
   * Handle window resize with debouncing
   */
  onResize() {
    // Recreate field grid on resize
    this.createFieldGrid();

    // Update viewport height for mobile
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }

  /**
   * Create dynamic field grid
   */
  createFieldGrid() {
    if (!this.fieldGrid) return;

    this.fieldGrid.innerHTML = "";

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const gridSize = 100; // 100px grid

    // Create horizontal lines
    for (let i = 0; i <= containerHeight; i += gridSize) {
      const line = document.createElement("div");
      line.className = "field-line horizontal";
      line.style.top = `${i}px`;
      line.style.animationDelay = `${Math.random() * 0.5}s`;
      this.fieldGrid.appendChild(line);
    }

    // Create vertical lines
    for (let i = 0; i <= containerWidth; i += gridSize) {
      const line = document.createElement("div");
      line.className = "field-line vertical";
      line.style.left = `${i}px`;
      line.style.animationDelay = `${Math.random() * 0.5}s`;
      this.fieldGrid.appendChild(line);
    }
  }

  /**
   * Intersection Observer for animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-aos attribute
    document.querySelectorAll("[data-aos]").forEach((el) => {
      this.observer.observe(el);
    });

    // Observe elements with data-delay attribute
    document.querySelectorAll("[data-delay]").forEach((el) => {
      this.observer.observe(el);
    });
  }

  /**
   * Animate elements on intersection
   */
  animateElement(element) {
    const animationType = element.getAttribute("data-aos") || "fade-up";
    const delay = element.getAttribute("data-delay") || 0;

    setTimeout(() => {
      element.classList.add("aos-animate");

      // Custom animations based on type
      switch (animationType) {
        case "fade-up":
          this.fadeUpAnimation(element);
          break;
        case "fade-left":
          this.fadeLeftAnimation(element);
          break;
        case "fade-right":
          this.fadeRightAnimation(element);
          break;
        default:
          this.fadeUpAnimation(element);
      }
    }, parseInt(delay));

    // Unobserve to prevent re-triggering
    this.observer.unobserve(element);
  }

  /**
   * Animation methods
   */
  fadeUpAnimation(element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  }

  fadeLeftAnimation(element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(30px)";
    element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
    });
  }

  fadeRightAnimation(element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(-30px)";
    element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
    });
  }

  /**
   * Initialize counter animations
   */
  initCounters() {
    const counters = document.querySelectorAll("[data-counter]");

    counters.forEach((counter) => {
      this.observer.observe(counter);
      counter.addEventListener("intersect", () => {
        this.animateCounter(counter);
      });
    });
  }

  /**
   * Animate counter numbers
   */
  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-counter"));
    const duration = 2000; // 2 seconds
    const start = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Smooth scroll implementation
   */
  setupSmoothScroll() {
    // Polyfill for browsers without smooth scroll support
    if (!("scrollBehavior" in document.documentElement.style)) {
      this.polyfillSmoothScroll();
    }

    // Handle dropdown clicks for scroll targets
    this.setupDropdownScrolling();
  }

  /**
   * Setup dropdown scrolling for internal links
   */
  setupDropdownScrolling() {
    document
      .querySelectorAll(".dropdown-item[data-scroll-target]")
      .forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();

          // Close the dropdown
          const dropdown = item.closest(".dropdown");
          if (dropdown) {
            const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
            if (dropdownToggle) {
              // Use Bootstrap's dropdown API to close
              const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
              if (bsDropdown) {
                bsDropdown.hide();
              }
            }
          }

          // Close mobile navbar if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }

          // Scroll to target
          const targetId = item.getAttribute("data-scroll-target");
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const navbarHeight = this.navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            // Use native smooth scroll if available
            if ("scrollBehavior" in document.documentElement.style) {
              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            } else {
              this.smoothScrollPolyfill(targetPosition);
            }

            // Update active nav link
            this.updateActiveNavLink(targetId);
          }
        });
      });
  }

  smoothScrollTo(event) {
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute("data-scroll-target");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const navbarHeight = this.navbar.offsetHeight;
    const targetPosition = targetElement.offsetTop - navbarHeight;

    // Use native smooth scroll if available
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      this.smoothScrollPolyfill(targetPosition);
    }

    // Update active nav link
    this.updateActiveNavLink(targetId);

    // Close mobile menu if open
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      bootstrap.Collapse.getInstance(navbarCollapse).hide();
    }
  }

  /**
   * Smooth scroll polyfill for older browsers
   */
  smoothScrollPolyfill(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuart(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  /**
   * Easing function for smooth scroll
   */
  easeInOutQuart(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  }

  /**
   * Update active navigation link
   */
  updateActiveNavLink(activeId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.querySelector(
      `[data-scroll-target="${activeId}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  /**
   * Handle contact form submission
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Disable submit button during processing
    submitButton.disabled = true;
    submitButton.innerHTML = "<span>SENDING...</span>";

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      this.showFormNotification("Message sent successfully! 🏈", "success");
      form.reset();
      this.resetFormLabels();

      submitButton.disabled = false;
      submitButton.innerHTML =
        '<span>SEND MESSAGE</span><div class="btn-arrow">→</div>';
    }, 2000);
  }

  /**
   * Reset form labels after form reset
   */
  resetFormLabels() {
    document.querySelectorAll(".form-control").forEach((input) => {
      input.classList.remove("filled");
    });
  }

  /**
   * Show form notification
   */
  showFormNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `form-notification ${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#4CAF50" : "#f44336"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-family: var(--font-secondary);
      font-weight: 600;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
    });

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  /**
   * Performance optimization methods
   */
  optimizePerformance() {
    // Preload critical resources
    this.preloadCriticalResources();

    // Lazy load non-critical images
    this.setupLazyLoading();

    // Optimize animations for mobile
    this.optimizeForMobile();

    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources() {
    const criticalResources = [
      "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@600&family=Inter:wght@400;500&display=swap",
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  /**
   * Setup lazy loading for images
   */
  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Optimize animations for mobile devices
   */
  optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Disable all animations for users who prefer reduced motion
      document.documentElement.style.setProperty("--duration-slow", "0.01s");
      document.documentElement.style.setProperty("--duration-normal", "0.01s");

      // Remove all animations
      const floatingElements = document.querySelectorAll(".element");
      floatingElements.forEach((element) => {
        element.style.animation = "none";
      });

      if (this.fieldGrid) {
        this.fieldGrid.style.display = "none";
      }
    } else if (isMobile) {
      // Mobile optimizations but keep some animations
      document.documentElement.style.setProperty("--duration-slow", "0.4s");
      document.documentElement.style.setProperty("--duration-normal", "0.3s");

      // Remove parallax effects but keep floating elements
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.transform = "none";
      }

      // Optimize floating elements for mobile
      const floatingElements = document.querySelectorAll(".element");
      floatingElements.forEach((element, index) => {
        element.style.animation = `floatMobile ${
          4 + index
        }s ease-in-out infinite`;
        element.style.animationDelay = `${index * 1.5}s`;
      });

      // Simplify field grid on mobile
      if (this.fieldGrid) {
        this.fieldGrid.style.display = "none";
      }
    }

    // Touch-specific optimizations
    if ("ontouchstart" in window) {
      this.setupTouchOptimizations();
    }

    // Handle orientation changes
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });
  }

  /**
   * Setup touch-specific optimizations
   */
  setupTouchOptimizations() {
    // Add touch-friendly hover states
    document.body.classList.add("touch-device");

    // Enable floating elements on mobile with optimized animations
    const floatingElements = document.querySelectorAll(".element");
    floatingElements.forEach((element, index) => {
      // Lighter animation for mobile
      element.style.willChange = "transform";
      element.style.animation = `floatMobile ${
        4 + index
      }s ease-in-out infinite`;
      element.style.animationDelay = `${index * 1.5}s`;
    });

    // Optimize button interactions for touch
    const buttons = document.querySelectorAll(
      ".btn-primary-custom, .portfolio-card, .service-card"
    );
    buttons.forEach((button) => {
      button.addEventListener(
        "touchstart",
        (e) => {
          button.style.transform = "scale(0.98)";
        },
        { passive: true }
      );

      button.addEventListener(
        "touchend",
        (e) => {
          setTimeout(() => {
            button.style.transform = "";
          }, 150);
        },
        { passive: true }
      );
    });

    // Prevent zoom on form focus (iOS)
    const formInputs = document.querySelectorAll("input, textarea, select");
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (window.innerWidth < 768) {
          document
            .querySelector("meta[name=viewport]")
            .setAttribute(
              "content",
              "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            );
        }
      });

      input.addEventListener("blur", () => {
        document
          .querySelector("meta[name=viewport]")
          .setAttribute("content", "width=device-width, initial-scale=1");
      });
    });
  }

  /**
   * Handle orientation changes
   */
  handleOrientationChange() {
    // Update viewport height
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );

    // Recreate field grid if needed
    if (window.innerWidth > 768) {
      this.createFieldGrid();
    }

    // Adjust hero section height
    const heroSection = document.querySelector(".hero-section");
    if (heroSection && window.innerWidth < 768) {
      heroSection.style.minHeight = `${window.innerHeight}px`;
    }
  }

  /**
   * Enhanced mobile scroll handling
   */
  onScroll() {
    const scrollY = window.pageYOffset;
    const isMobile = window.innerWidth <= 768;

    // Navbar scroll effect
    if (scrollY > 50) {
      // Reduced threshold for mobile
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }

    // Only apply parallax on desktop
    if (!isMobile && scrollY < window.innerHeight) {
      this.updateParallax(scrollY);
    }

    // Update scroll indicator
    this.updateScrollIndicator(scrollY);

    // Mark scrolling state
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 150);
  }

  /**
   * Mobile-optimized parallax effects
   */
  updateParallax(scrollY) {
    const isMobile = window.innerWidth <= 768;

    // Skip parallax on mobile for performance
    if (isMobile) return;

    const heroContent = document.querySelector(".hero-content");
    const floatingElements = document.querySelectorAll(".element");

    if (heroContent) {
      const translateY = scrollY * 0.3; // Reduced intensity
      heroContent.style.transform = `translateY(${translateY}px)`;
    }

    // Animate floating elements with reduced intensity
    floatingElements.forEach((element, index) => {
      const speed = 0.2 + index * 0.05; // Reduced speed
      const translateY = scrollY * speed;
      const rotate = scrollY * 0.05; // Reduced rotation
      element.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    });
  }

  /**
   * Mobile-optimized field grid creation
   */
  createFieldGrid() {
    if (!this.fieldGrid) return;

    const isMobile = window.innerWidth <= 768;

    // Hide field grid on mobile for performance
    if (isMobile) {
      this.fieldGrid.style.display = "none";
      return;
    }

    this.fieldGrid.style.display = "block";
    this.fieldGrid.innerHTML = "";

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const gridSize = window.innerWidth > 1200 ? 100 : 120; // Larger grid on smaller screens

    // Create fewer lines on tablets for performance
    const isTablet = window.innerWidth <= 1024;
    const lineReduction = isTablet ? 2 : 1;

    // Create horizontal lines with staggered delays
    let lineIndex = 0;
    for (let i = 0; i <= containerHeight; i += gridSize * lineReduction) {
      const line = document.createElement("div");
      line.className = "field-line horizontal";
      line.style.top = `${i}px`;

      // Staggered animation delays for smooth reveal
      const delay = (lineIndex % 5) * 0.1;
      line.style.animationDelay = `${delay}s`;

      this.fieldGrid.appendChild(line);
      lineIndex++;
    }

    // Create vertical lines with staggered delays
    lineIndex = 0;
    for (let i = 0; i <= containerWidth; i += gridSize * lineReduction) {
      const line = document.createElement("div");
      line.className = "field-line vertical";
      line.style.left = `${i}px`;

      // Offset vertical lines slightly from horizontal ones
      const delay = 0.2 + (lineIndex % 5) * 0.1;
      line.style.animationDelay = `${delay}s`;

      this.fieldGrid.appendChild(line);
      lineIndex++;
    }

    // Add pulse effect to center lines
    this.addCenterLinePulse();
  }

  /**
   * Add special pulse effect to center field lines
   */
  addCenterLinePulse() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Find lines near center and add pulse effect
    const fieldLines = this.fieldGrid.querySelectorAll(".field-line");
    fieldLines.forEach((line) => {
      const rect = line.getBoundingClientRect();
      const lineCenter = line.classList.contains("horizontal")
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;

      const center = line.classList.contains("horizontal") ? centerX : centerY;

      if (Math.abs(lineCenter - center) < 50) {
        line.style.animation = `fieldLineReveal ${0.8}s var(--easing-elastic) forwards, 
                                fieldLinePulse 3s ease-in-out infinite 2s`;
      }
    });
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor First Contentful Paint
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            console.log("🎨 First Contentful Paint:", entry.startTime);
          }
        }
      });

      observer.observe({ entryTypes: ["paint"] });
    }

    // Log performance metrics after page load
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log("⚡ Page Load Time:", pageLoadTime + "ms");

        // Log custom metrics
        console.log("📊 Performance Metrics:", {
          scriptInitTime:
            this.performanceMetrics.domReady -
            this.performanceMetrics.scriptStart,
          timeToInteractive:
            this.performanceMetrics.firstInteraction -
            this.performanceMetrics.scriptStart,
          totalLoadTime: pageLoadTime,
        });
      }, 1000);
    });
  }

  /**
   * Utility function: Throttle
   */
  throttle(func, limit) {
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

  /**
   * Utility function: Debounce
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
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

  /**
   * Enhanced form interactions
   */
  setupFormInteractions() {
    const formControls = document.querySelectorAll(".form-control");

    formControls.forEach((control) => {
      // Add focus/blur handlers for label animation
      control.addEventListener("focus", () => {
        control.parentElement.classList.add("focused");
      });

      control.addEventListener("blur", () => {
        control.parentElement.classList.remove("focused");
        if (control.value) {
          control.parentElement.classList.add("filled");
        } else {
          control.parentElement.classList.remove("filled");
        }
      });

      // Check if field has value on load
      if (control.value) {
        control.parentElement.classList.add("filled");
      }
    });
  }

  /**
   * Advanced scroll spy for navigation
   */
  setupScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("[data-scroll-target]");

    const scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            // Update active nav link
            navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("data-scroll-target") === id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    sections.forEach((section) => {
      scrollSpyObserver.observe(section);
    });
  }

  /**
   * Easter egg: Konami code
   */
  setupEasterEgg() {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let userInput = [];

    document.addEventListener("keydown", (e) => {
      userInput.push(e.code);
      userInput = userInput.slice(-konamiCode.length);

      if (userInput.join("") === konamiCode.join("")) {
        this.triggerEasterEgg();
      }
    });
  }

  /**
   * Easter egg animation
   */
  triggerEasterEgg() {
    console.log("🏆 Championship mode activated!");

    // Add special effects
    document.body.classList.add("championship-mode");

    // Create confetti effect
    this.createConfetti();

    // Show special message
    this.showFormNotification("🏆 Championship mode activated! 🏈", "success");

    // Remove effects after 5 seconds
    setTimeout(() => {
      document.body.classList.remove("championship-mode");
    }, 5000);
  }

  /**
   * Create confetti effect
   */
  createConfetti() {
    const colors = ["#FFFFFF", "#4CAF50", "#FFD700"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        z-index: 10000;
        animation: confettiFall 3s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;

      document.body.appendChild(confetti);

      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 3000);
    }
  }

  /**
   * Initialize all enhanced features
   */
  initEnhancedFeatures() {
    this.setupFormInteractions();
    this.setupScrollSpy();
    this.setupEasterEgg();
  }
}

/**
 * CSS for confetti animation (injected dynamically)
 */
function injectConfettiCSS() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes confettiFall {
      to {
        top: 100vh;
        transform: rotate(720deg);
      }
    }
    
    .championship-mode {
      filter: hue-rotate(45deg) saturate(1.2);
    }
    
    .championship-mode .hero-title {
      animation: championshipPulse 0.5s ease-in-out infinite alternate;
    }
    
    @keyframes championshipPulse {
      from { text-shadow: 0 0 10px rgba(76, 175, 80, 0.5); }
      to { text-shadow: 0 0 20px rgba(76, 175, 80, 0.8); }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize the application
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inject confetti CSS
  injectConfettiCSS();

  // Initialize the main application
  const app = new DigitalPitch();

  // Initialize enhanced features
  app.initEnhancedFeatures();

  // Set viewport height for mobile
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );

  console.log("🚀 Platinum Media Digital Pitch - Ready to score!");
});

/**
 * Service Worker registration for PWA capabilities
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
