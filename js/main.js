/**
 * 우성자동문Class - Premium Automatic Door Website
 * JavaScript Interactions & Animations
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // DOOR OPENING ANIMATION
    // ═══════════════════════════════════════════════════════════════

    const doorOverlay = document.getElementById('doorOverlay');

    function initDoorAnimation() {
        // Prevent scrolling during door animation
        document.body.classList.add('door-opening');

        // Trigger door opening after a short delay
        setTimeout(() => {
            doorOverlay.classList.add('opened');

            // Remove overlay after animation completes
            setTimeout(() => {
                doorOverlay.classList.add('hidden');
                document.body.classList.remove('door-opening');

                // Show floating call button
                showFloatingButton();
            }, 1200);
        }, 800);
    }

    // ═══════════════════════════════════════════════════════════════
    // FLOATING CALL BUTTON
    // ═══════════════════════════════════════════════════════════════

    const floatingCall = document.getElementById('floatingCall');

    function showFloatingButton() {
        setTimeout(() => {
            floatingCall.classList.add('visible');
        }, 500);
    }

    // ═══════════════════════════════════════════════════════════════
    // SENSOR REVEAL (Scroll Animation)
    // ═══════════════════════════════════════════════════════════════

    const sensorElements = document.querySelectorAll('.sensor-reveal');

    function initSensorReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));

                    // Unobserve after revealing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sensorElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // PROCESS TIMELINE ANIMATION
    // ═══════════════════════════════════════════════════════════════

    const timelineProgress = document.getElementById('timelineProgress');
    const processSteps = document.querySelectorAll('.process-step');

    function initProcessTimeline() {
        const processSection = document.getElementById('process');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimeline();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (processSection) {
            observer.observe(processSection);
        }
    }

    function animateTimeline() {
        let currentStep = 0;
        const totalSteps = processSteps.length;
        const stepDuration = 400;

        function activateNextStep() {
            if (currentStep < totalSteps) {
                // Update progress bar
                const progress = ((currentStep + 1) / totalSteps) * 100;
                if (timelineProgress) {
                    timelineProgress.style.width = `${progress}%`;
                }

                // Activate step
                processSteps[currentStep].classList.add('active');

                currentStep++;
                setTimeout(activateNextStep, stepDuration);
            }
        }

        setTimeout(activateNextStep, 500);
    }

    // ═══════════════════════════════════════════════════════════════
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ═══════════════════════════════════════════════════════════════

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }

    // ═══════════════════════════════════════════════════════════════
    // SERVICE CARD HOVER EFFECT ENHANCEMENT
    // ═══════════════════════════════════════════════════════════════

    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.door-frame-card');

        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle sound effect feel with haptic-like pulse
                this.style.transition = 'all 0.15s ease-out';
                setTimeout(() => {
                    this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 150);
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // PARALLAX EFFECT FOR HERO
    // ═══════════════════════════════════════════════════════════════

    function initParallax() {
        const heroBg = document.querySelector('.hero-bg img');

        if (!heroBg) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;

                    if (scrolled < window.innerHeight) {
                        heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // SCROLL INDICATOR HIDE ON SCROLL
    // ═══════════════════════════════════════════════════════════════

    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (!scrollIndicator) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE: Check for reduced motion preference
    // ═══════════════════════════════════════════════════════════════

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════

    function init() {
        // Check for reduced motion preference
        if (prefersReducedMotion()) {
            // Skip door animation, show content immediately
            if (doorOverlay) {
                doorOverlay.classList.add('hidden');
            }
            document.body.classList.remove('door-opening');
            showFloatingButton();

            // Reveal all sensor elements immediately
            sensorElements.forEach(el => el.classList.add('revealed'));
            processSteps.forEach(step => step.classList.add('active'));

            if (timelineProgress) {
                timelineProgress.style.width = '100%';
            }
        } else {
            // Normal initialization with animations
            initDoorAnimation();
            initSensorReveal();
            initProcessTimeline();
            initParallax();
            initScrollIndicator();
        }

        // Always initialize these
        initSmoothScroll();
        initServiceCards();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
