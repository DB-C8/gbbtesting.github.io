// We'll add JavaScript functionality as needed
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after animations complete
    setTimeout(function() {
        document.querySelector('.loader-wrapper').classList.add('fade-out');
    }, 2500);

    // Prevent scrolling while loader is visible
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
        document.body.style.overflow = 'visible';
    }, 2500);

    // Gallery functionality
    function initGallerySlider() {
        const track = document.querySelector('.gallery-track');
        const slides = document.querySelectorAll('.gallery-slide');
        const nextButton = document.querySelector('.gallery-nav .next');
        const prevButton = document.querySelector('.gallery-nav .prev');
        
        if (!track || !slides.length || !nextButton || !prevButton) return;

        let currentIndex = 0;
        let slidesToShow = 3;
        
        function updateSlidesToShow() {
            if (window.innerWidth <= 768) {
                slidesToShow = 1;
            } else if (window.innerWidth <= 1024) {
                slidesToShow = 2;
            } else {
                slidesToShow = 3;
            }
        }

        function updateSlidePosition() {
            if (window.innerWidth <= 768) {
                // Mobile view: show current slide only
                slides.forEach((slide, index) => {
                    if (index === currentIndex) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                });
            } else {
                // Desktop view: slide animation
                slides.forEach(slide => slide.style.display = 'block');
                const slideWidth = slides[0].offsetWidth + 24;
                track.style.transition = 'transform 0.5s ease-in-out';
                track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }
        }

        function moveSlides(direction) {
            const totalSlides = slides.length;
            
            if (direction === 'next') {
                if (currentIndex >= totalSlides - slidesToShow) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
            } else {
                if (currentIndex <= 0) {
                    currentIndex = totalSlides - slidesToShow;
                } else {
                    currentIndex--;
                }
            }
            
            updateSlidePosition();
        }

        // Event Listeners
        nextButton.addEventListener('click', () => moveSlides('next'));
        prevButton.addEventListener('click', () => moveSlides('prev'));

        // Handle window resize
        window.addEventListener('resize', () => {
            updateSlidesToShow();
            updateSlidePosition();
        });

        // Lightbox functionality
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);

        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'lightbox-content';
        lightbox.appendChild(lightboxImg);

        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '×';
        lightbox.appendChild(closeBtn);

        // Add click handlers for images
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox when clicking close button
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'visible';
        });

        // Close lightbox when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });

        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });

        // Initial setup
        updateSlidesToShow();
        updateSlidePosition();
    }

    // Reviews functionality
    function initReviews() {
        const reviews = [
            {
                text: "The attention to detail and skill of the barbers here is unmatched. Every visit feels like a luxury experience, and I always leave looking and feeling my best.",
                author: "Michael Thompson",
                role: "Regular Client"
            },
            {
                text: "Best barbershop in NYC! The hot towel shave is incredible, and the atmosphere is perfect. These guys know exactly what they're doing.",
                author: "David Martinez",
                role: "Loyal Customer"
            },
            {
                text: "Found my go-to spot for grooming. The team here understands modern styles while respecting classic techniques. Always a professional experience.",
                author: "James Wilson",
                role: "VIP Member"
            }
        ];

        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const cards = document.querySelectorAll('.testimonial-card');
        const reviewsNextButton = document.querySelector('.reviews-nav .next');
        const reviewsPrevButton = document.querySelector('.reviews-nav .prev');
        
        if (!dots.length || !cards.length) return; // Exit if elements not found

        let currentReviewIndex = 0;
        let slideInterval;
        const SLIDE_INTERVAL_TIME = 5000; // 5 seconds between slides

        function showReview(index) {
            cards.forEach(card => {
                card.classList.remove('active');
                card.style.display = 'none';
            });
            dots.forEach(dot => dot.classList.remove('active'));

            cards[index].classList.add('active');
            cards[index].style.display = 'block';
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            showReview(currentReviewIndex);
        }

        function prevSlide() {
            currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
            showReview(currentReviewIndex);
        }

        // Start automatic sliding
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, SLIDE_INTERVAL_TIME);
        }

        // Stop automatic sliding
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // Add event listeners
        reviewsNextButton?.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        reviewsPrevButton?.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        // Add click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentReviewIndex = index;
                showReview(currentReviewIndex);
                startAutoSlide();
            });
        });

        // Initialize first review and start auto-sliding
        showReview(0);
        startAutoSlide();
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
        
        menuBtn?.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Initialize both components
    // Remove this line from your initialization

    // Add new Stats Counter functionality
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-badge .number');
        console.log('Found stats elements:', stats.length); // Debug log
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('Stat intersection:', entry.isIntersecting); // Debug log
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetNumber = parseInt(target.textContent);
                    console.log('Starting count to:', targetNumber); // Debug log
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = targetNumber / (duration / 16);

                    function updateCount() {
                        count += increment;
                        if (count < targetNumber) {
                            target.textContent = Math.round(count) + '+';
                            requestAnimationFrame(updateCount);
                        } else {
                            target.textContent = targetNumber + '+';
                        }
                    }

                    updateCount();
                    observer.unobserve(target);
                }
            });
        }, options);

        stats.forEach(stat => {
            console.log('Observing stat:', stat.textContent); // Debug log
            observer.observe(stat);
        });
    }

    // Add new Redefining Section Animation
    function initRedefiningAnimation() {
        const redefiningSection = document.querySelector('.redefining');
        const content = document.querySelector('.redefining-content');
        const statsImage = document.querySelector('.stats-image');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    content.classList.add('animate-in');
                    statsImage.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(redefiningSection);
    }

    // Initialize new components
    initStatsCounter();
    initRedefiningAnimation();

    // Lightbox functionality
    // Remove this entire function

    // Function to handle sticky button position
    function handleStickyButton() {
        const stickyBtn = document.querySelector('.sticky-book-btn');
        const footer = document.querySelector('.footer');
        
        if (!stickyBtn || !footer) return;

        const footerTop = footer.getBoundingClientRect().top;
        
        if (footerTop <= window.innerHeight) {
            stickyBtn.style.position = 'absolute';
            stickyBtn.style.bottom = (footer.offsetHeight + 30) + 'px';
        } else {
            stickyBtn.style.position = 'fixed';
            stickyBtn.style.bottom = '30px';
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleStickyButton);

    // Initial call
    handleStickyButton();

    // Add to your DOMContentLoaded event listener
    initGallerySlider();
    initReviews();


    // Results Slider functionality
    const resultsBtn = document.querySelector('.results-btn');
    const resultsSection = document.querySelector('.results-section');
    const isMobile = window.innerWidth <= 768;
    
    // Select slides based on device type
    const slides = isMobile ? 
        document.querySelectorAll('.slider-slide.mobile-only') : 
        document.querySelectorAll('.slider-slide.desktop-only');
    
    const nextBtn = document.querySelector('.slider-nav .next');
    const prevBtn = document.querySelector('.slider-nav .prev');
    let currentSlide = 0;

    if (resultsBtn && resultsSection) {
        resultsBtn.addEventListener('click', () => {
            resultsBtn.classList.toggle('active');
            resultsSection.classList.toggle('active');
            if (resultsSection.classList.contains('active')) {
                showSlide(currentSlide);
            }
        });
    }

    function showSlide(index, direction = 'next') {
        const currentActive = document.querySelector('.slider-slide.active');
        
        // Remove all transition classes
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
            slide.style.display = 'none';
        });

        // Set up the slides
        const newActive = slides[index];
        
        if (currentActive) {
            // Position the current slide
            currentActive.style.display = 'block';
            currentActive.classList.add(direction === 'next' ? 'prev' : 'next');
        }

        // Position and show the new slide
        newActive.style.display = 'block';
        
        // Trigger reflow
        newActive.offsetHeight;
        
        // Add active class to trigger animation
        newActive.classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide, 'next');
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide, 'prev');
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Refresh page when switching between mobile and desktop
        }
    });

    // Phone call handling
    const consultationBtn = document.querySelector('a.highlight-btn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function(e) {
            // Let the default tel: protocol handle the call on all devices
            return true;
        });
    }

    // Debug: Log all slides
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        console.log(`Slide ${index + 1} image path:`, img.src);
        console.log(`Slide ${index + 1} loaded:`, img.complete);
    });
}); 




