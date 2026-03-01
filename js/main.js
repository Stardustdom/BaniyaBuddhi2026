const video = document.getElementById("introVideo");
const source = document.getElementById("videoSource");
const main = document.getElementById("mainContent");
const heroImg = document.getElementById("heroImg");

function setupIntro() {

    if (!video) return;

    if (window.innerWidth > 1200) {
        source.src = "assets/introdesktop.mp4";
        if (heroImg) heroImg.src = "assets/bgdesktop.jpeg";
    } else {
        source.src = "assets/intromobile.mp4";
        if (heroImg) heroImg.src = "assets/bgmobile.jpeg";
    }

    video.load();
}
function showMain() {
    if (!video || !main) return;

    // fade out video
    video.style.opacity = "0";

    // fade in main content
    main.style.opacity = "1";

    // remove video after fade completes
    setTimeout(() => {
        video.style.display = "none";
    }, 1200); // match CSS transition time
}
setupIntro();
window.addEventListener("resize", setupIntro);
video.addEventListener("ended", showMain);

/* ==========================================
   EVENT TIMELINE SCROLL ANIMATIONS
========================================== */

// Initialize Timeline Journey Animations
function initTimelineAnimations() {
    const roadProgress = document.getElementById('roadProgress');
    const checkpoints = document.querySelectorAll('.checkpoint');
    const roadMarkers = document.querySelectorAll('.road-marker');
    const timelineSection = document.querySelector('.timeline-section');
    
    if (!roadProgress || !checkpoints.length || !timelineSection) return;

    // IntersectionObserver for Checkpoints and Markers
    const checkpointObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate corresponding road marker
                    const checkpointNumber = entry.target.dataset.checkpoint;
                    if (checkpointNumber) {
                        const marker = document.querySelector(`.marker-${checkpointNumber}`);
                        if (marker) {
                            setTimeout(() => {
                                marker.classList.add('visible');
                            }, 300);
                        }
                    }
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '0px 0px -80px 0px'
        }
    );

    // Observe each checkpoint
    checkpoints.forEach(checkpoint => {
        checkpointObserver.observe(checkpoint);
    });

    // Road Progress Animation on Scroll
    let animationFrame = null;

    function updateRoadProgress() {
        const rect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress through the timeline section
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // Start progress when section enters viewport, complete when section exits
        let progress = 0;
        
        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
            // Section is in viewport
            const scrolled = windowHeight - sectionTop;
            const scrollableDistance = sectionHeight + windowHeight;
            progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        } else if (sectionTop <= -sectionHeight) {
            // Section has passed (scrolled down completely)
            progress = 1;
        } else if (sectionTop >= windowHeight) {
            // Section is below viewport (not reached yet or scrolled back up)
            progress = 0;
        }
        
        // Apply smooth easing for more organic animation
        progress = easeInOutCubic(progress);
        
        // Total path length for the curved road (updated for new path)
        const pathLength = 2200;
        const dashOffset = pathLength - (pathLength * progress);
        
        // Update stroke-dashoffset for road progress
        roadProgress.style.strokeDashoffset = dashOffset;
        
        animationFrame = null;
    }

    // Smooth cubic easing function
    function easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Throttled scroll listener using requestAnimationFrame
    function onScroll() {
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(updateRoadProgress);
        }
    }

    // Attach scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial update on page load
    updateRoadProgress();

    // Update on window resize
    window.addEventListener('resize', () => {
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(updateRoadProgress);
        }
    }, { passive: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineAnimations);
} else {
    initTimelineAnimations();
}
