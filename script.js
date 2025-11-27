/* ===========================================================
   Smooth Scroll To Anchor
=========================================================== */
function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const headerOffset =
    document.querySelector(".site-header")?.offsetHeight || 0;
  const rect = target.getBoundingClientRect();
  const offsetTop = rect.top + window.pageYOffset - (headerOffset + 10);

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

/* ===========================================================
   PRIMARY LOGIC
=========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  /* ========== HEADER / NAVIGATION ========== */
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll("[data-scroll-link]");
  const externalButtons = document.querySelectorAll("[data-external-link]");

  // Toggle mobile menu
  navToggle?.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  // Close menu on link click + smooth scroll
  navLinks?.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      document.body.classList.remove("nav-open");
      smoothScrollTo(target);
    });
  });

  // External link buttons
  externalButtons?.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-external-link");
      if (url) window.open(url, "_blank");
    });
  });

  /* ========== SCROLL REVEAL ========== */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  /* ===========================================================
     GOOGLE REVIEWS SLIDER (Testimonials Section)
  ========================================================== */
  // Google Maps review page link
const googleMapsUrl = "https://maps.app.goo.gl/dcXpVWVAwmPAqEXf9";
  
  const googleReviews = document.getElementById("googleReviews");
  const dotsContainer = document.getElementById("reviewDots");
  const prevBtn = document.querySelector(".testimonials-nav.prev");
  const nextBtn = document.querySelector(".testimonials-nav.next");

  async function loadGoogleReviews() {
  if (!googleReviews) return;

  const sampleReviews = [
    {
      rating: 5,
      text: "Max did an excellent job refinishing our clawfoot tub. He is careful to protect the bathroom and cleans everything up after. He also sends after care instructions.",
      author: "Google Reviewer",
      date: "4 days ago",
      link: googleMapsUrl,
    },
    {
      rating: 5,
      text: "I recently had my bathtub refinished by Max and I couldn’t be happier with the results. The tub looks brand new, smooth, clean and beautifully done. Max is very professional, skilled and detail-oriented. He arrived on time, explained everything clearly and completed the job with great care.",
      author: "Google Reviewer",
      date: "1 week ago",
      link: googleMapsUrl,
    },
    {
      rating: 5,
      text: "I don’t usually write reviews, but this one was worth it. I got my bathtub reglazed by MaxProFix and honestly, the guy did a really solid job. No mess, no drama, just clean work. The tub looks way better than I expected — basically like new.",
      author: "Google Reviewer",
      date: "2 months ago",
      link: googleMapsUrl,
    },
    {
      rating: 5,
      text: "Max did excellent work on our older tub and sink. The resurfacing made my very damaged 1970s tub look like new! Better than I could have imagined and for an excellent price!",
      author: "Google Reviewer",
      date: "1 month ago",
      link: googleMapsUrl,
    }
  ];

  googleReviews.innerHTML = "";

  sampleReviews.forEach((review) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <a href="${review.link}" target="_blank" rel="noopener" class="review-card-inner">
        <div class="review-header">
          <span class="stars">
            ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
          </span>
          <span class="review-date">${review.date}</span>
        </div>
        <p class="review-text">"${review.text}"</p>
        <div class="reviewer">- ${review.author}</div>
      </a>
    `;
    googleReviews.appendChild(card);
  });

  initReviewSlider();
}

  function initReviewSlider() {
    const cards = googleReviews.querySelectorAll(".review-card");
    if (!cards.length) return;

    let current = 0;

    // Activate first card
    cards[0].classList.add("active");

    // Create dots
    dotsContainer.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "review-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      cards.forEach((c, i) => c.classList.toggle("active", i === index));
      dotsContainer
        .querySelectorAll(".review-dot")
        .forEach((d, i) => d.classList.toggle("active", i === index));

      current = index;
    }

    prevBtn?.addEventListener("click", () =>
      goTo((current - 1 + cards.length) % cards.length)
    );
    nextBtn?.addEventListener("click", () =>
      goTo((current + 1) % cards.length)
    );

    setInterval(() => {
      goTo((current + 1) % cards.length);
    }, 7000);
  }

  loadGoogleReviews();

  /* ===========================================================
     GALLERY LIGHTBOX (FlavourFeast-style)
  ========================================================== */
  const galleryItems = document.querySelectorAll(".gallery-item[data-lightbox]");
  const lightbox = document.querySelector(".lightbox");
  const lightboxContent = lightbox?.querySelector(".lightbox-content");
  const closeButtons = lightbox?.querySelectorAll("[data-lightbox-close]");
  let currentMediaEl = null;

  function openLightbox(src, type = "image") {
    if (!lightbox || !lightboxContent) return;

    // Remove previous media
    if (currentMediaEl) {
      if (currentMediaEl.tagName === "VIDEO") currentMediaEl.pause();
      currentMediaEl.remove();
      currentMediaEl = null;
    }

    // Create media element
    let el;
    if (type === "video") {
      el = document.createElement("video");
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
    } else {
      el = document.createElement("img");
      el.alt = "";
    }

    el.className = "lightbox-image";
    el.src = src;

    // Insert before close button
    const closeBtn = lightboxContent.querySelector(".lightbox-close");
    lightboxContent.insertBefore(el, closeBtn);

    currentMediaEl = el;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;

    if (currentMediaEl) {
      if (currentMediaEl.tagName === "VIDEO") {
        currentMediaEl.pause();
        currentMediaEl.currentTime = 0;
      }
      currentMediaEl.remove();
      currentMediaEl = null;
    }

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Click gallery items
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-lightbox");
      const type = item.dataset.type || "image";
      openLightbox(src, type);
    });
  });

  // Close events
  closeButtons?.forEach((btn) => btn.addEventListener("click", closeLightbox));

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox?.classList.contains("open")) {
      closeLightbox();
    }
  });
});
