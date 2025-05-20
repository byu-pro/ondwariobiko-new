document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});

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
