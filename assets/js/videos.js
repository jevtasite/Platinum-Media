/*
==============================================
PLATINUM MEDIA - VIDEOS PAGE JAVASCRIPT
==============================================
*/

// Sample videos data - replace with actual CMS/API data
const videosData = {
  "athlete-highlights": [
    {
      id: 1,
      title: "Athlete Highlight Reel",
      category: "Athlete Highlights",
      type: "Highlight",
      date: "2024-12-15",
      thumbnail: "../assets/img/video-thumbs/video-thumb-1.webp",
      video: "../assets/video/highlight-1.mp4",
      duration: "1:24",
    },
    {
      id: 2,
      title: "Training Montage",
      category: "Training",
      type: "Montage",
      date: "2024-12-10",
      thumbnail: "../assets/img/video-thumbs/video-thumb-2.webp",
      video: "../assets/video/training-2.mp4",
      duration: "2:15",
    },
    {
      id: 3,
      title: "Game Day Highlights",
      category: "Game Day",
      type: "Highlights",
      date: "2024-12-08",
      thumbnail: "../assets/img/video-thumbs/video-thumb-3.webp",
      video: "../assets/video/gameday-3.mp4",
      duration: "1:45",
    },
    {
      id: 4,
      title: "Season Recap",
      category: "Season",
      type: "Recap",
      date: "2024-12-05",
      thumbnail: "../assets/img/video-thumbs/video-thumb-4.webp",
      video: "../assets/video/season-4.mp4",
      duration: "3:20",
    },
    {
      id: 5,
      title: "Skills Showcase",
      category: "Skills",
      type: "Showcase",
      date: "2024-12-01",
      thumbnail: "../assets/img/video-thumbs/video-thumb-5.webp",
      video: "../assets/video/skills-5.mp4",
      duration: "1:58",
    },
    {
      id: 6,
      title: "Behind the Scenes",
      category: "Behind the Scenes",
      type: "Documentary",
      date: "2024-11-28",
      thumbnail: "../assets/img/video-thumbs/video-thumb-6.webp",
      video: "../assets/video/behind-6.mp4",
      duration: "2:42",
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
  initializeVideoModal();
  initializeHeroVideoPreview();

  console.log("Videos page initialized");
});

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
SHOW MORE VIDEOS FUNCTIONALITY
==============================================
*/
function initializeShowMoreButton() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenItems = document.querySelectorAll('.video-item-hidden');

  if (!showMoreBtn || hiddenItems.length === 0) return;

  let isExpanded = false;

  showMoreBtn.addEventListener('click', function() {
    if (isExpanded) {
      // Hide items in reverse order (bottom to top) with horizontal slide
      const reversedItems = Array.from(hiddenItems).reverse();
      reversedItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('video-item-visible');
          item.classList.add('video-item-hiding');
        }, index * 80);
      });

      // After all animations complete, actually hide the items
      setTimeout(() => {
        hiddenItems.forEach(item => {
          item.classList.remove('video-item-hiding');
          item.classList.add('video-item-hidden');
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
          item.classList.remove('video-item-hidden');
          item.classList.add('video-item-visible');
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
    }
  });
}

/*
==============================================
VIDEO MODAL FUNCTIONALITY
==============================================
*/
function initializeVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('videoModalTitle');
  const closeBtn = document.getElementById('videoModalClose');
  const videoTriggers = document.querySelectorAll('.video-trigger');

  if (!videoModal || !modalVideo || !closeBtn) return;

  // Add event listeners to video triggers
  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const videoSrc = this.getAttribute('data-video');
      const videoTitle = this.getAttribute('data-title');

      if (videoSrc) {
        openVideoModal(videoSrc, videoTitle);
      }
    });
  });

  // Close modal events
  closeBtn.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Keyboard events
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });

  function openVideoModal(videoSrc, title) {
    modalVideo.src = videoSrc;
    modalTitle.textContent = title || '';
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto play video
    modalVideo.play().catch(e => {
      console.log('Video autoplay prevented:', e);
    });
  }

  function closeVideoModal() {
    modalVideo.pause();
    modalVideo.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/*
==============================================
HERO VIDEO PREVIEW FUNCTIONALITY
==============================================
*/
function initializeHeroVideoPreview() {
  const previewVideo = document.querySelector('.preview-video');
  const playBtn = document.querySelector('.hero-video-preview .video-play-btn');

  if (!previewVideo || !playBtn) return;

  playBtn.addEventListener('click', function() {
    if (previewVideo.paused) {
      previewVideo.play().catch(e => {
        console.log('Video play prevented:', e);
      });
      this.style.opacity = '0';
    } else {
      previewVideo.pause();
      this.style.opacity = '1';
    }
  });

  // Show play button when video ends
  previewVideo.addEventListener('ended', function() {
    playBtn.style.opacity = '1';
  });

  // Hide play button when video starts playing
  previewVideo.addEventListener('play', function() {
    playBtn.style.opacity = '0';
  });

  // Show play button when video is paused
  previewVideo.addEventListener('pause', function() {
    playBtn.style.opacity = '1';
  });
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

  // Preload critical video thumbnails
  const criticalThumbnails = [
    "../assets/img/video-thumbs/video-thumb-1.webp",
    "../assets/img/video-thumbs/video-thumb-2.webp",
    "../assets/img/video-thumbs/video-thumb-3.webp",
  ];

  criticalThumbnails.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });

  // Optimize hero video
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    // Pause video when page is not visible
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(e => {
          console.log('Hero video autoplay prevented:', e);
        });
      }
    });

    // Reduce video quality on mobile for performance
    if (window.innerWidth <= 768) {
      heroVideo.playbackRate = 0.8;
    }
  }
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

// Initialize contact form when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeContactForm();
});

// Export functions for external use
window.VideosPortfolio = {
  animateCounter,
  initializeVideoModal,
  initializeHeroVideoPreview,
};