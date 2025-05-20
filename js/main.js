document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
});

// Mobile menu functionality
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  document.querySelectorAll('.mobile-menu__links a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// GSAP animations
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero title
  gsap.from('.hero__title', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
  });

  // Hero subtitle & location
  gsap.from(['.hero__subtitle', '.hero__location'], {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    stagger: 0.2,
    ease: 'power2.out'
  });

  // Hero CTA
  gsap.from('.hero__cta', {
    opacity: 0,
    y: 40,
    duration: 1,
    delay: 0.8,
    ease: 'back.out(1.7)'
  });

  // Hero social icons
  gsap.from('.hero__social a', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 1,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Project cards
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });

  // About section
  gsap.from('#about p', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%'
    },
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'power2.out'
  });

  // Contact form fields
  gsap.from('#contact form *', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 85%'
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  });
}
