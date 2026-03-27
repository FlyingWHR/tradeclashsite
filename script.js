// Trade Clash Interactive Animations

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation and scroll indicator
    initSmoothScrolling();

    // Initialize scroll-triggered animations
    initScrollAnimations();

    // Initialize particle effects
    initParticleEffects();

    // Initialize CTA button interactions
    initCTAButtons();

    // Initialize frequent flicker effects
    initFrequentFlickers();

    // Initialize hero video
    initHeroVideo();
});

// Smooth scrolling functionality
function initSmoothScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const tldrSection = document.querySelector('.tldr-section');
            if (tldrSection) {
                tldrSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }

        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .hero-section {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);
}

// Particle effects for background
function initParticleEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: floatUp 8s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            z-index: 1;
        `;

        heroSection.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createParticle, 2000);
}

// CTA button interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Only prevent default for placeholder # links
            const href = button.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Coming soon! Join our community for updates.');
            }
        });

        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #051616 0%, #25220a 100%);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 16px 24px;
        color: white;
        font-family: 'Chakra Petch', sans-serif;
        font-size: 14px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Easter egg: Konami code for extra chaos
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konami.join(',')) {
        activateMaxChaos();
        konamiCode = [];
    }
});

function activateMaxChaos() {
    showNotification('MAXIMUM CHAOS ACTIVATED!');

    // Temporary extreme animations
    const style = document.createElement('style');
    style.textContent = `
        .step-card, .game-card {
            animation: cardPulse 0.5s ease-in-out infinite !important;
        }

        @keyframes cardPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
        }

        .hero-title {
            animation: ctaTitlePulse 0.5s ease-in-out infinite !important;
        }

        @keyframes ctaTitlePulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.5); }
        }

        .lot-card {
            border-color: rgba(0, 255, 255, 0.5) !important;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3) !important;
        }
    `;
    document.head.appendChild(style);

    // Remove after 5 seconds
    setTimeout(() => {
        document.head.removeChild(style);
        showNotification('Chaos levels returning to normal... for now.');
    }, 5000);
}

// Trade Clash - Enhanced Interactive Features
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip placeholder links
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero background
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    // Scroll-triggered animations with typewriter effect
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add typewriter effect to text elements
                const textElements = entry.target.querySelectorAll('.section-title, .section-description, .step-title, .game-title');
                textElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('typewriter-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Floating elements animation
    function createFloatingElements() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        for (let i = 0; i < 5; i++) {
            const floatingElement = document.createElement('div');
            floatingElement.className = 'floating-element';
            floatingElement.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float-${i} ${8 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            heroSection.appendChild(floatingElement);
        }

        // Add floating animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-0 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(10px); } }
            @keyframes float-1 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-30px) translateX(-15px); } }
            @keyframes float-2 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-25px) translateX(20px); } }
            @keyframes float-3 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-15px) translateX(-10px); } }
            @keyframes float-4 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-35px) translateX(5px); } }
        `;
        document.head.appendChild(style);
    }

    // Enhanced CTA button interactions
    function enhanceCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');

        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.05)';
                this.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.3)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });

            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
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

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // Dynamic typing effect for hero subtitle
    function typewriterEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';

        let i = 0;
        function type() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 25);
            }
        }

        setTimeout(type, 800);
    }

    // Scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.6));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    // Initialize all features
    function init() {
        // Add CSS for scroll animations and typewriter effects
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            section {
                opacity: 0;
                transform: translateY(60px);
                transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
            }

            section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .hero-section {
                opacity: 1 !important;
                transform: none !important;
            }

            /* Typewriter and punchy effects */
            .section-title, .section-description, .step-title, .game-title {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .typewriter-in {
                opacity: 1 !important;
                transform: translateX(0) !important;
                animation: fastTypewriter 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            @keyframes fastTypewriter {
                0% {
                    opacity: 0;
                    transform: translateX(-40px) scale(0.8);
                }
                70% {
                    opacity: 1;
                    transform: translateX(8px) scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }

            /* Punchy card animations */
            .step-card, .game-card, .lot-card {
                opacity: 0;
                transform: translateY(60px) scale(0.9) rotateX(15deg);
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .animate-in .step-card, .animate-in .game-card, .animate-in .lot-card {
                opacity: 1;
                transform: translateY(0) scale(1) rotateX(0deg);
            }

            .animate-in .step-card:nth-child(1) { transition-delay: 0.05s; }
            .animate-in .step-card:nth-child(2) { transition-delay: 0.1s; }
            .animate-in .step-card:nth-child(3) { transition-delay: 0.15s; }
            .animate-in .step-card:nth-child(4) { transition-delay: 0.2s; }
            .animate-in .step-card:nth-child(5) { transition-delay: 0.25s; }
        `;
        document.head.appendChild(animationStyle);

        // Initialize all features
        createFloatingElements();
        enhanceCTAButtons();
        typewriterEffect();
        createScrollProgress();
    }

    // Scroll events
    window.addEventListener('scroll', () => {
        parallaxEffect();

        // Navigation active state based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Initialize everything
    init();
});

// Enhanced intermittent title flicker effects
function initFrequentFlickers() {
    // Only target the hero title for flicker effects
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // Type 1: Classic glitch flicker
    function createGlitchFlicker(title) {
        const flickerCount = 3 + Math.floor(Math.random() * 3);
        let currentFlicker = 0;

        function doFlicker() {
            if (currentFlicker >= flickerCount) {
                title.style.textShadow = '';
                title.style.opacity = '1';
                title.style.filter = '';
                return;
            }

            title.style.textShadow = `
                ${Math.random() * 6 - 3}px 0 0 #ff0040,
                ${Math.random() * 6 - 3}px 0 0 #00ffff,
                0 0 10px rgba(255, 255, 255, 0.8)
            `;
            title.style.opacity = Math.random() * 0.7 + 0.3;
            title.style.filter = `skew(${Math.random() * 2 - 1}deg) contrast(${100 + Math.random() * 20}%)`;

            currentFlicker++;
            setTimeout(doFlicker, 50 + Math.random() * 40);
        }

        doFlicker();
    }

    // Type 2: Static interference flicker
    function createStaticFlicker(title) {
        const duration = 200 + Math.random() * 300;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            if (elapsed > duration) {
                title.style.textShadow = '';
                title.style.opacity = '1';
                title.style.filter = '';
                return;
            }

            title.style.textShadow = `
                ${Math.random() * 8 - 4}px ${Math.random() * 2 - 1}px 0 #ff0040,
                ${Math.random() * 8 - 4}px ${Math.random() * 2 - 1}px 0 #00ffff,
                ${Math.random() * 8 - 4}px ${Math.random() * 2 - 1}px 0 #ffff00
            `;
            title.style.opacity = Math.random() * 0.8 + 0.2;
            title.style.filter = `contrast(${100 + Math.random() * 50}%) brightness(${80 + Math.random() * 40}%)`;

            setTimeout(animate, 30);
        }

        animate();
    }

    // Type 3: Color shift flicker
    function createColorShiftFlicker(title) {
        const colors = [
            ['#ff0040', '#00ffff'],
            ['#ffff00', '#ff8000'],
            ['#8000ff', '#00ff80'],
            ['#ff0080', '#80ff00'],
            ['#0080ff', '#ff4000']
        ];

        let phase = 0;
        const maxPhases = 4;

        function shiftColor() {
            if (phase >= maxPhases) {
                title.style.textShadow = '';
                title.style.opacity = '1';
                return;
            }

            const colorPair = colors[Math.floor(Math.random() * colors.length)];
            title.style.textShadow = `
                2px 0 0 ${colorPair[0]},
                -2px 0 0 ${colorPair[1]},
                0 0 15px rgba(255, 255, 255, 0.9)
            `;
            title.style.opacity = 0.4 + Math.random() * 0.6;

            phase++;
            setTimeout(shiftColor, 80 + Math.random() * 40);
        }

        shiftColor();
    }

    // Type 4: Digital corruption flicker (safe for structured titles)
    function createCorruptionFlicker(title) {
        title.style.textShadow = `
            0 0 5px #ff0040,
            0 0 10px #00ffff,
            0 0 15px rgba(255, 255, 255, 0.8)
        `;
        title.style.opacity = '0.7';
        title.style.filter = 'contrast(150%) brightness(120%)';

        setTimeout(() => {
            title.style.textShadow = '';
            title.style.opacity = '1';
            title.style.filter = '';
        }, 150 + Math.random() * 100);
    }

    // Type 5: Scan line flicker
    function createScanLineFlicker(title) {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ffff, transparent);
            z-index: 10;
            animation: scanMove 0.3s ease-out;
        `;

        const scanKeyframes = document.createElement('style');
        scanKeyframes.textContent = `
            @keyframes scanMove {
                0% { top: 0; opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
        `;
        document.head.appendChild(scanKeyframes);

        title.style.position = 'relative';
        title.appendChild(scanLine);

        title.style.textShadow = '0 0 10px #00ffff, 0 0 20px #00ffff';
        title.style.opacity = '0.8';

        setTimeout(() => {
            if (scanLine.parentNode) scanLine.remove();
            if (scanKeyframes.parentNode) scanKeyframes.remove();
            title.style.textShadow = '';
            title.style.opacity = '1';
        }, 300);
    }

    // Array of all flicker types
    const flickerTypes = [
        createGlitchFlicker,
        createStaticFlicker,
        createColorShiftFlicker,
        createCorruptionFlicker,
        createScanLineFlicker
    ];

    // Flicker only for hero title
    setInterval(() => {
        if (Math.random() < 0.45) {
            const randomFlicker = flickerTypes[Math.floor(Math.random() * flickerTypes.length)];
            randomFlicker(heroTitle);
        }
    }, 1000 + Math.random() * 2000);
}

// Hero video initialization
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const heroBackground = document.querySelector('.hero-background');

    if (!heroVideo || !heroBackground) return;

    // Force video properties
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.autoplay = true;
    heroVideo.playsInline = true;

    // Try to play immediately
    const attemptPlay = () => {
        heroVideo.play().then(() => {
            // Fade in the video
            heroVideo.classList.add('loaded');

            // Dim the background image after video loads
            setTimeout(() => {
                heroBackground.style.opacity = '0.3';
            }, 1000);
        }).catch(() => {
            // Try again after user interaction
            document.addEventListener('click', attemptPlay, { once: true });
        });
    };

    heroVideo.addEventListener('loadeddata', attemptPlay);
    heroVideo.addEventListener('canplay', attemptPlay);

    heroVideo.addEventListener('error', function() {
        heroVideo.style.display = 'none';
    });

    if (heroVideo.readyState >= 2) {
        attemptPlay();
    }
}
