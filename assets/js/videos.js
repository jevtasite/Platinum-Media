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
  initializeVideoCarousel();
  initializeProductionProcess();
  initializeClientShowcase();
  initializeVideoPlayers();
  initializeVideoToggle();

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
        const originalText = submitButton.querySelector('.btn-text').textContent;
        submitButton.querySelector('.btn-text').textContent = "Message Sent!";
        submitButton.style.background = "#10b981";
        submitButton.disabled = true;

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

  // Make openVideoModal globally accessible
  window.openVideoModal = function(videoSrc, title, hideTitle) {
    modalVideo.src = videoSrc;

    // Hide title if specified (for hero carousel videos)
    if (hideTitle) {
      modalTitle.style.display = 'none';
    } else {
      modalTitle.textContent = title || '';
      modalTitle.style.display = '';
    }

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto play video
    modalVideo.play().catch(e => {
      console.log('Video autoplay prevented:', e);
    });
  };

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
VIDEO CAROUSEL FUNCTIONALITY
==============================================
*/
function initializeVideoCarousel() {
  const carousel = document.getElementById('heroVideoCarousel');

  if (!carousel) return;

  // All available videos
  const allVideos = [
    { src: '../assets/vid/highlight-1.mp4#t=0.5', label: 'Highlight Reels' },
    { src: '../assets/vid/highlight-2.mp4#t=0.5', label: 'Highlight Reels' },
    { src: '../assets/vid/highlight-3.mp4#t=0.5', label: 'Highlight Reels' },
    { src: '../assets/vid/vid-showcase-4.mp4#t=0.5', label: 'Highlight Reels' },
    { src: '../assets/vid/vid-showcase-5.mp4#t=0.5', label: 'Highlight Reels' },
    { src: '../assets/vid/vid-showcase-6.mp4#t=0.5', label: 'Highlight Reels' }
  ];

  // Shuffle array
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Get 4 random videos
  const randomVideos = shuffleArray(allVideos).slice(0, 4);

  // Generate carousel items
  randomVideos.forEach((videoData, index) => {
    const item = document.createElement('div');
    item.className = 'video-carousel-item';
    item.innerHTML = `
      <div class="mini-video-preview">
        <video class="mini-video-thumb" preload="metadata" muted playsinline>
          <source src="${videoData.src}" type="video/mp4">
        </video>
        <div class="mini-video-overlay">
          <div class="mini-play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div class="video-category-badge">${videoData.label}</div>
      </div>
    `;
    carousel.appendChild(item);
  });

  // Old carousel item functionality
  const carouselItems = document.querySelectorAll('.video-carousel-item');

  if (!carouselItems.length) return;

  // Video data for carousel items (keeping old structure for compatibility)
  const carouselVideos = [
    {
      video: randomVideos[0]?.src || '../assets/video/highlight-reel-preview.mp4',
      title: 'Highlight Reels Collection'
    },
    {
      video: randomVideos[1]?.src || '../assets/video/training-montage-preview.mp4',
      title: 'Training Sessions'
    },
    {
      video: randomVideos[2]?.src || '../assets/video/behind-scenes-preview.mp4',
      title: 'Behind the Scenes'
    },
    {
      video: '../assets/video/gameday-coverage-preview.mp4',
      title: 'Game Day Coverage'
    }
  ];

  carouselItems.forEach((item, index) => {
    const miniPreview = item.querySelector('.mini-video-preview');
    const playBtn = item.querySelector('.mini-play-btn');
    const videoElement = item.querySelector('.mini-video-thumb');

    if (!miniPreview || !playBtn) return;

    // Add click handler to open video modal with actual video
    miniPreview.addEventListener('click', function() {
      const videoSrc = randomVideos[index]?.src;

      if (videoSrc && typeof openVideoModal === 'function') {
        // Pass true as third parameter to hide the title
        openVideoModal(videoSrc, '', true);
      } else {
        // Fallback: scroll to main gallery
        const gallerySection = document.querySelector('.featured-videos');
        if (gallerySection) {
          gallerySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });

    // Add hover animation effects
    miniPreview.addEventListener('mouseenter', function() {
      // Add subtle animation or effect
      this.style.transform = 'translateY(-4px) scale(1.05)';
    });

    miniPreview.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });

    // Add keyboard accessibility
    miniPreview.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // Make it focusable
    miniPreview.setAttribute('tabindex', '0');
    miniPreview.setAttribute('role', 'button');
    miniPreview.setAttribute('aria-label', `Play ${carouselVideos[index]?.title || 'video'}`);
  });

  // Add sequential fade-in animation
  carouselItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    setTimeout(() => {
      item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 150 + 800); // Start after hero content loads
  });
}

/*
==============================================
PRODUCTION PROCESS ANIMATIONS
==============================================
*/
function initializeProductionProcess() {
  const processSteps = document.querySelectorAll('.process-step');
  const processTitle = document.querySelector('.process-title');

  if (!processSteps.length) return;

  // Animate the title first
  if (processTitle) {
    setTimeout(() => {
      processTitle.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      processTitle.style.opacity = '1';
      processTitle.style.transform = 'translateY(0)';
    }, 1000); // Start after hero content
  }

  // Add sequential fade-in animation for process steps
  processSteps.forEach((step, index) => {
    // Animate in sequence with delay
    setTimeout(() => {
      step.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      step.style.opacity = '1';
      step.style.transform = 'translateX(0)';
    }, index * 200 + 1400); // Start after title animation
  });

  // Add hover animations
  processSteps.forEach((step, index) => {
    const stepIcon = step.querySelector('.step-icon');
    const stepNumber = step.querySelector('.step-number');

    if (!stepIcon || !stepNumber) return;

    // Enhanced hover effects
    step.addEventListener('mouseenter', function() {
      // Icon pulse animation
      stepIcon.style.transform = 'scale(1.1)';
      stepIcon.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.2)';

      // Number glow effect
      stepNumber.style.color = 'rgba(255, 255, 255, 0.8)';
      stepNumber.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
    });

    step.addEventListener('mouseleave', function() {
      // Reset animations
      stepIcon.style.transform = '';
      stepIcon.style.boxShadow = '';
      stepNumber.style.color = '';
      stepNumber.style.textShadow = '';
    });

    // Add click animation
    step.addEventListener('click', function() {
      // Brief scale animation on click
      this.style.transform = 'translateX(4px) scale(0.98)';

      setTimeout(() => {
        this.style.transform = 'translateX(0)';
      }, 150);
    });

    // Add keyboard accessibility
    step.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // Make steps focusable for accessibility
    step.setAttribute('tabindex', '0');
    step.setAttribute('role', 'button');
    step.setAttribute('aria-label', `Production step ${index + 1}: ${step.querySelector('.step-title')?.textContent || ''}`);
  });

  // Intersection Observer for scroll-triggered animations
  const processObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -20px 0px'
  };

  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');

        // Add progressive highlight effect
        const steps = Array.from(processSteps);
        const currentIndex = steps.indexOf(entry.target);

        steps.forEach((step, index) => {
          if (index <= currentIndex) {
            setTimeout(() => {
              step.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              step.style.background = 'rgba(255, 255, 255, 0.05)';

              // Reset after animation
              setTimeout(() => {
                step.style.borderColor = '';
                step.style.background = '';
              }, 800);
            }, index * 100);
          }
        });
      }
    });
  }, processObserverOptions);

  // Observe each process step
  processSteps.forEach((step) => {
    processObserver.observe(step);
  });
}

/*
==============================================
CLIENT SHOWCASE MARQUEE
==============================================
*/
function initializeClientShowcase() {
  const marqueeContainer = document.querySelector('.client-marquee');
  const marqueeContent = document.querySelector('.marquee-content');
  const clientItems = document.querySelectorAll('.client-item');

  if (!marqueeContainer || !marqueeContent || !clientItems.length) return;

  // Initialize marquee with fade-in effect
  marqueeContainer.style.opacity = '0';

  setTimeout(() => {
    marqueeContainer.style.transition = 'opacity 1s ease-out';
    marqueeContainer.style.opacity = '1';
  }, 1800); // Start after other sections load

  // Add enhanced interactions for each client item
  clientItems.forEach((item, index) => {
    const clientName = item.querySelector('.client-name');

    if (clientName) {
      // Make items focusable for accessibility
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Client: ${clientName.textContent || ''}`);
    }

    // Add hover pause functionality
    item.addEventListener('mouseenter', function() {
      marqueeContent.style.animationPlayState = 'paused';
    });

    item.addEventListener('mouseleave', function() {
      marqueeContent.style.animationPlayState = 'running';
    });

    // Add focus pause for keyboard navigation
    item.addEventListener('focus', function() {
      marqueeContent.style.animationPlayState = 'paused';
    });

    item.addEventListener('blur', function() {
      marqueeContent.style.animationPlayState = 'running';
    });

    // Add keyboard accessibility
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Brief highlight effect on interaction
        this.style.transform = 'translateY(-3px)';
        this.style.zIndex = '200';

        setTimeout(() => {
          this.style.transform = '';
          this.style.zIndex = '';
        }, 200);
      }
    });
  });

  // Intersection Observer for performance optimization
  const marqueeObserverOptions = {
    threshold: 0.1,
    rootMargin: '100px 0px'
  };

  const marqueeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Resume animation when in view
        marqueeContent.style.animationPlayState = 'running';
      } else {
        // Pause animation when out of view for performance
        marqueeContent.style.animationPlayState = 'paused';
      }
    });
  }, marqueeObserverOptions);

  // Observe the marquee container
  marqueeObserver.observe(marqueeContainer);

  // Handle reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    marqueeContent.style.animationPlayState = 'paused';

    // Convert to centered grid for reduced motion users
    const clientStrips = marqueeContainer.querySelectorAll('.client-strip');
    clientStrips.forEach(strip => {
      strip.style.justifyContent = 'center';
      strip.style.flexWrap = 'wrap';
      strip.style.gap = 'var(--space-md)';
    });
  }

  // Add touch/drag support for mobile
  let isDragging = false;
  let startX = 0;

  marqueeContent.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    this.style.animationPlayState = 'paused';
  }, { passive: true });

  marqueeContent.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
  }, { passive: false });

  marqueeContent.addEventListener('touchend', function(e) {
    isDragging = false;
    this.style.animationPlayState = 'running';
  }, { passive: true });
}

/*
==============================================
VIDEO TOGGLE (SHOW MORE/LESS) FUNCTIONALITY
==============================================
*/
function initializeVideoToggle() {
  const toggleBtn = document.getElementById('videoToggleBtn');
  const hiddenVideos = document.querySelectorAll('.video-item-hidden');
  const featuredVideosSection = document.querySelector('.featured-videos');

  if (!toggleBtn || !hiddenVideos.length) return;

  let isExpanded = false;

  toggleBtn.addEventListener('click', function() {
    isExpanded = !isExpanded;

    hiddenVideos.forEach((video, index) => {
      if (isExpanded) {
        // Show videos with staggered animation
        setTimeout(() => {
          video.style.display = 'block';
          requestAnimationFrame(() => {
            video.style.opacity = '1';
            video.style.transform = 'translateY(0) scale(1)';
          });
        }, index * 100);
      } else {
        // Hide videos with staggered animation
        setTimeout(() => {
          video.style.opacity = '0';
          video.style.transform = 'translateY(20px) scale(0.95)';

          setTimeout(() => {
            video.style.display = 'none';
          }, 300);
        }, index * 50);

        // Scroll to top of the section when hiding videos
        if (featuredVideosSection) {
          setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            const headerHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = featuredVideosSection.offsetTop - headerHeight - 20;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 150);
        }
      }
    });

    // Update button text
    const btnText = this.querySelector('.btn-text');
    btnText.textContent = isExpanded ? 'Show Less' : 'Show More';
  });
}

/*
==============================================
VIDEO PLAYER FUNCTIONALITY
==============================================
*/
function initializeVideoPlayers() {
  const videoItems = document.querySelectorAll('.video-item');
  let touchStartY = 0;
  let touchEndY = 0;

  videoItems.forEach(item => {
    const video = item.querySelector('.video-player');

    // Toggle play/pause on click
    video.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    });

    // Track touch start position
    video.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    // Handle touch events for mobile - only if not scrolling
    video.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].clientY;
      const scrollDistance = Math.abs(touchEndY - touchStartY);

      // Only play/pause if user didn't scroll (moved less than 10px)
      if (scrollDistance < 10) {
        e.preventDefault();
        e.stopPropagation();
        if (this.paused) {
          this.play();
        } else {
          this.pause();
        }
      }
    });
  });

  // Handle fullscreen changes to maintain aspect ratio
  document.addEventListener('fullscreenchange', handleVideoFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleVideoFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleVideoFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleVideoFullscreenChange);
}

function handleVideoFullscreenChange() {
  const fullscreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  if (fullscreenElement && fullscreenElement.classList.contains('video-player')) {
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
    fullscreenElement.style.borderRadius = '0';
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