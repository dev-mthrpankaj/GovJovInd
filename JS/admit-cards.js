// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Admit Card Data with Job Listings
const admitcardsData = [
    // Original admit cards
    {
        id: 8,
        title: "SSC CGL 2025 Admit Card",
        department: "ssc",
        year: "2025",
        organization: "Staff Selection Commission",
        examName: "Combined Graduate Level Examination",
        releaseDate: "15-07-2025",
        examDate: "10-08-2025",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 10,000",
        downloadLink: "#",
        detailsPage: "../Job_Details/HTML_JobDetails/job-details-1011.html"
    },
    {
        id: 7,
        title: "UPSC Civil Services 2024 Admit Card",
        department: "upsc",
        year: "2024",
        organization: "Union Public Service Commission",
        examName: "Civil Services Examination",
        releaseDate: "05-06-2024",
        examDate: "16-06-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 1,000",
        downloadLink: "#",
        detailsPage: "admitcard-details-7.html"
    },
    {
        id: 6,
        title: "IBPS PO 2024 Admit Card",
        department: "ibps",
        year: "2024",
        organization: "Institute of Banking Personnel Selection",
        examName: "Probationary Officer Examination",
        releaseDate: "10-05-2024",
        examDate: "25-05-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 5,000",
        downloadLink: "#",
        detailsPage: "admitcard-details-6.html"
    },
    {
        id: 5,
        title: "SSC CHSL 2024 Admit Card",
        department: "ssc",
        year: "2024",
        organization: "Staff Selection Commission",
        examName: "Combined Higher Secondary Level Examination",
        releaseDate: "01-04-2024",
        examDate: "15-04-2024",
        qualification: "12th Pass",
        totalPosts: "Approx 4,500",
        downloadLink: "#",
        detailsPage: "admitcard-details-5.html"
    },
    {
        id: 4,
        title: "UPSC CDS 2024 Admit Card",
        department: "upsc",
        year: "2024",
        organization: "Union Public Service Commission",
        examName: "Combined Defence Services Examination",
        releaseDate: "20-03-2024",
        examDate: "10-04-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 400",
        downloadLink: "#",
        detailsPage: "admitcard-details-4.html"
    },
    {
        id: 3,
        title: "RBI Grade B 2024 Admit Card",
        department: "rbi",
        year: "2024",
        organization: "Reserve Bank of India",
        examName: "Grade B Officer Examination",
        releaseDate: "15-02-2024",
        examDate: "05-03-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 200",
        downloadLink: "#",
        detailsPage: "admitcard-details-3.html"
    },
    {
        id: 2,
        title: "SSC JE 2024 Admit Card",
        department: "ssc",
        year: "2024",
        organization: "Staff Selection Commission",
        examName: "Junior Engineer Examination",
        releaseDate: "10-01-2024",
        examDate: "25-01-2024",
        qualification: "Diploma/Degree in Engineering",
        totalPosts: "Approx 1,200",
        downloadLink: "#",
        detailsPage: "admitcard-details-2.html"
    },
    {
        id: 1,
        title: "IBPS Clerk 2024 Admit Card",
        department: "ibps",
        year: "2024",
        organization: "Institute of Banking Personnel Selection",
        examName: "Clerical Cadre Examination",
        releaseDate: "05-01-2024",
        examDate: "20-01-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 6,000",
        downloadLink: "#",
        detailsPage: "admitcard-details-1.html"
    },
    

];

// DOM Elements
const admitcardListings = document.getElementById('admitcardListings');
const departmentSelect = document.getElementById('department');
const yearSelect = document.getElementById('year');
const applyFilterBtn = document.getElementById('applyFilter');
const resetFilterBtn = document.getElementById('resetFilter');
const departmentSearch = document.getElementById('departmentSearch');

// Enhanced Department Search Functionality
departmentSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const options = departmentSelect.options;
    let visibleOptions = 0;
    let lastVisibleOption = null;
    
    // Show/hide options based on search term
    for (let i = 1; i < options.length; i++) { // Skip first option (All Departments)
        const optionText = options[i].text.toLowerCase();
        if (!searchTerm || optionText.includes(searchTerm)) {
            options[i].style.display = 'block';
            visibleOptions++;
            lastVisibleOption = options[i];
        } else {
            options[i].style.display = 'none';
        }
    }
    
    // Auto-select if only one match found
    if (visibleOptions === 1 && lastVisibleOption) {
        departmentSelect.value = lastVisibleOption.value;
        filterAdmitCards();
    } else if (!searchTerm) {
        departmentSelect.value = 'all';
    }
});

// Handle Enter key in search
departmentSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        filterAdmitCards();
    }
});

// Render Admit Cards with ads
function renderAdmitCards(admitcards) {
    if (admitcards.length === 0) {
        admitcardListings.innerHTML = `
            <div class="no-admitcards">
                <i class="fas fa-file-alt"></i>
                <h3>No Admit Cards Found</h3>
                <p>There are no admit cards matching your filter criteria.</p>
            </div>
        `;
        return;
    }

    admitcardListings.innerHTML = admitcards.map((admitcard, index) => `
        <div class="admitcard-card">
            <h3>${admitcard.title}</h3>
            <p><strong>Organization:</strong> ${admitcard.organization}</p>
            <div class="admitcard-meta">
                <span><i class="fas fa-calendar-check"></i> Release Date: ${admitcard.releaseDate}</span>
                <span><i class="fas fa-calendar-alt"></i> Exam Date: ${admitcard.examDate}</span>
                ${admitcard.qualification ? `<span><i class="fas fa-user-graduate"></i> Qualification: ${admitcard.qualification}</span>` : ''}
                ${admitcard.totalPosts ? `<span><i class="fas fa-briefcase"></i> Total Posts: ${admitcard.totalPosts}</span>` : ''}
            </div>
            <p class="info-text"><i class="fas fa-info-circle"></i> ${admitcard.examDate === "Application Open" || admitcard.examDate === "Application Closed" ? "Apply for this job from the official website" : "Download your admit card from the official website"}</p>
            
            <div class="admitcard-actions">
                <a href="${admitcard.downloadLink}" class="btn btn-primary">${admitcard.examDate === "Application Open" ? "Apply Now" : admitcard.examDate === "Application Closed" ? "View Details" : "Download Now"}</a>
                <a href="${admitcard.detailsPage}" class="btn btn-outline">View Details</a>
            </div>
        </div>
        
        ${index % 2 === 1 ? `
        <div class="ad-space">
            <div class="ad-content">
                <p>Advertisement</p>
                <img src="../Assets/ads/sample-ad.jpg" alt="Advertisement" style="max-width: 100%; height: auto;">
            </div>
        </div>
        ` : ''}
    `).join('');
}

// Filter Admit Cards
function filterAdmitCards() {
    const department = departmentSelect.value;
    const year = yearSelect.value;

    const filteredAdmitCards = admitcardsData.filter(admitcard => {
        const deptMatch = department === 'all' || admitcard.department === department;
        const yearMatch = year === 'all' || admitcard.year === year;
        return deptMatch && yearMatch;
    });

    renderAdmitCards(filteredAdmitCards);
}

// Reset Filters
function resetFilters() {
    departmentSelect.value = 'all';
    yearSelect.value = 'all';
    departmentSearch.value = '';
    // Show all options when resetting
    const options = departmentSelect.options;
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = 'block';
    }
    renderAdmitCards(admitcardsData);
}

// Event Listeners
applyFilterBtn.addEventListener('click', filterAdmitCards);
resetFilterBtn.addEventListener('click', resetFilters);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderAdmitCards(admitcardsData);
});