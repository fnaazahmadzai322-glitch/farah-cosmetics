// Farah Cosmetics - Luxury Skincare Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoadingScreen();
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initMagneticButtons();
    initScrollReveals();
    initParallax();
    initViewer360();
    initTextScramble();
    initNumberCounters();
    initTypeOnEffect();
});

// Loading Screen Controller
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Trigger hero animations after loading
        setTimeout(initHeroBottleSequence, 500);
    }, 2500);
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, input');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('active');
        });
    });
}

// Navigation Scroll Behavior
function initNavigation() {
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.padding = '0.75rem 2rem';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.7)';
            nav.style.padding = '1rem 2rem';
        }
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    const heroGlow = document.querySelector('.hero-bg-glow');
    
    document.addEventListener('mousemove', (e) => {
        if (!heroGlow) return;
        
        const x = e.clientX;
        const y = e.clientY;
        
        heroGlow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    });
    
    // Create particles
    createHeroParticles();
}

function createHeroParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(74, 222, 128, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

function initHeroBottleSequence() {
    // Bottle animations are handled by CSS
    // This function can add additional JS-controlled effects
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
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

// Scroll Reveals
function initScrollReveals() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger child elements
                const children = entry.target.querySelectorAll('.ingredient-card, .testimonial-card, .journal-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal, .ingredient-card, .testimonial-card, .journal-card').forEach(el => {
        observer.observe(el);
    });
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.5;
            const rect = el.getBoundingClientRect();
            const offset = (window.innerHeight - rect.top) * speed;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    });
}

// 360° Product Viewer
function initViewer360() {
    const viewer = document.getElementById('viewer360');
    const bottle = viewer?.querySelector('.product-bottle-360');
    
    if (!viewer || !bottle) return;
    
    let isDragging = false;
    let startX = 0;
    let rotation = 0;
    
    viewer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        viewer.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        rotation += deltaX * 0.5;
        
        bottle.style.transform = `rotateY(${rotation}deg)`;
        startX = e.clientX;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        viewer.style.cursor = 'grab';
    });
    
    // Touch support
    viewer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - startX;
        rotation += deltaX * 0.5;
        
        bottle.style.transform = `rotateY(${rotation}deg)`;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Text Scramble Effect
function initTextScramble() {
    const elements = document.querySelectorAll('.scramble-text');
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    
    elements.forEach(el => {
        const originalText = el.textContent;
        el.dataset.original = originalText;
        el.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrambleText(el, originalText);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(el);
    });
    
    function scrambleText(element, targetText) {
        let iterations = 0;
        const maxIterations = 30;
        
        const interval = setInterval(() => {
            element.textContent = targetText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            iterations += targetText.length / maxIterations;
            
            if (iterations >= targetText.length) {
                element.textContent = targetText;
                clearInterval(interval);
            }
        }, 30);
    }
}

// Number Counter Animation
function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
}

// Type-on Effect for Testimonials
function initTypeOnEffect() {
    const typeOnElements = document.querySelectorAll('.type-on');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeOnText(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    typeOnElements.forEach(el => observer.observe(el));
    
    function typeOnText(element) {
        const text = element.dataset.text;
        element.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }
        
        type();
    }
}

// Accessibility: Keyboard navigation for magnetic buttons
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.style.cursor = 'auto';
        document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => {
            el.style.display = 'none';
        });
    }
});

// Performance: Reduce animations on low power mode
if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
        if (battery.level < 0.2 || !battery.charging) {
            document.documentElement.style.setProperty('--transition-medium', '0.2s ease');
            document.documentElement.style.setProperty('--transition-slow', '0.4s ease');
        }
    });
}
