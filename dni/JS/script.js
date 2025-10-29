// 4 Corners TDS JavaScript

// Mobile Menu
let links_ul = document.querySelector(".nav-desktop");
let links = document.querySelectorAll(".nav-link");
let header_mobile_num = document.getElementById("header_mobile_num");
let mobile_get_quote = document.getElementById("mobile_get_quote");

function menuToggle() {
  links_ul.classList.toggle("display");
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    links_ul.classList.toggle("display");
  });
});

header_mobile_num.addEventListener("click", () => {
  links_ul.classList.toggle("display");
});

mobile_get_quote.addEventListener("click", () => {
  links_ul.classList.toggle("display");
});

// links active function
links.forEach((link) => {
  link.addEventListener("click", () => {
    removeActive();
    link.classList.add("active");
  });
});

function removeActive() {
  links.forEach((link) => {
    link.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("body section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  initSmoothScrolling();

  // Contact form handling
  initContactForm();

  // Staggered animations
  initStaggeredAnimations();
});

// Smooth Scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only prevent default for internal links
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!contactForm || !submitBtn) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    // Validate email
    if (!isValidEmail(data.email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      // Simulate form submission (replace with actual endpoint)
      await simulateFormSubmission(data);

      // Show success message
      showNotification(
        "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
        "success"
      );

      // Reset form
      contactForm.reset();
    } catch (error) {
      showNotification(
        "Sorry, there was an error sending your message. Please try again or call us directly.",
        "error"
      );
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

// Staggered Animations
function initStaggeredAnimations() {
  // Hero stats animation
  const heroStats = document.querySelectorAll(".hero .stat");
  heroStats.forEach((stat, index) => {
    stat.style.animationDelay = `${1.2 + index * 0.2}s`;
    stat.classList.add("fade-up-on-scroll");
  });

  // Services grid staggered animation
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // Pricing cards staggered animation
  const pricingCards = document.querySelectorAll(".pricing-card");
  pricingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Stats grid staggered animation
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });
}

// Utility Functions
function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        console.log("Form submitted:", data);
        resolve();
      } else {
        reject(new Error("Submission failed"));
      }
    }, 2000);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "hsl(120, 60%, 50%)"
            : type === "error"
            ? "hsl(0, 60%, 50%)"
            : "hsl(200, 60%, 50%)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px hsla(0, 0%, 0%, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        animation: slideInNotification 0.3s ease-out forwards;
    `;

  // Add notification styles to head if not already added
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            @keyframes slideInNotification {
                to { transform: translateX(0); }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover {
                opacity: 0.8;
            }
        `;
    document.head.appendChild(styles);
  }

  // Add to DOM
  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Advanced scroll animations
function initAdvancedScrollAnimations() {
  // Parallax effect for hero background
  // const heroBg = document.querySelector('.hero-bg');
  // if (heroBg) {
  //     window.addEventListener('scroll', () => {
  //         const scrollY = window.scrollY;
  //         const rate = scrollY * -0.5;
  //         heroBg.style.transform = `translateY(${rate}px)`;
  //     });
  // }

  // Counter animation for stats
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent.replace(/\D/g, ""));
          const suffix = counter.textContent.replace(/\d/g, "");

          animateCounter(counter, 0, target, suffix, 2000);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function animateCounter(element, start, end, suffix, duration) {
  const startTime = performance.now();
  const range = end - start;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + range * easeOutCubic);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Initialize advanced animations
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initAdvancedScrollAnimations, 1000);
});

// Button click effects
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    createRippleEffect(e);
  }
});

function createRippleEffect(e) {
  const button = e.target;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

  // Add ripple animation if not already added
  if (!document.querySelector("#ripple-styles")) {
    const styles = document.createElement("style");
    styles.id = "ripple-styles";
    styles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
    document.head.appendChild(styles);
  }

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Performance optimization: throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(function () {
    // Any additional scroll-based functionality can go here
  }, 16)
); // ~60fps
