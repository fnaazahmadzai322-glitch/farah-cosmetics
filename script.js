// ========================================
// Farah Cosmetics - Interactive Experience
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    LoadingScreen.init();
    CustomCursor.init();
    Navigation.init();
    HeroAnimation.init();
    MagneticButtons.init();
    ScrollAnimations.init();
    ParallaxEffect.init();
    ProductViewer360.init();
    TextScramble.init();
    NumberCounter.init();
    TypeOnReveal.init();
});

// ========================================
// Loading Screen Module
// ========================================
const LoadingScreen = {
    init() {
        this.screen = document.getElementById('loadingScreen');
        this.duration = 2500;
        
        setTimeout(() => {
            this.screen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Trigger hero animations after loading
            setTimeout(() => {
                HeroAnimation.startBottleAnimation();
            }, 800);
        }, this.duration);
    }
};

// ========================================
// Custom Cursor Module
// ========================================
const CustomCursor = {
    init() {
        this.dot = document.getElementById('cursorDot');
        this.ring = document.getElementById('cursorRing');
        this.mouseX = 0;
        this.mouseY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Dot follows instantly
            this.dot.style.left = `${this.mouseX}px`;
            this.dot.style.top = `${this.mouseY}px`;
        });
        
        // Smooth ring follow
        this.animateRing();
        
        // Hover states for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .magnetic-btn, input, [role="button"]'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    },
    
    animateRing() {
        const lerp = (start, end, factor) => start + (end - start) * factor;
        
        this.ringX = lerp(this.ringX, this.mouseX, 0.15);
        this.ringY = lerp(this.ringY, this.mouseY, 0.15);
        
        this.ring.style.left = `${this.ringX}px`;
        this.ring.style.top = `${this.ringY}px`;
        
        requestAnimationFrame(() => this.animateRing());
    }
};

// ========================================
// Navigation Module
// ========================================
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    },
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100 && currentScrollY > this.lastScrollY) {
            this.navbar.classList.add('scrolled');
            this.navbar.classList.remove('visible');
        } else {
            this.navbar.classList.remove('scrolled');
            this.navbar.classList.add('visible');
        }
        
        this.lastScrollY = currentScrollY;
    }
};

// ========================================
// Hero Animation Module
// ========================================
const HeroAnimation = {
    init() {
        this.bottle = document.getElementById('heroBottle');
        this.cap = document.getElementById('bottleCap');
        this.glow = document.getElementById('bottleGlow');
        this.canvas = document.getElementById('heroBgCanvas');
        
        // Create cursor-following glow effect
        this.setupCursorGlow();
    },
    
    startBottleAnimation() {
        if (!this.bottle) return;
        
        this.bottle.classList.add('animated');
        
        // Unscrew cap animation
        setTimeout(() => {
            this.cap.classList.add('unscrewed');
        }, 2000);
        
        // Activate glow
        setTimeout(() => {
            this.glow.style.opacity = '0.5';
        }, 2500);
    },
    
    setupCursorGlow() {
        const particles = [];
        const particleCount = 50;
        
        // Create floating particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(74, 222, 128, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                filter: blur(1px);
            `;
            this.canvas.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                baseX: Math.random() * window.innerWidth,
                baseY: Math.random() * window.innerHeight
            });
        }
        
        // Animate particles
        const animateParticles = () => {
            particles.forEach((p, index) => {
                // Gentle floating motion
                p.x += p.vx;
                p.y += p.vy;
                
                // Return to base position slowly
                p.x += (p.baseX - p.x) * 0.005;
                p.y += (p.baseY - p.y) * 0.005;
                
                // Mouse interaction
                const dx = this.mouseX - p.x;
                const dy = this.mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    p.x -= dx * 0.02;
                    p.y -= dy * 0.02;
                }
                
                p.element.style.transform = `translate(${p.x - p.baseX}px, ${p.y - p.baseY}px)`;
            });
            
            requestAnimationFrame(animateParticles);
        };
        
        // Track mouse for particle interaction
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        animateParticles();
    }
};

// ========================================
// Magnetic Buttons Module
// ========================================
const MagneticButtons = {
    init() {
        this.buttons = document.querySelectorAll('.magnetic-btn');
        
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
};

// ========================================
// Scroll Animations Module
// ========================================
const ScrollAnimations = {
    init() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Handle staggered reveals
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('revealed');
                        }, parseInt(delay));
                    }
                }
            });
        }, this.observerOptions);
        
        // Observe all reveal-on-scroll elements
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
        
        // Also observe testimonials
        document.querySelectorAll('.testimonial-quote').forEach(el => {
            this.observer.observe(el);
        });
    }
};

// ========================================
// Parallax Effect Module
// ========================================
const ParallaxEffect = {
    init() {
        this.parallaxElements = document.querySelectorAll('[data-speed]');
        
        window.addEventListener('scroll', () => {
            this.parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed);
                const rect = el.getBoundingClientRect();
                const offset = rect.top;
                const windowHeight = window.innerHeight;
                
                if (offset < windowHeight && offset > -rect.height) {
                    const yPos = (windowHeight - offset) * speed * 0.1;
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }
};

// ========================================
// Product 360 Viewer Module
// ========================================
const ProductViewer360 = {
    init() {
        this.viewer = document.getElementById('viewer360');
        this.bottle = this.viewer?.querySelector('.product-bottle-spin');
        this.rotation = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentRotation = 0;
        
        if (!this.viewer || !this.bottle) return;
        
        // Mouse drag
        this.viewer.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.clientX;
            this.viewer.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            const deltaX = e.clientX - this.startX;
            this.currentRotation += deltaX * 0.5;
            this.bottle.style.transform = `rotateY(${this.currentRotation}deg)`;
            this.startX = e.clientX;
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.viewer.style.cursor = 'grab';
        });
        
        // Control buttons
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.dataset.direction;
                this.currentRotation += direction === 'left' ? -30 : 30;
                this.bottle.style.transform = `rotateY(${this.currentRotation}deg)`;
            });
        });
        
        // Touch support
        this.viewer.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
        });
        
        this.viewer.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            
            const deltaX = e.touches[0].clientX - this.startX;
            this.currentRotation += deltaX * 0.5;
            this.bottle.style.transform = `rotateY(${this.currentRotation}deg)`;
            this.startX = e.touches[0].clientX;
        });
        
        this.viewer.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }
};

// ========================================
// Text Scramble Effect Module
// ========================================
const TextScramble = {
    init() {
        this.elements = document.querySelectorAll('.scramble-text');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.scrambleText(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    },
    
    scrambleText(element) {
        const text = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let iterations = 0;
        
        element.textContent = '';
        
        // Create spans for each character
        const charSpans = [];
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === '\n' ? '' : text[i];
            span.style.display = text[i] === '\n' ? 'block' : 'inline';
            element.appendChild(span);
            charSpans.push({
                span,
                target: text[i],
                isSpace: text[i] === ' ' || text[i] === '\n'
            });
        }
        
        const interval = setInterval(() => {
            charSpans.forEach((char, index) => {
                if (index <= iterations) {
                    if (!char.isSpace) {
                        char.span.textContent = char.target;
                    }
                } else {
                    if (!char.isSpace) {
                        char.span.textContent = chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            });
            
            iterations += 0.5;
            
            if (iterations >= charSpans.length) {
                clearInterval(interval);
            }
        }, 30);
    }
};

// ========================================
// Number Counter Animation Module
// ========================================
const NumberCounter = {
    init() {
        this.counters = document.querySelectorAll('.scramble-num');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    },
    
    animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;
        
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = startValue + (target - startValue) * easedProgress;
            
            if (target % 1 !== 0) {
                element.textContent = currentValue.toFixed(1);
            } else {
                element.textContent = Math.floor(currentValue);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// ========================================
// Type On Reveal Effect Module
// ========================================
const TypeOnReveal = {
    init() {
        this.elements = document.querySelectorAll('.type-on-reveal');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.typeText(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    },
    
    typeText(element) {
        const text = element.dataset.text;
        element.textContent = '';
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        };
        
        setTimeout(type, 500);
    }
};

// ========================================
// Smooth Scroll Enhancement
// ========================================
// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Performance Optimization
// ========================================
// Debounce function for resize events
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

// Handle resize events efficiently
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent values here
}, 250));

// ========================================
// Accessibility Enhancements
// ========================================
// Keyboard navigation for interactive elements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.style.cursor = 'auto';
        document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => {
            el.style.display = 'none';
        });
    }
});

document.addEventListener('mousedown', () => {
    document.body.style.cursor = 'none';
    document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => {
        el.style.display = 'block';
    });
});
