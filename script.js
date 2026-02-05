// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1200);
});

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Navbar background on scroll
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    updateActiveLink();
    handleNavbarScroll();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar-fill');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            observer.unobserve(entry.target);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== WORK FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter items
        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // FormSubmit will handle the actual submission
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ===== PARALLAX EFFECTS =====
document.addEventListener('mousemove', (e) => {
    const badges = document.querySelectorAll('.badge');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    badges.forEach((badge, index) => {
        const speed = (index + 1) * 15;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        badge.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should fade in
document.querySelectorAll('.skill-card, .work-item, .exp-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ===== CUSTOM CURSOR (Desktop Only) =====
if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #667eea;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .work-item, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.8)';
            cursor.style.borderColor = '#f093fb';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#667eea';
        });
    });
}

// ===== PAGE LOAD PERFORMANCE =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Welcome to My Portfolio!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c✨ Designed by Iruvantika Gurung', 'color: #f093fb; font-size: 16px;');
console.log('%c📧 iru062004@gmail.com', 'color: #06b6d4; font-size: 14px;');

// ===== LIGHTBOX =====
(function () {
    const lightbox     = document.getElementById('lightbox');
    const lbImg        = document.getElementById('lightboxImg');
    const lbVideo      = document.getElementById('lightboxVideo');
    const lbCat        = document.getElementById('lightboxCat');
    const lbTitle      = document.getElementById('lightboxTitle');
    const lbDesc       = document.getElementById('lightboxDesc');
    const lbCounter    = document.getElementById('lightboxCounter');
    const btnClose     = lightbox.querySelector('.lightbox-close');
    const btnPrev      = lightbox.querySelector('.lightbox-prev');
    const btnNext      = lightbox.querySelector('.lightbox-next');

    // Collect every visible work-item as a slide source
    let slides = [];   // { src, cat, title, desc, isVideo }
    let current = 0;

    function buildSlides() {
        slides = [];
        document.querySelectorAll('.work-item:not(.hide)').forEach(item => {
            const img   = item.querySelector('.work-image img');
            const video = item.querySelector('.work-image video');
            const cat   = item.querySelector('.work-category');
            const title = item.querySelector('.work-title');
            const desc  = item.querySelector('.work-desc');
            
            if (video) {
                slides.push({
                    src   : video.src,
                    cat   : cat  ? cat.textContent.trim()  : '',
                    title : title ? title.textContent.trim() : '',
                    desc  : desc ? desc.textContent.trim() : '',
                    isVideo: true
                });
            } else if (img) {
                slides.push({
                    src   : img.src,
                    cat   : cat  ? cat.textContent.trim()  : '',
                    title : title ? title.textContent.trim() : '',
                    desc  : desc ? desc.textContent.trim() : '',
                    isVideo: false
                });
            }
        });
    }

    function show(index) {
        // clamp
        if (index < 0)            index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;

        const s = slides[current];
        
        // Stop any playing video
        if (lbVideo.src) {
            lbVideo.pause();
            lbVideo.src = '';
        }

        if (s.isVideo) {
            // Show video, hide image
            lbImg.style.display = 'none';
            lbVideo.style.display = 'block';
            lbVideo.src = s.src;
            lbVideo.load();
        } else {
            // Show image, hide video
            lbVideo.style.display = 'none';
            lbImg.style.display = 'block';
            lbImg.classList.add('loading');

            const tmp    = new Image();
            tmp.onload   = () => { lbImg.src = s.src; lbImg.classList.remove('loading'); };
            tmp.onerror  = () => { lbImg.src = s.src; lbImg.classList.remove('loading'); };
            tmp.src      = s.src;
        }

        lbCat.textContent    = s.cat;
        lbTitle.textContent  = s.title;
        lbDesc.textContent   = s.desc;
        lbCounter.textContent = (current + 1) + ' / ' + slides.length;
    }

    function open(index) {
        buildSlides();
        if (!slides.length) return;
        show(index);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        // Stop video when closing
        if (lbVideo.src) {
            lbVideo.pause();
            lbVideo.src = '';
        }
    }

    // --- click on any work card opens lightbox at that index ---
    document.querySelectorAll('.work-item').forEach((item) => {
        item.querySelector('.work-image').addEventListener('click', () => {
            // rebuild visible list, find which index this item is in it
            buildSlides();
            const visibleItems = [...document.querySelectorAll('.work-item:not(.hide)')];
            const idx = visibleItems.indexOf(item);
            open(idx >= 0 ? idx : 0);
        });
    });

    // --- controls ---
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => show(current - 1));
    btnNext.addEventListener('click', () => show(current + 1));

    // click backdrop to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-img-wrap')) close();
    });

    // keyboard: Esc / left / right
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
    
    // Double-click video to toggle fullscreen
    lbVideo.addEventListener('dblclick', () => {
        if (lbVideo.requestFullscreen) {
            lbVideo.requestFullscreen();
        } else if (lbVideo.webkitRequestFullscreen) {
            lbVideo.webkitRequestFullscreen();
        } else if (lbVideo.mozRequestFullScreen) {
            lbVideo.mozRequestFullScreen();
        } else if (lbVideo.msRequestFullscreen) {
            lbVideo.msRequestFullscreen();
        }
    });
})();






