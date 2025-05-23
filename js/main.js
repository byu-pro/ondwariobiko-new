document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initMobileMenu();
  initThemeToggle();
  initSplashScreen();
  initCursor();
  initStickyHeader();
});

// GSAP animations
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero Section
  gsap.from('.hero-heading', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
  });

  gsap.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  });

  gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  });

  // Projects
  gsap.utils.toArray('.project').forEach((proj, i) => {
    gsap.from(proj, {
      scrollTrigger: {
        trigger: proj,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // About Section
  gsap.from('.about-section p', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 85%',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out'
  });

  // Contact Section
  gsap.from('.contact-section .btn', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 85%',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out'
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Theme toggle
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isLight = currentTheme === 'light';

    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  });
}

// Splash screen
function initSplashScreen() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 1600);
  });
}

// Sticky header on scroll
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
}

// Custom cursor
function initCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  const delay = 0.15;

  function animateCursor() {
    outlineX += (mouseX - outlineX) * delay;
    outlineY += (mouseY - outlineY) * delay;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animateCursor();
}
