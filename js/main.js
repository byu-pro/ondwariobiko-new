// Scroll animations (GSAP + ScrollTrigger)
gsap.registerPlugin(ScrollTrigger);

// Animate hero text
gsap.from(".hero h1", { 
    opacity: 0, y: -50, duration: 1 
});
gsap.from(".cta-button", { 
    opacity: 0, y: 20, duration: 1, delay: 0.5 
});

// Project card hover effects
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, duration: 0.3 });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
    });
});
// GSAP Animations
gsap.from(".hero h1", { 
    opacity: 0, y: -50, duration: 1 
});
gsap.from(".project-card", { 
    opacity: 0, y: 50, stagger: 0.2, scrollTrigger: {
        trigger: ".work",
        start: "top 80%"
    }
});