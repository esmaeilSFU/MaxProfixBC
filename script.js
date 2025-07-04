// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.classList.remove("hidden");
    }
  });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Video Gallery Functionality
const initVideoGallery = () => {
  const galleryScroll = document.querySelector(".gallery-scroll");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const scrollbarTrack = document.querySelector(".scrollbar-track");

  // Update scrollbar thumb width and position
  const updateScrollbar = () => {
    const scrollWidth = galleryScroll.scrollWidth - galleryScroll.clientWidth;
    const scrollLeft = galleryScroll.scrollLeft;
    const thumbWidth =
      (galleryScroll.clientWidth / galleryScroll.scrollWidth) * 100;
    const thumbPosition = (scrollLeft / scrollWidth) * (100 - thumbWidth);

    scrollbarThumb.style.width = `${thumbWidth}%`;
    scrollbarThumb.style.left = `${thumbPosition}%`;
  };

  // Initialize scrollbar
  updateScrollbar();

  // Update scrollbar on scroll
  galleryScroll.addEventListener("scroll", updateScrollbar);

  // Handle scrollbar click
  scrollbarTrack.addEventListener("click", (e) => {
    const rect = scrollbarTrack.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const scrollWidth = galleryScroll.scrollWidth - galleryScroll.clientWidth;
    galleryScroll.scrollLeft = clickPosition * scrollWidth;
  });

  // Handle scrollbar drag
  let isDragging = false;
  let startX;
  let scrollLeft;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - scrollbarThumb.offsetLeft;
    scrollLeft = galleryScroll.scrollLeft;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.clientX - scrollbarTrack.getBoundingClientRect().left;
    const walk =
      (x - startX) * (galleryScroll.scrollWidth / scrollbarTrack.offsetWidth);
    galleryScroll.scrollLeft = scrollLeft + walk;
  });

  // Smooth scroll on mouse wheel
  galleryScroll.addEventListener("wheel", (e) => {
    e.preventDefault();
    galleryScroll.scrollLeft += e.deltaY;
  });

  // Handle window resize
  window.addEventListener("resize", updateScrollbar);
};

// Initialize video gallery when the DOM is loaded
document.addEventListener("DOMContentLoaded", initVideoGallery);
// Hide video thumbnails after playback starts
const initVideoThumbnails = () => {
  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("play", function () {
      this.removeAttribute("poster");
    });
  });
};

// Initialize video thumbnails when the DOM is loaded
document.addEventListener("DOMContentLoaded", initVideoThumbnails);
// Form validation
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // If validation passes, submit the form
    contactForm.submit();
  });
}

// Mobile menu toggle (to be implemented)
const initMobileMenu = () => {
  const header = document.querySelector(".header");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu button
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

  header.querySelector(".nav-container").appendChild(mobileMenuBtn);

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });
};

// Initialize mobile menu
document.addEventListener("DOMContentLoaded", initMobileMenu);

// Review Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("reviewForm");
  const googleReviews = document.getElementById("googleReviews");

  // Handle review submission
  reviewForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(reviewForm);
    const reviewData = {
      rating: formData.get("rating"),
      name: formData.get("name"),
      review: formData.get("review"),
    };

    try {
      // Show loading state
      reviewForm.classList.add("loading");

      // Here you would typically send the review to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Thank you for your review!";
      reviewForm.appendChild(successMessage);

      // Reset form
      reviewForm.reset();

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    } catch (error) {
      // Show error message
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.textContent =
        "There was an error submitting your review. Please try again.";
      reviewForm.appendChild(errorMessage);

      // Remove error message after 3 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 3000);
    } finally {
      reviewForm.classList.remove("loading");
    }
  });

  // Load Google Reviews
  async function loadGoogleReviews() {
    try {
      // Show loading state
      googleReviews.classList.add("loading");

      // Here you would typically fetch reviews from Google Places API
      // For demonstration, we'll use sample data
      const sampleReviews = [
        {
          rating: 5,
          text: "Excellent service! They transformed our old bathtub into something that looks brand new.",
          author: "John Smith",
          date: "2 weeks ago",
        },
        {
          rating: 5,
          text: "Quick response and professional service. The team was very knowledgeable.",
          author: "Emily Davis",
          date: "1 month ago",
        },
        {
          rating: 5,
          text: "Great value for money. The reglazing work was done perfectly.",
          author: "Robert Johnson",
          date: "2 months ago",
        },
      ];

      // Clear existing reviews
      googleReviews.innerHTML = "";

      // Add reviews to the grid
      sampleReviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-card";
        reviewCard.innerHTML = `
                    <div class="review-header">
                        <span class="stars">${"★".repeat(
                          review.rating
                        )}${"☆".repeat(5 - review.rating)}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <p class="review-text">"${review.text}"</p>
                    <div class="reviewer">- ${review.author}</div>
                `;
        googleReviews.appendChild(reviewCard);
      });
    } catch (error) {
      console.error("Error loading Google reviews:", error);
      googleReviews.innerHTML =
        '<div class="error-message">Unable to load reviews. Please try again later.</div>';
    } finally {
      googleReviews.classList.remove("loading");
    }
  }

  // Load reviews when the page loads
  loadGoogleReviews();
});

// Gallery Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal-close");

  // Get all gallery images
  const galleryImages = document.querySelectorAll(".gallery-item img");

  // Add click event to each gallery image
  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

// Custom video player functionality
document.querySelectorAll(".custom-video-player").forEach((player) => {
  const video = player.querySelector("video");
  const playPauseBtn = player.querySelector(".play-pause");
  const fullscreenBtn = player.querySelector(".fullscreen");
  const progressBar = player.querySelector(".progress-bar");
  const progress = player.querySelector(".progress");
  let controlsTimeout;

  // Show controls on touch
  player.addEventListener("touchstart", () => {
    const controls = player.querySelector(".video-controls");
    controls.style.opacity = "1";
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (!video.paused) {
        controls.style.opacity = "0";
      }
    }, 3000);
  });

  // Play/Pause
  playPauseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = "⏸";
    } else {
      video.pause();
      playPauseBtn.textContent = "▶";
    }
  });

  // Update progress bar
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = `${percent}%`;
  });

  // Click on progress bar to seek
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  });

  // Touch seek
  progressBar.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const rect = progressBar.getBoundingClientRect();
    const touch = e.touches[0];
    const percent = (touch.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  });

  // Fullscreen functionality
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement
    ) {
      if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
      }
      // For iOS
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  // Fullscreen button click
  fullscreenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFullscreen();
  });

  // Handle fullscreen change
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
  document.addEventListener("mozfullscreenchange", updateFullscreenButton);
  document.addEventListener("MSFullscreenChange", updateFullscreenButton);

  function updateFullscreenButton() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      fullscreenBtn.textContent = "⛶";
    } else {
      fullscreenBtn.textContent = "⛶";
    }
  }

  // Update play/pause button when video ends
  video.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶";
  });

  // Handle video errors
  video.addEventListener("error", () => {
    player.innerHTML =
      '<div class="video-error">Video could not be loaded</div>';
  });

  // Prevent default touch behavior
  video.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
});

// Handle gallery item clicks
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const media = this.querySelector("img, video");
    if (media) {
      if (media.tagName === "IMG") {
        const modal = document.getElementById("galleryModal");
        const modalImg = document.getElementById("modalImage");
        modal.style.display = "block";
        modalImg.src = media.src;
      } else if (media.tagName === "VIDEO") {
        // For videos, toggle play/pause
        if (media.paused) {
          // Pause all other videos first
          document.querySelectorAll("video").forEach((v) => v.pause());
          media.play();
        } else {
          media.pause();
        }
      }
    }
  });
});

// Close modal when clicking the close button
document.querySelector(".modal-close").addEventListener("click", function () {
  document.getElementById("galleryModal").style.display = "none";
});

// Close modal when clicking outside the image
document.getElementById("galleryModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
});
