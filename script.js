// ========================================
// 2025 HIGH-END PORTFOLIO - INTERACTIVE FEATURES
// Particle Effects, Scroll Animations, Navigation
// ========================================

(function() {
    'use strict';

    // ========================================
    // PARTICLE BACKGROUND ANIMATION
    // ========================================
    
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 80;
            this.connectionDistance = 150;
            
            this.resize();
            this.init();
            this.animate();
            
            window.addEventListener('resize', () => this.resize());
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        init() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw particles
            this.particles.forEach((particle, i) => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
                
                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
                this.ctx.fill();
                
                // Draw connections
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[j].x - particle.x;
                    const dy = this.particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.connectionDistance) {
                        const opacity = (1 - distance / this.connectionDistance) * 0.3;
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            });
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Initialize particle system when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            new ParticleSystem(canvas);
        }
    });

    // ========================================
    // NAVIGATION FUNCTIONALITY
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        const sections = document.querySelectorAll('section[id]');
        
        // Scroll effect on navbar
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
            
            // Active section highlighting
            highlightActiveSection();
        });
        
        // Highlight active section in navigation
        function highlightActiveSection() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
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
        
        // Smooth scroll to sections
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // If link points to a different page (like index.html), allow normal navigation
                if (targetId && (targetId.includes('.html') || targetId.startsWith('http'))) {
                    // Allow normal navigation for external/page links
                    return;
                }
                
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
        
        // Initial call to highlight
        highlightActiveSection();
    });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements with reveal classes
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        revealElements.forEach(el => observer.observe(el));
    });

    // ========================================
    // PROJECT CARD INTERACTIONS
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        // Parallax effect on project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    });

    // ========================================
    // EMAIL COPY FUNCTIONALITY
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        const emailLink = document.getElementById('emailLink');
        
        if (emailLink) {
            emailLink.addEventListener('click', async (e) => {
                // Only prevent default on desktop
                if (window.innerWidth > 768) {
                    e.preventDefault();
                    
                    const email = emailLink.textContent;
                    
                    try {
                        await navigator.clipboard.writeText(email);
                        
                        // Show success message
                        const originalText = emailLink.innerHTML;
                        emailLink.innerHTML = '✓ Email Copied!';
                        emailLink.style.color = 'var(--accent-lavender)';
                        
                        setTimeout(() => {
                            emailLink.innerHTML = originalText;
                            emailLink.style.color = '';
                        }, 2000);
                    } catch (err) {
                        // Fallback: open mailto
                        window.location.href = `mailto:${email}`;
                    }
                }
            });
        }
    });

    // ========================================
    // CURSOR GLOW EFFECT (Desktop Only)
    // ========================================
    
    if (window.innerWidth > 1024) {
        document.addEventListener('DOMContentLoaded', () => {
            const cursorGlow = document.createElement('div');
            cursorGlow.className = 'cursor-glow';
            cursorGlow.style.cssText = `
                position: fixed;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
                pointer-events: none;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
                z-index: 9999;
                opacity: 0;
            `;
            document.body.appendChild(cursorGlow);
            
            let mouseX = 0;
            let mouseY = 0;
            let glowX = 0;
            let glowY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorGlow.style.opacity = '1';
            });
            
            document.addEventListener('mouseleave', () => {
                cursorGlow.style.opacity = '0';
            });
            
            function animateGlow() {
                glowX += (mouseX - glowX) * 0.1;
                glowY += (mouseY - glowY) * 0.1;
                
                cursorGlow.style.left = glowX + 'px';
                cursorGlow.style.top = glowY + 'px';
                
                requestAnimationFrame(animateGlow);
            }
            
            animateGlow();
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR HERO CTA
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        const heroCta = document.querySelector('.hero-cta');
        
        if (heroCta) {
            heroCta.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = heroCta.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for mouse events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // CONTACT FORM HANDLING - Connected to Formspree
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                // Show loading state
                submitButton.innerHTML = '<span>Sending...</span>';
                submitButton.disabled = true;
                
                try {
                    // Send form data to Formspree
                    const formData = new FormData(contactForm);
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        // Success
                        submitButton.innerHTML = '<span>✓ Message Sent!</span>';
                        submitButton.style.backgroundColor = 'var(--accent-lavender)';
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Show success message
                        setTimeout(() => {
                            alert('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
                        }, 300);
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitButton.innerHTML = originalText;
                            submitButton.disabled = false;
                            submitButton.style.backgroundColor = '';
                        }, 3000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    // Error handling
                    submitButton.innerHTML = '<span>Failed to Send</span>';
                    submitButton.style.backgroundColor = '#f5576c';
                    
                    alert('Oops! There was an error sending your message. Please try emailing me directly at danielledesigns0903@gmail.com');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.style.backgroundColor = '';
                    }, 3000);
                }
            });
        }
    });

    // ========================================
    // RESUME BUTTON HANDLER
    // ========================================
    // Resume button now directly links to PDF - no handler needed

    // ========================================
    // EASTER EGG - CONSOLE MESSAGE
    // ========================================
    
    document.addEventListener('DOMContentLoaded', () => {
        const styles = [
            'font-size: 20px',
            'font-weight: bold',
            'color: #8B5CF6',
            'text-shadow: 0 0 10px rgba(139, 92, 246, 0.5)'
        ].join(';');
        
        console.log('%c✨ Hello, curious developer!', styles);
        console.log('%c👋 Thanks for checking out the code!', 'font-size: 14px; color: #A78BFA;');
        console.log('%c📧 Let\'s connect: danielledesigns0903@gmail.com', 'font-size: 14px; color: #6366F1;');
        console.log('%c💼 Looking for a passionate UX/UI designer? Let\'s talk!', 'font-size: 14px; color: #8B5CF6;');
    });

    // ========================================
    // LOADING ANIMATION
    // ========================================
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

})();

// ========================================
// UTILITY FUNCTIONS (Global)
// ========================================

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const scrollToElement = (element, offset = 0) => {
        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    };
    
    window.scrollToElement = scrollToElement;
}
