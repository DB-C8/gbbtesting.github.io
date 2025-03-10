document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initMobileMenu();
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            initFooter();
            // Initialize sticky button after footer is loaded
            initStickyButton();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

function initStickyButton() {
    const stickyBtn = document.querySelector('.sticky-book-btn');
    const footer = document.querySelector('.footer');
    
    if (!stickyBtn || !footer) return;

    function handleStickyButton() {
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
}

function initFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
    }
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    const body = document.body;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.style.position = 'absolute';
        
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Add click handlers for menu items
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
} 