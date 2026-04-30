// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (!menuToggle || !nav) return;

    function setMenu(open) {
        nav.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        menuToggle.textContent = open ? '×' : '☰';
    }

    menuToggle.addEventListener('click', () => {
        setMenu(!nav.classList.contains('active'));
    });

    menuToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenu(false);
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setMenu(false);
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Team data
const teamData = [
    { name: "Pankaj Mathur", role: "Founder & CEO", bio: "Multimedia and Animation", img: "../Assets/About Us Page/Pankaj.jpg", social: { instagram: "#", twitter: "#", linkedin: "#" } },
    { name: "Deepak Yadav", role: "Co-Founder & Manager", bio: "U.P Police", img: "../Assets/About Us Page/Deepak.jpeg", social: { instagram: "#", linkedin: "#", twitter: "#" } },
    { name: "Vinay Yadav", role: "SEO & Digital Marketing Specialist", bio: "Medical Field", img: "../Assets/About Us Page/Vinay.jpeg", social: { instagram: "#", linkedin: "#", github: "#" } },
    { name: "Yogesh Kumar Yadav", role: "UI/UX Designer Advisor", bio: "Tracks all govt jobs", img: "../Assets/About Us Page/Yogesh.jpg", social: { twitter: "https://x.com/YogeshKumarRao3", instagram: "https://www.instagram.com/yogeshkumar9342/", linkedin: "#" } },
    { name: "Dolly Mathur", role: "Content Writer / Editor", bio: "Expert for Content Advisory", img: "../Assets/About Us Page/Dolly.jpeg", social: { linkedin: "#", behance: "#" } },
    { name: "Dolly Mathur", role: "Content Writer / Editor", bio: "Expert for Content Advisory", img: "../Assets/About Us Page/Dolly.jpeg", social: { linkedin: "#", behance: "#" } },
    { name: "Akanksha Mathur", role: "Co-Founder & Manager", bio: "Blogger", img: "../Assets/About Us Page/Akanksha.JPG", social: { instagram: "#", linkedin: "#", twitter: "#" } },
    { name: "Satya Prakash", role: "Customer Support", bio: "User help and support", img: "../Assets/About Us Page/Deepak.jpeg", social: { linkedin: "#" } }
];

function getCardsPerSlide() {
    if (window.matchMedia('(max-width: 768px)').matches) return 1;
    if (window.matchMedia('(max-width: 1024px)').matches) return 2;
    return 3;
}

// Init Carousel
function initTeamCarousel() {
    const carousel = document.querySelector('.team-carousel');
    const teamMembers = document.querySelector('.team-members');
    const carouselDots = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!carousel || !teamMembers || !carouselDots || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    let cardsPerSlide = getCardsPerSlide();
    let totalSlides = Math.ceil(teamData.length / cardsPerSlide);
    let startX = 0;
    let currentX = 0;
    let isPointerDown = false;

    teamMembers.innerHTML = '';

    teamData.forEach(member => {
        const memberEl = document.createElement('div');
        memberEl.className = 'team-member';
        memberEl.innerHTML = `
            <img src="${member.img}" alt="${member.name}" onerror="this.style.display='none'">
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
            <p class="bio">${member.bio}</p>
            <div class="social-links">
                ${member.social.linkedin ? `<a href="${member.social.linkedin}" aria-label="${member.name} LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
                ${member.social.twitter ? `<a href="${member.social.twitter}" aria-label="${member.name} Twitter"><i class="fab fa-twitter"></i></a>` : ''}
                ${member.social.github ? `<a href="${member.social.github}" aria-label="${member.name} GitHub"><i class="fab fa-github"></i></a>` : ''}
                ${member.social.behance ? `<a href="${member.social.behance}" aria-label="${member.name} Behance"><i class="fab fa-behance"></i></a>` : ''}
                ${member.social.instagram ? `<a href="${member.social.instagram}" aria-label="${member.name} Instagram"><i class="fab fa-instagram"></i></a>` : ''}
            </div>
        `;
        teamMembers.appendChild(memberEl);
    });

    function buildDots() {
        carouselDots.innerHTML = '';
        totalSlides = Math.ceil(teamData.length / cardsPerSlide);

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Show team slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }
    }

    function getSlideDistance() {
        const firstCard = teamMembers.children[0];
        if (!firstCard) return 0;
        const styles = window.getComputedStyle(teamMembers);
        const gap = parseFloat(styles.columnGap || styles.gap) || 0;
        return (firstCard.getBoundingClientRect().width + gap) * cardsPerSlide;
    }

    function updateControls() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= totalSlides - 1;
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
            dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
        });
    }

    function updateCarousel(animate = true) {
        currentSlide = Math.min(currentSlide, totalSlides - 1);
        currentSlide = Math.max(currentSlide, 0);

        const maxTranslateX = Math.max(0, teamMembers.scrollWidth - carousel.clientWidth);
        const translateX = Math.min(currentSlide * getSlideDistance(), maxTranslateX);
        teamMembers.style.transition = animate ? 'transform 0.5s ease' : 'none';
        teamMembers.style.transform = `translateX(-${translateX}px)`;
        updateControls();
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }

    function syncResponsiveCarousel() {
        const nextCardsPerSlide = getCardsPerSlide();
        if (nextCardsPerSlide !== cardsPerSlide) {
            const firstVisibleCard = currentSlide * cardsPerSlide;
            cardsPerSlide = nextCardsPerSlide;
            currentSlide = Math.floor(firstVisibleCard / cardsPerSlide);
        }
        totalSlides = Math.ceil(teamData.length / cardsPerSlide);
        buildDots();
        updateCarousel(false);
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    carousel.addEventListener('pointerdown', (event) => {
        if (!window.matchMedia('(max-width: 768px)').matches) return;
        isPointerDown = true;
        startX = event.clientX;
        currentX = event.clientX;
        teamMembers.style.transition = 'none';
    });

    carousel.addEventListener('pointermove', (event) => {
        if (!isPointerDown) return;
        currentX = event.clientX;
    });

    function finishSwipe() {
        if (!isPointerDown) return;
        const deltaX = currentX - startX;
        isPointerDown = false;

        if (Math.abs(deltaX) > 45) {
            goToSlide(currentSlide + (deltaX < 0 ? 1 : -1));
            return;
        }
        updateCarousel();
    }

    carousel.addEventListener('pointerup', finishSwipe);
    carousel.addEventListener('pointercancel', finishSwipe);
    carousel.addEventListener('pointerleave', finishSwipe);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncResponsiveCarousel, 160);
    });

    buildDots();
    updateCarousel(false);
}

// Stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const hasPlus = stat.textContent.includes('+');
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''), 10);
        const duration = 1500;
        const step = target / (duration / 16);

        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                stat.textContent = `${Math.floor(current)}${hasPlus ? '+' : ''}`;
                requestAnimationFrame(increment);
            } else {
                stat.textContent = `${target}${hasPlus ? '+' : ''}`;
            }
        };
        increment();
    });
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTeamCarousel();

    const stats = document.querySelector('.stats');
    if (!stats) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    observer.observe(stats);
});
