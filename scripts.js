/* scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLanguageSwitcher();
    initAccordions(); // <--- ADDED: Initialize the new accordion logic
});

// 1. Mobile Navigation Logic
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (!navToggle || !navLinks) return;

    function toggleMenu() {
        const isActive = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 2. Language Switcher Logic
function initLanguageSwitcher() {
    const toggleBtn = document.getElementById('lang-toggle');
    const body = document.body;

    if (!toggleBtn) return;

    // 1. Check if user has a preference saved
    const savedLang = localStorage.getItem('site-lang') || 'de';
    setLanguage(savedLang);

    // 2. Listen for clicks
    toggleBtn.addEventListener('click', () => {
        const currentLang = body.getAttribute('data-active-lang');
        const newLang = currentLang === 'de' ? 'en' : 'de';
        setLanguage(newLang);
    });

    function setLanguage(lang) {
        // Set the attribute on body which triggers the CSS hiding/showing
        body.setAttribute('data-active-lang', lang);
        
        // Update button text
        toggleBtn.textContent = lang === 'de' ? 'EN' : 'DE';
        
        // Save preference
        localStorage.setItem('site-lang', lang);
        
        // Update html lang attribute for accessibility
        document.documentElement.lang = lang;
    }
}

// 3. Accordion Logic (ADDED SECTION)
function initAccordions() {
    // We attach the function to the window object so the inline onclick in HTML can find it
    window.toggleAccordion = function(contentId, header) {
        const content = document.getElementById(contentId);
        const icon = header.querySelector('.accordion-icon');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Close all other accordions (Optional - keeps the UI clean)
        document.querySelectorAll('.accordion-content').forEach(el => {
            if (el.id !== contentId) {
                el.style.maxHeight = null;
                el.previousElementSibling.setAttribute('aria-expanded', 'false');
                el.previousElementSibling.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current
        if (isExpanded) {
            content.style.maxHeight = null;
            header.setAttribute('aria-expanded', 'false');
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            header.setAttribute('aria-expanded', 'true');
            icon.style.transform = 'rotate(180deg)';
        }
    };
}
