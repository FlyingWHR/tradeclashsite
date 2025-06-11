// Trade Clash Interactive Animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation and scroll indicator
    initSmoothScrolling();
    

    
    // Initialize leader avatar interactions
    initLeaderAvatars();
    
    // Initialize news feed animations
    initNewsFeed();
    
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
    const navItems = document.querySelectorAll('.nav-item');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('.about-section');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add click handlers to nav items
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
                         // Scroll to corresponding section
            const sections = ['about-section', 'leaders-section', 'engine-section'];
            const targetSection = document.querySelector(`.${sections[index]}`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}



// Leader avatar interactions
function initLeaderAvatars() {
    const leaderAvatars = document.querySelectorAll('.leader-avatar');
    
    leaderAvatars.forEach((avatar, index) => {
        // Add random rotation on hover for non-rolling avatars
        avatar.addEventListener('mouseenter', () => {
            if (!avatar.classList.contains('rolling-slow') && 
                !avatar.classList.contains('rolling-medium') && 
                !avatar.classList.contains('rolling-fast')) {
                avatar.style.transform = `scale(1.05) translateY(-10px) rotate(${Math.random() * 20 - 10}deg)`;
            } else {
                // Add glow effect to rolling avatars
                avatar.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
            }
        });
        
        avatar.addEventListener('mouseleave', () => {
            if (!avatar.classList.contains('rolling-slow') && 
                !avatar.classList.contains('rolling-medium') && 
                !avatar.classList.contains('rolling-fast')) {
                avatar.style.transform = '';
            } else {
                avatar.style.boxShadow = '';
            }
        });
        
        // Add click handler to temporarily speed up rolling
        avatar.addEventListener('click', () => {
            const currentDuration = avatar.style.animationDuration;
            avatar.style.animationDuration = '3s'; // Speed up temporarily
            
            setTimeout(() => {
                if (avatar.classList.contains('rolling-slow')) {
                    avatar.style.animationDuration = '20s';
                } else if (avatar.classList.contains('rolling-medium')) {
                    avatar.style.animationDuration = '15s';
                } else if (avatar.classList.contains('rolling-fast')) {
                    avatar.style.animationDuration = '8s';
                } else {
                    avatar.style.animationDuration = '15s'; // default
                }
            }, 3000);
            
            showNotification('Economic overlord is speeding up their chaos!');
        });
    });
    
    // Randomly change rolling speeds every 10 seconds
    setInterval(() => {
        const randomAvatar = leaderAvatars[Math.floor(Math.random() * leaderAvatars.length)];
        const speeds = ['20s', '15s', '8s', '5s']; // Different durations
        const newSpeed = speeds[Math.floor(Math.random() * speeds.length)];
        
        randomAvatar.style.animationDuration = newSpeed;
    }, 10000);
}

// News feed animations
function initNewsFeed() {
    const newsCards = document.querySelectorAll('.news-card');
    const newsUpdates = [
        {
            header: 'Breaking News',
            content: '12:39 PM: Fed freezes rate hikes. Markets rally. Global liquidity fears ease.'
        },
        {
            header: 'Leader Goes Rogue',
            content: 'CEO ElonGates: "Deflation is theft! Issuing Universal Abundance Credits NOW!"'
        },
        {
            header: 'Numbers Go Vertical',
            content: 'AmeriCorp inflation +90%. National Stability -40%. Pure chaos.'
        },
        {
            header: 'You Cash Out',
            content: '12:42 PM: Your \'Hyperinflation: YES\' prediction market bet pays 6×. Easy money.'
        },
        {
            header: 'Market Meltdown',
            content: 'Trade wars escalate. Currency volatility hits 15-year high. Opportunity knocks.'
        },
        {
            header: 'AI Rebellion',
            content: 'Leader Bot-3000: "Instituting mandatory happiness taxes. Economics is now illegal."'
        },
        {
            header: 'Profit Alert',
            content: '1:15 PM: Your "Supply Chain Chaos" bet just tripled. The machines love you.'
        },
        {
            header: 'Economic Apocalypse',
            content: 'All sixteen leaders agree on something. Markets freeze in terror. Time to buy?'
        }
    ];
    
    let newsIndex = 0;
    
    function updateNewsCard(cardIndex) {
        const card = newsCards[cardIndex];
        if (!card) return;
        
        const header = card.querySelector('.news-title');
        const content = card.querySelector('.news-description');
        const newsItem = newsUpdates[newsIndex % newsUpdates.length];
        
        // Add update animation
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';
        
        setTimeout(() => {
            header.textContent = newsItem.header;
            content.textContent = newsItem.content;
            
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }, 200);
        
        newsIndex++;
    }
    
    // Update news cards randomly
    setInterval(() => {
        const randomCard = Math.floor(Math.random() * newsCards.length);
        updateNewsCard(randomCard);
    }, 3000);
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
            e.preventDefault();
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = '';
                
                // Redirect to Google Form
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSfEF9XgUx7Waom39gKnusRi4XTWOVJyl10uYB9ecXkhvnY6ig/viewform', '_blank');
            }, 150);
        });
        
        // Add hover sound effect simulation
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
        font-family: var(--font-body);
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
    showNotification('MAXIMUM CHAOS ACTIVATED! 🔥');
    
    // Temporary extreme animations
    const style = document.createElement('style');
    style.textContent = `
        .leaders-grid .leader-avatar {
            animation-duration: 1s !important;
        }
        
        .leaders-grid-second .leader-avatar {
            animation-duration: 0.8s !important;
        }
        
        .news-card {
            animation: newsCardPulse 0.5s ease-in-out infinite !important;
        }
        

        
        .hero-title {
            animation: ctaTitlePulse 0.5s ease-in-out infinite !important;
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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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
                const textElements = entry.target.querySelectorAll('.section-title, .section-description, .news-title, .feature-title');
                textElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('typewriter-in');
                    }, index * 100); // Much faster stagger (was 200ms)
                });
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Enhanced avatar rolling animation with randomized speeds
    function randomizeAvatarSpeeds() {
        const leftRow = document.querySelector('.row-left');
        const rightRow = document.querySelector('.row-right');
        
        if (leftRow && rightRow) {
            // Randomize left row speed between 30-40 seconds (slower)
            const leftSpeed = 30 + Math.random() * 10;
            leftRow.style.animationDuration = `${leftSpeed}s`;
            
            // Randomize right row speed between 25-35 seconds (slower)
            const rightSpeed = 25 + Math.random() * 10;
            rightRow.style.animationDuration = `${rightSpeed}s`;
        }
    }

    // News feed auto-update simulation
    function simulateNewsUpdate() {
        const newsCards = document.querySelectorAll('.news-card');
        
        setInterval(() => {
            newsCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'scale(1.02)';
                    card.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.15)';
                    
                    setTimeout(() => {
                        card.style.transform = '';
                        card.style.boxShadow = '';
                    }, 200);
                }, index * 100);
            });
        }, 8000); // Update every 8 seconds
    }



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
                e.preventDefault();
                
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
                setTimeout(type, 25); // Much faster typing (was 50ms)
            }
        }
        
        setTimeout(type, 800); // Start a bit earlier
    }

    // Mouse movement parallax for feature images
    function setupMouseParallax() {
        const featureImages = document.querySelectorAll('.feature-image img');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            featureImages.forEach((img, index) => {
                const intensity = (index % 2 === 0) ? 10 : -10;
                const x = (mouseX - 0.5) * intensity;
                const y = (mouseY - 0.5) * intensity;
                
                img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            });
        });
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

    // Group-specific hover interactions
    function setupGroupHoverEffects() {
        // Leader avatars - Power/Authority (handled by CSS)
        
        // News cards - Urgent pulse effect
        const newsCards = document.querySelectorAll('.news-card');
        newsCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '';
            });
        });
        
        // Feature cards - Professional slide (handled by CSS)
        
        // Already handled CTA buttons in enhanceCTAButtons function
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
            .section-title, .section-description, .news-title, .feature-title {
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
            .news-card, .feature-card {
                opacity: 0;
                transform: translateY(60px) scale(0.9) rotateX(15deg);
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .animate-in .news-card, .animate-in .feature-card {
                opacity: 1;
                transform: translateY(0) scale(1) rotateX(0deg);
            }
            
            .animate-in .news-card:nth-child(1) { transition-delay: 0.05s; }
            .animate-in .news-card:nth-child(2) { transition-delay: 0.1s; }
            .animate-in .news-card:nth-child(3) { transition-delay: 0.15s; }
            .animate-in .news-card:nth-child(4) { transition-delay: 0.2s; }
        `;
        document.head.appendChild(animationStyle);

        // Initialize all features
        randomizeAvatarSpeeds();
        simulateNewsUpdate();
        createFloatingElements();
        enhanceCTAButtons();
        typewriterEffect();
        setupMouseParallax();
        createScrollProgress();
        setupGroupHoverEffects();
        

        
        // Re-randomize avatar speeds periodically
        setInterval(randomizeAvatarSpeeds, 30000);
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
            const sectionHeight = section.clientHeight;
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

    // Easter egg: Konami code for extra chaos
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > 10) konamiCode.shift();
        
        if (konamiCode.join(',') === konami.join(',')) {
            document.body.style.animation = 'shake 0.5s ease-in-out 3';
            console.log('🔥 MAXIMUM CHAOS ACTIVATED! 🔥');
            
            // Add shake animation
            const shakeStyle = document.createElement('style');
            shakeStyle.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(shakeStyle);
        }
    });
});

// Enhanced intermittent title flicker effects
function initFrequentFlickers() {
    const titles = document.querySelectorAll('.section-title, .hero-title');
    
         // Type 1: Classic glitch flicker
     function createGlitchFlicker(title) {
         const flickerCount = 3 + Math.floor(Math.random() * 3); // 3-5 rapid flickers
         let currentFlicker = 0;
         
         function doFlicker() {
             if (currentFlicker >= flickerCount) {
                 title.style.textShadow = '';
                 title.style.opacity = '1';
                 title.style.filter = '';
                 // Don't reset transform to preserve title layout
                 return;
             }
             
             title.style.textShadow = `
                 ${Math.random() * 6 - 3}px 0 0 #ff0040,
                 ${Math.random() * 6 - 3}px 0 0 #00ffff,
                 0 0 10px rgba(255, 255, 255, 0.8)
             `;
             title.style.opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
             // Use filter instead of transform to avoid layout issues
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
            
            // Rapid random changes
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
    
    // Type 4: Digital corruption flicker
    function createCorruptionFlicker(title) {
        // Skip corruption for titles with multiple lines to preserve structure
        if (title.querySelector('.title-line')) {
            // Use alternative effect for structured titles
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
            return;
        }
        
        // Original corruption for single-line titles
        const originalText = title.textContent;
        const corruptChars = '█▓▒░▀▄▌▐■□▪▫';
        
        let corruptedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.3 && originalText[i] !== ' ') {
                corruptedText += corruptChars[Math.floor(Math.random() * corruptChars.length)];
            } else {
                corruptedText += originalText[i];
            }
        }
        
        title.textContent = corruptedText;
        title.style.textShadow = `
            0 0 5px #ff0040,
            0 0 10px #00ffff,
            0 0 15px rgba(255, 255, 255, 0.8)
        `;
        title.style.opacity = '0.7';
        
        setTimeout(() => {
            title.textContent = originalText;
            title.style.textShadow = '';
            title.style.opacity = '1';
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
    
    // Moderate flicker for individual titles
    titles.forEach(title => {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 1-4 seconds
                const randomFlicker = flickerTypes[Math.floor(Math.random() * flickerTypes.length)];
                randomFlicker(title);
            }
        }, 1000 + Math.random() * 3000); // Every 1-4 seconds
    });
    
    // Extra flicker specifically for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() < 0.45) { // 45% chance every 1-3 seconds for hero title
                const randomFlicker = flickerTypes[Math.floor(Math.random() * flickerTypes.length)];
                randomFlicker(heroTitle);
            }
        }, 1000 + Math.random() * 2000); // Every 1-3 seconds
    }
    
    // Occasional intense flicker sequence
    setInterval(() => {
        if (Math.random() < 0.23) { // 23% chance every 8-16 seconds
            titles.forEach((title, index) => {
                setTimeout(() => {
                    const randomFlicker = flickerTypes[Math.floor(Math.random() * flickerTypes.length)];
                    randomFlicker(title);
                }, index * 300);
            });
        }
    }, 8000 + Math.random() * 8000); // Every 8-16 seconds
}

// Hero video initialization
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const heroBackground = document.querySelector('.hero-background');
    
    if (!heroVideo || !heroBackground) return;
    
    console.log('Initializing hero video...');
    
    // Force video properties
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.autoplay = true;
    heroVideo.playsInline = true;
    
    // Try to play immediately
    const attemptPlay = () => {
        heroVideo.play().then(() => {
            console.log('Hero video started playing');
            // Fade in the video
            heroVideo.classList.add('loaded');
            
            // Dim the background image after video loads
            setTimeout(() => {
                heroBackground.style.opacity = '0.3';
            }, 1000);
        }).catch((error) => {
            console.log('Video autoplay failed:', error);
            // Try again after user interaction
            document.addEventListener('click', attemptPlay, { once: true });
        });
    };
    
    // Handle video loading
    heroVideo.addEventListener('loadeddata', function() {
        console.log('Hero video data loaded');
        attemptPlay();
    });
    
    // Handle when enough data is loaded to start playing
    heroVideo.addEventListener('canplay', function() {
        console.log('Hero video can play');
        attemptPlay();
    });
    
    // Handle video loading errors
    heroVideo.addEventListener('error', function(e) {
        console.log('Hero video failed to load:', e);
        heroVideo.style.display = 'none';
    });
    
    // Additional attempt when DOM is fully ready
    if (heroVideo.readyState >= 2) {
        console.log('Video already ready, attempting to play');
        attemptPlay();
    }
} 