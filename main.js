document.addEventListener('DOMContentLoaded', () => {

    // === Mobile Navigation ===
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links'); // Fixed: Targeting the UL correctly

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // === Sticky Header Shrink ===
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === FAQ Accordion ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            const isOpen = question.getAttribute('aria-expanded') === 'true';

            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.nextElementSibling.style.maxHeight = null;
                q.querySelector('.faq-icon').textContent = '+';
                q.setAttribute('aria-expanded', 'false');
            });

            // Open the clicked one if it was closed
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '-';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // === Scroll Reveal ===
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // === Lightbox ===
    const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-bento-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            lightbox.classList.add('active');
            // Get high-res image URL
            let src = e.target.src;
            // Replace Unsplash width parameters for higher quality if they exist
            src = src.replace('w=600', 'w=1200').replace('w=800', 'w=1200');
            lightboxImg.src = src;
            lightboxImg.alt = e.target.alt;
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Keyboard accessibility for lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // === Back to Top Button ===
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Current Year in Footer ===
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});