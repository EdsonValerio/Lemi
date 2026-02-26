/* main.js - Lógica Global */
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('lemi-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    } else if (systemDark) {
        htmlEl.setAttribute('data-theme', 'dark');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('lemi-theme', newTheme);
        });
    }

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- MODULAR CAROUSEL LOGIC ---
    const initAutoCarousel = (carouselEl, interval = 4000) => {
        const images = carouselEl.querySelectorAll('.carousel-img');
        if (images.length <= 1) return;

        let currentSlide = 0;
        setInterval(() => {
            images[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % images.length;
            images[currentSlide].classList.add('active');
        }, interval);
    };

    document.querySelectorAll('.carousel').forEach(carousel => {
        initAutoCarousel(carousel, 4000 + Math.random() * 1000); // Randomize timing slightly
    });

    // --- MODAL LOGIC ---
    const modal = document.getElementById('dish-modal');
    const modalImagesContainer = document.getElementById('modal-carousel-inner');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');

    let modalSlides = [];
    let modalCurrentIndex = 0;

    const updateModalSlide = () => {
        modalSlides.forEach((img, idx) => {
            img.classList.toggle('active', idx === modalCurrentIndex);
        });
    };

    const openModal = (dishItem) => {
        const name = dishItem.dataset.name;
        const desc = dishItem.dataset.desc;
        const dishImages = dishItem.querySelectorAll('.carousel-img');

        modalTitle.textContent = name;
        modalDesc.textContent = desc;
        modalImagesContainer.innerHTML = '';
        modalSlides = [];

        dishImages.forEach((img, idx) => {
            const clone = img.cloneNode(true);
            clone.classList.remove('active');
            if (idx === 0) clone.classList.add('active');
            modalImagesContainer.appendChild(clone);
            modalSlides.push(clone);
        });

        modalCurrentIndex = 0;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Check if click was on a specific interactive element if needed
            openModal(item);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        modalCurrentIndex = (modalCurrentIndex - 1 + modalSlides.length) % modalSlides.length;
        updateModalSlide();
    });

    modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        modalCurrentIndex = (modalCurrentIndex + 1) % modalSlides.length;
        updateModalSlide();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') modalPrev.click();
        if (e.key === 'ArrowRight') modalNext.click();
    });
});