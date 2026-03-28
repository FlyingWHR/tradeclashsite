// Trade Clash Interactive Animations

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initParticleEffects();
    initCTAButtons();
    initFrequentFlickers();
    initHeroVideo();
    initGlobe();
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

// Scroll-triggered animations — handled by the second DOMContentLoaded handler's observer
// (which adds typewriter-in classes and more complete animation styles)
function initScrollAnimations() {
    // Intentionally empty — consolidated into the enhanced observer below
}

// Particle effects for background (pauses when hero not visible)
function initParticleEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    let particleInterval = null;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(217, 119, 6, 0.2);
            border-radius: 50%;
            pointer-events: none;
            animation: floatUp 8s linear forwards;
            left: ${Math.random() * 100}%;
            top: 100%;
            z-index: 1;
        `;
        heroSection.appendChild(particle);
        setTimeout(() => { if (particle.parentNode) particle.remove(); }, 8000);
    }

    // Only create particles when hero is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (!particleInterval) particleInterval = setInterval(createParticle, 2000);
        } else {
            if (particleInterval) { clearInterval(particleInterval); particleInterval = null; }
        }
    }, { threshold: 0 });
    observer.observe(heroSection);
}

// CTA button click handler (hover handled by CSS)
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Coming soon! Join our community for updates.');
            }
        });
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-glass);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-card);
        padding: 16px 24px;
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 14px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(16px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
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
        .street-card, .game-card {
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
            border-color: rgba(217, 119, 6, 0.5) !important;
            box-shadow: 0 0 30px rgba(217, 119, 6, 0.3) !important;
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

    // Parallax effect for hero background (cached query)
    const heroBackground = document.querySelector('.hero-background');
    function parallaxEffect() {
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
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
                const textElements = entry.target.querySelectorAll('.section-title, .section-description, .street-name, .game-title');
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
                background: rgba(217, 119, 6, 0.15);
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

    // CTA button ripple effect (hover handled by CSS)
    function enhanceCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');

        ctaButtons.forEach(button => {
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
                    background: rgba(217, 119, 6, 0.3);
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

    // Dynamic typing effect for hero subtitle (visual only — keeps text in DOM for a11y)
    function typewriterEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const text = subtitle.textContent;
        // Wrap in a span for visual clipping — original text stays in DOM for screen readers
        subtitle.innerHTML = '<span class="visually-hidden">' + text + '</span><span class="typewriter-visual" aria-hidden="true"></span>';
        const visual = subtitle.querySelector('.typewriter-visual');

        let i = 0;
        function type() {
            if (i < text.length) {
                visual.textContent += text.charAt(i);
                i++;
                setTimeout(type, 25);
            }
        }

        setTimeout(type, 800);
    }

    // Scroll progress indicator (updated via the main throttled scroll handler)
    let progressBar = null;
    function createScrollProgress() {
        progressBar = document.createElement('div');
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Page scroll progress');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBar.setAttribute('aria-valuenow', '0');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-primary), rgba(217, 119, 6, 0.6));
            z-index: 10000;
        `;
        document.body.appendChild(progressBar);
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
            .section-title, .section-description, .street-name, .game-title {
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
            .street-card, .game-card, .lot-card {
                opacity: 0;
                transform: translateY(60px) scale(0.9) rotateX(15deg);
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .animate-in .street-card, .animate-in .game-card, .animate-in .lot-card {
                opacity: 1;
                transform: translateY(0) scale(1) rotateX(0deg);
            }

            .animate-in .street-card:nth-child(1) { transition-delay: 0.05s; }
            .animate-in .street-card:nth-child(2) { transition-delay: 0.1s; }
            .animate-in .street-card:nth-child(3) { transition-delay: 0.15s; }
            .animate-in .street-card:nth-child(4) { transition-delay: 0.2s; }
            .animate-in .street-card:nth-child(5) { transition-delay: 0.25s; }
        `;
        document.head.appendChild(animationStyle);

        // Initialize all features
        createFloatingElements();
        enhanceCTAButtons();
        typewriterEffect();
        createScrollProgress();
    }

    // Scroll events — single throttled handler for parallax + nav state
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-section]');
    const scrollSections = document.querySelectorAll('section[id]');

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                parallaxEffect();

                // Scroll progress bar
                if (progressBar) {
                    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
                    progressBar.style.width = scrollPercent + '%';
                    progressBar.setAttribute('aria-valuenow', scrollPercent);
                }

                // Navigation active state
                let current = '';
                scrollSections.forEach(section => {
                    if (window.scrollY >= section.offsetTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });

                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === current) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

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

    // Type 5: Scan line flicker (reuses style element)
    const scanKeyframes = document.createElement('style');
    scanKeyframes.textContent = `
        @keyframes scanMove {
            0% { top: 0; opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
    `;
    document.head.appendChild(scanKeyframes);

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

        title.style.position = 'relative';
        title.appendChild(scanLine);

        title.style.textShadow = '0 0 10px #00ffff, 0 0 20px #00ffff';
        title.style.opacity = '0.8';

        setTimeout(() => {
            if (scanLine.parentNode) scanLine.remove();
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

    // Flicker only when hero is visible (pause when scrolled away)
    let heroVisible = true;
    let flickerInterval = null;

    function startFlickers() {
        if (flickerInterval) return;
        flickerInterval = setInterval(() => {
            if (Math.random() < 0.45) {
                const randomFlicker = flickerTypes[Math.floor(Math.random() * flickerTypes.length)];
                randomFlicker(heroTitle);
            }
        }, 2000);
    }

    function stopFlickers() {
        if (flickerInterval) { clearInterval(flickerInterval); flickerInterval = null; }
    }

    const heroObserver = new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible) { startFlickers(); } else { stopFlickers(); }
    }, { threshold: 0 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) heroObserver.observe(heroSection);
    startFlickers(); // Start immediately since hero is visible on load
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

// 3D Globe initialization (Globe.gl via CDN)
function initGlobe() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    // Check if Globe.gl loaded
    if (typeof Globe === 'undefined') {
        container.classList.add('fallback');
        return;
    }

    // $SIM nation data from globeConfig.ts
    const regions = [
        { lat: 45, lng: -100, label: 'AmeriCorp', color: '#1e40af' },
        { lat: 35, lng: 105, label: 'MoonFactory', color: '#dc2626' },
        { lat: 50, lng: 10, label: 'BailoutUnion', color: '#1d4ed8' },
        { lat: 24, lng: 45, label: 'OilCoinEmirate', color: '#fbbf24' },
        { lat: 0, lng: 20, label: 'AfriCoinAlliance', color: '#16a34a' },
        { lat: 0, lng: -78, label: 'MercadoBlox', color: '#0ea5e9' },
        { lat: 0, lng: 110, label: 'NasiHoldings', color: '#06b6d4' },
        { lat: -25, lng: 133, label: 'OzmineCommonwealth', color: '#d97706' }
    ];

    try {
        const globe = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .backgroundColor('rgba(0,0,0,0)')
            .atmosphereColor('#D97706')
            .atmosphereAltitude(0.15)
            .pointsData(regions)
            .pointLat('lat')
            .pointLng('lng')
            .pointColor('color')
            .pointAltitude(0.06)
            .pointRadius(0.8)
            .pointsMerge(false)
            .labelsData(regions)
            .labelLat('lat')
            .labelLng('lng')
            .labelText('label')
            .labelSize(1.2)
            .labelColor(() => 'rgba(249, 250, 251, 0.7)')
            .labelDotRadius(0.4)
            .labelAltitude(0.01)
            .width(400)
            .height(400)
            (container);

        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.8;
        globe.controls().enableZoom = false;

        // Set initial camera position
        globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    } catch (e) {
        container.classList.add('fallback');
    }
}

// ============================================
// DELIGHT — Micro-interactions & personality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initCardTilt();
    initBidCycling();
    initSectionScanlines();
    initConsoleEasterEgg();
});

// 3D card tilt that tracks mouse position
function initCardTilt() {
    const cards = document.querySelectorAll('.street-card, .game-card');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = (y - 0.5) * -6;  // subtle: max 3deg
            const tiltY = (x - 0.5) * 6;

            this.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.4s ease';
            setTimeout(() => { this.style.transition = ''; }, 400);
        });
    });
}

// Lot card bid area: cycling random numbers
function initBidCycling() {
    const bidCursor = document.querySelector('.lot-bid-cursor');
    if (!bidCursor) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        bidCursor.textContent = '___';
        return;
    }

    let cycling = false;

    // Start cycling when lot card is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !cycling) {
                cycling = true;
                startBidCycle();
            } else if (!entry.isIntersecting) {
                cycling = false;
                bidCursor.textContent = '___';
            }
        });
    }, { threshold: 0.5 });

    const lotCard = document.querySelector('.lot-card');
    if (lotCard) observer.observe(lotCard);

    function startBidCycle() {
        if (!cycling) return;

        // Simulate bid deliberation: random numbers, then settle
        const phases = [
            { duration: 2000, interval: 80, range: [100, 500] },   // fast cycling
            { duration: 1500, interval: 150, range: [180, 420] },   // narrowing
            { duration: 1000, interval: 250, range: [240, 310] },   // deliberating
        ];

        let phaseIndex = 0;
        let elapsed = 0;

        function cycle() {
            if (!cycling) return;

            const phase = phases[phaseIndex];
            const value = Math.floor(Math.random() * (phase.range[1] - phase.range[0]) + phase.range[0]);
            bidCursor.textContent = value;
            bidCursor.classList.add('cycling');

            elapsed += phase.interval;
            if (elapsed >= phase.duration) {
                phaseIndex++;
                elapsed = 0;
                if (phaseIndex >= phases.length) {
                    // Settle on a final value with a brief flash
                    bidCursor.textContent = '274';
                    bidCursor.style.color = 'var(--accent-primary)';
                    setTimeout(() => {
                        bidCursor.style.color = '';
                        // Pause, then restart
                        setTimeout(() => {
                            phaseIndex = 0;
                            bidCursor.textContent = '___';
                            setTimeout(() => startBidCycle(), 1500);
                        }, 3000);
                    }, 300);
                    return;
                }
            }

            setTimeout(cycle, phase.interval);
        }

        cycle();
    }
}

// Amber scanline sweep when sections enter viewport
function initSectionScanlines() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const sections = document.querySelectorAll('.streets-section, .globe-section, .lot-section, .two-games-section');

    sections.forEach(section => {
        section.style.position = 'relative';
        const scanline = document.createElement('div');
        scanline.className = 'section-scanline';
        section.appendChild(scanline);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scanline = entry.target.querySelector('.section-scanline');
                if (scanline && !scanline.classList.contains('sweep')) {
                    scanline.classList.add('sweep');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// Console easter egg for developers
function initConsoleEasterEgg() {
    const styles = [
        'color: #D97706',
        'font-size: 14px',
        'font-weight: bold',
        'font-family: monospace'
    ].join(';');

    const subtleStyles = [
        'color: #9CA3AF',
        'font-size: 11px',
        'font-family: monospace'
    ].join(';');

    console.log('%c\u2588\u2588\u2588 TRADE CLASH \u2588\u2588\u2588', styles);
    console.log('%cYou found the terminal. Good instincts.', subtleStyles);
    console.log('%chttps://t.me/TradeClashSim', subtleStyles);
}
