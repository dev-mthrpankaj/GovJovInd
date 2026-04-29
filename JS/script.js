// Mobile menu toggle with animation
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

// Counter Animation for Stats
const stats = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounters = () => {
    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/[^\d]/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString() + (target === 50 ? '+' : target >= 1000000 ? 'M+' : 'K+');
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = (target >= 1000000 ? (target/1000000) + 'M+' : (target/1000) + 'K+');
                if(target === 50) counter.innerText = '50+';
            }
        };
        updateCount();
    });
};

// Intersection Observer to trigger counters when visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.8rem 5%';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '1rem 5%';
    }
});