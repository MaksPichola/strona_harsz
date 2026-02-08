// Obsługa menu mobilnego
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            // Przełączanie klasy 'active' na liście linków
            // W CSS trzeba dodać klasę .active dla .nav-links w media queries
            // Obecnie w style.css: .nav-links.active { display: flex; }
            navLinks.classList.toggle('active');
        });
    }

    // Płynne przewijanie do sekcji (dla linków kotwiczących np. #oferta)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Zamknij menu mobilne po kliknięciu
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Scroll Animations (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Przestań obserwować po aktywacji
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Automatyczne dodawanie klasy .reveal do sekcji i kart
    const revealElements = document.querySelectorAll('section, h1, h2, .plot-card, .feature-item, .hero p, .hero .btn, .info-card, .map-exhibit');

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');

        // Dodanie opóźnień dla gridów
        if (el.classList.contains('plot-card') || el.classList.contains('feature-item')) {
            const delayClass = `reveal-delay-${(index % 3) + 1}`;
            el.classList.add(delayClass);
        }

        observer.observe(el);
    });

    // Fallback: Pokaż elementy jeśli observer nie zadziała po 2 sekundach
    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('active');
            }
        });
    }, 2000);
});
