// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.textContent = '☰';

        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Team data
const teamData = [
    { name: "Pankaj Mathur", role: "Founder & CEO", bio: "Multimedia and Animation", img: "../Assets/About Us Page/Pankaj.jpg", social: { instagram: "#", twitter: "#", linkedin: "#" } },
   
    { name: "Deepak Yadav", role: "Co-Founder & Manager", bio: "U.P Police", img: "../Assets/About Us Page/Deepak.jpeg", social: { instagram: "#", linkedin: "#", twitter: "#" } },
    { name: "Vinay Yadav", role: "SEO & Digital Marketing Specialist", bio: "Medical Field", img: "../Assets/About Us Page/Vinay.jpeg", social: { instagram: "#", linkedin: "#", github: "#" } },
    { name: "Yogesh Kumar Yadav", role: "UI/UX Designer Advisor", bio: "Tracks all govt jobs", img: "../Assets/About Us Page/Yogesh.jpg", social: { twitter: "https://x.com/YogeshKumarRao3", instagram: "https://www.instagram.com/yogeshkumar9342/", linkedin: "#" } },
    { name: "Dolly Mathur", role: "Content Writer / Editor", bio: "Expert for Content Advisory", img: "../Assets/About Us Page/Dolly.jpeg", social: { linkedin: "#", behance: "#" } },
    { name: "Dolly Mathur", role: "Content Writer / Editor", bio: "Expert for Content Advisory", img: "../Assets/About Us Page/Dolly.jpeg", social: { linkedin: "#", behance: "#" } },
    { name: "Akanksha Mathur", role: "Co-Founder & Manager", bio: "Blogger", img: "../Assets/About Us Page/Akanksha.jpg", social: { instagram: "#", linkedin: "#", twitter: "#" } },
    { name: "Satya Prakash", role: "Customer Support", bio: "User help and support", img: "../Assets/About Us Page/Deepak.jpeg", social: { linkedin: "#" } }
  
    
];

// Init Carousel
function initTeamCarousel() {
    const teamMembers = document.querySelector('.team-members');
    const carouselDots = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    const slidesToShow = 3;
    const totalSlides = Math.ceil(teamData.length / slidesToShow);

    teamMembers.innerHTML = '';
    carouselDots.innerHTML = '';

    teamData.forEach(member => {
        const memberEl = document.createElement('div');
        memberEl.className = 'team-member';
        memberEl.innerHTML = `
            <img src="${member.img}" alt="${member.name}" onerror="this.src='../Assets/Team/default.jpg'">
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
            <p class="bio">${member.bio}</p>
            <div class="social-links">
                ${member.social.linkedin ? `<a href="${member.social.linkedin}"><i class="fab fa-linkedin"></i></a>` : ''}
                ${member.social.twitter ? `<a href="${member.social.twitter}"><i class="fab fa-twitter"></i></a>` : ''}
                ${member.social.github ? `<a href="${member.social.github}"><i class="fab fa-github"></i></a>` : ''}
                ${member.social.behance ? `<a href="${member.social.behance}"><i class="fab fa-behance"></i></a>` : ''}
                ${member.social.instagram ? `<a href="${member.social.instagram}"><i class="fab fa-instagram"></i></a>` : ''}
                ${member.social.medium ? `<a href="${member.social.medium}"><i class="fab fa-medium"></i></a>` : ''}
            </div>
        `;
        teamMembers.appendChild(memberEl);
    });

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }

    function updateCarousel() {
        const containerWidth = document.querySelector('.team-carousel').offsetWidth;
        const totalWidth = teamMembers.scrollWidth;
        const maxTranslateX = totalWidth - containerWidth;
        const cardWidth = teamMembers.children[0].offsetWidth + 32;
        const translateX = Math.min(currentSlide * cardWidth * slidesToShow, maxTranslateX);

        teamMembers.style.transform = `translateX(-${translateX}px)`;

        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }

    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => updateCarousel(), 250);
    });

    const images = teamMembers.querySelectorAll('img');
    let loadedImages = 0;

    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) updateCarousel();
            });
        }
    });

    if (loadedImages === images.length) {
        updateCarousel();
    }
}

// Stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);

        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(increment);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        increment();
    });
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTeamCarousel();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.stats'));
});
