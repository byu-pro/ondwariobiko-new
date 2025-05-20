/**
 * Portfolio Website Main JavaScript File
 * Contains all interactive functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initLoader();
    initCursor();
    initNavbar();
    initScrollAnimations();
    initSkillBars();
    initFormLabels();
    initScrollTo();
    initHoverEffects();
    initMobileMenu();
    initThemeToggle();
    initFormSubmission();
    initProjectFilter();
    initImageLazyLoading();
    initBackToTopButton();
});

// Loader Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // First check if page is already loaded
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        // Show loader and wait for window load
        window.addEventListener('load', hideLoader);
        
        // Fallback in case load event doesn't fire
        setTimeout(hideLoader, 3000);
    }

    function hideLoader() {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 800);
    }
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Only enable on desktop
    if (window.innerWidth <= 1024 || !cursor || !follower) {
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    
    // Smooth movement variables
    const speed = 0.2;
    const followerSpeed = 0.15;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation loop for smooth movement
    function animate() {
        // Main cursor (instant)
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Follower cursor (smooth)
        posX += (mouseX - posX) * followerSpeed;
        posY += (mouseY - posY) * followerSpeed;
        
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .navbar__logo, .hero__scroll, [data-cursor-hover]');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
            
            // Special classes for different hover effects
            if (el.dataset.cursorHover) {
                follower.classList.add(el.dataset.cursorHover);
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
            
            if (el.dataset.cursorHover) {
                follower.classList.remove(el.dataset.cursorHover);
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Scroll effect
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    updateNavbar();
    window.addEventListener('scroll', debounce(updateNavbar, 10));
    
    // Highlight active section in navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar__links a');
    
    function updateActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial check
    updateActiveSection();
    window.addEventListener('scroll', debounce(updateActiveSection, 10));
}

// GSAP Scroll Animations
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text animation
    const heroTitle = document.querySelector(".hero__title");
    if (heroTitle) {
        gsap.from(".hero__title .line span", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
        
        gsap.from(".hero__meta, .hero__cta", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }
    
    // Section headers
    gsap.from(".section-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".section",
            start: "top 80%",
            once: true
        },
        ease: "power3.out"
    });
    
    // Project cards
    gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".work",
            start: "top 80%",
            once: true
        },
        ease: "power3.out"
    });
    
    // About section
    gsap.from(".about__text p, .about__skills", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
            once: true
        },
        ease: "power3.out"
    });
    
    // Contact form
    gsap.from(".contact-form, .contact__info", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".contact",
            start: "top 80%",
            once: true
        },
        ease: "power3.out"
    });
}

// Animate Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress-bar');
    if (skillBars.length === 0) return;
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        
        ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.to(bar, {
                    width: level,
                    duration: 1.5,
                    ease: "power3.out",
                    onComplete: () => {
                        // Add percentage text after animation
                        const percentText = document.createElement('span');
                        percentText.className = 'skill-percent';
                        percentText.textContent = level;
                        bar.appendChild(percentText);
                    }
                });
            }
        });
    });
}

// Form Label Animation
function initFormLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length === 0) return;
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (!input || !label) return;
        
        // Add placeholder to show labels work without actual placeholder attribute
        if (input.getAttribute('placeholder')) {
            input.removeAttribute('placeholder');
        }
        
        // Check if input has value on page load (for form refreshes)
        if (input.value) {
            activateLabel();
        }
        
        input.addEventListener('focus', activateLabel);
        input.addEventListener('blur', () => {
            if (!input.value) {
                deactivateLabel();
            }
        });
        
        function activateLabel() {
            label.style.top = '-10px';
            label.style.left = '0';
            label.style.fontSize = '0.75rem';
            label.style.color = 'var(--primary)';
        }
        
        function deactivateLabel() {
            label.style.top = '50%';
            label.style.left = '15px';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-light)';
        }
    });
}

// Smooth Scroll to Sections
function initScrollTo() {
    // Hero scroll button
    const scrollBtn = document.querySelector('.hero__scroll');
    
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo("#work");
        });
    }
    
    // Navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    function smoothScrollTo(target) {
        const targetElement = document.querySelector(target);
        
        if (targetElement) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetElement,
                    offsetY: 80 // Account for fixed header
                },
                ease: "power3.inOut"
            });
        }
    }
}

// Hover Effects
function initHoverEffects() {
    // Project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                scale: 1.02, 
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                scale: 1, 
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Buttons
    document.querySelectorAll('.cta-button, .btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            const arrow = button.querySelector('.arrow');
            if (arrow) {
                gsap.to(arrow, { 
                    x: 5, 
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            const arrow = button.querySelector('.arrow');
            if (arrow) {
                gsap.to(arrow, { 
                    x: 0, 
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Toggle mobile menu
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
    
    function toggleMobileMenu() {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll
        document.body.classList.toggle('no-scroll');
        
        // Animate menu items
        if (mobileMenu.classList.contains('active')) {
            animateMenuItemsIn();
        }
    }
    
    function animateMenuItemsIn() {
        gsap.from('.mobile-menu li', {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
}

// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Set initial theme
    document.body.classList.add(`${currentTheme}-theme`);
    
    // Update toggle state
    if (currentTheme === 'dark') {
        themeToggle.classList.add('active');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        themeToggle.classList.toggle('active');
        
        // Save to localStorage
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        
        // Dispatch event for other components to listen to
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    });
}

// Form Submission
function initFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-loader"></span> Sending...';
            
            // Here you would typically make a fetch request to your backend
            // For demonstration, we'll simulate a network request
            const response = await simulateFormSubmit(formData);
            
            if (response.success) {
                // Show success message
                showFormMessage(form, 'Message sent successfully!', 'success');
                
                // Reset form
                form.reset();
                
                // Reset all labels
                const labels = form.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.top = '50%';
                    label.style.left = '15px';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-light)';
                });
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage(form, error.message || 'There was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
    
    // Simulate form submission (replace with actual fetch)
    async function simulateFormSubmit(formData) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Form data:', Object.fromEntries(formData));
                resolve({ success: true, message: 'Message sent successfully!' });
            }, 1500);
        });
    }
    
    function showFormMessage(form, message, type) {
        // Remove any existing messages
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        form.insertBefore(messageDiv, form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Project Filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    gsap.fromTo(card, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Lazy Loading for Images
function initImageLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                };
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px'
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Back to Top Button
function initBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleBackToTop();
    window.addEventListener('scroll', debounce(toggleBackToTop, 10));
    
    // Click handler
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToTop();
    });
    
    function smoothScrollToTop() {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: "power3.inOut"
        });
    }
}

// Helper function for debouncing
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Responsive adjustments
function handleResponsiveChanges() {
    // Adjust animations or behaviors based on screen size
    if (window.innerWidth <= 768) {
        // Disable some animations on mobile for performance
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger.classList.contains('project-card')) {
                trigger.kill();
            }
        });
    }
}

// Window resize event with debounce
window.addEventListener('resize', debounce(() => {
    handleResponsiveChanges();
}, 250));

// Initialize responsive adjustments on load
handleResponsiveChanges();

function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Optional: close menu when a link is clicked
  document.querySelectorAll('.mobile-menu__links a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}
