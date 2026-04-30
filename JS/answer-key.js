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

// Answer Key Data
const answerKeysData = [
    {
        id: 8,
        title: "SSC CGL 2024 Tier 1 Answer Key",
        department: "ssc",
        year: "2024",
        organization: "Staff Selection Commission",
        releaseDate: "15-07-2024",
        examDate: "14-06-2024",
        objectionLastDate: "20-07-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 10,000",
        downloadLink: "https://ssc.gov.in/",
        detailsPage: "job-details.html?id=8",
    },
    {
        id: 7,
        title: "UPSC Civil Services 2023 Prelims Answer Key",
        department: "upsc",
        year: "2023",
        organization: "Union Public Service Commission",
        releaseDate: "16-06-2023",
        examDate: "05-06-2023",
        objectionLastDate: "20-06-2023",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 1,100",
        downloadLink: "#",
        detailsPage: "job-details.html?id=7",
    },
    {
        id: 6,
        title: "IBPS PO XII Prelims Answer Key 2023",
        department: "ibps",
        year: "2023",
        organization: "Institute of Banking Personnel Selection",
        releaseDate: "01-11-2023",
        examDate: "21-10-2023",
        objectionLastDate: "05-11-2023",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 5,000",
        downloadLink: "#",
        detailsPage: "job-details.html?id=6",
    },
    {
        id: 5,
        title: "UPSSSC PET 2023 Answer Key",
        department: "upsssc",
        year: "2023",
        organization: "UP Subordinate Services Selection Commission",
        releaseDate: "10-07-2023",
        examDate: "10-06-2023",
        objectionLastDate: "15-07-2023",
        qualification: "High School or Equivalent",
        totalPosts: "Various Posts",
        downloadLink: "#",
        detailsPage: "job-details.html?id=5",
    },
    {
        id: 4,
        title: "SSC GD Constable 2023 Answer Key",
        department: "ssc",
        year: "2023",
        organization: "Staff Selection Commission",
        releaseDate: "24-04-2023",
        examDate: "31-03-2023",
        objectionLastDate: "30-04-2023",
        qualification: "10th Pass",
        totalPosts: "Approx 25,000",
        downloadLink: "#",
        detailsPage: "job-details.html?id=4",
    },
    {
        id: 3,
        title: "UPSC CDS I 2024 Answer Key",
        department: "upsc",
        year: "2024",
        organization: "Union Public Service Commission",
        releaseDate: "20-03-2024",
        examDate: "09-03-2024",
        objectionLastDate: "25-03-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 350",
        downloadLink: "#",
        detailsPage: "job-details.html?id=3",
    },
    {
        id: 2,
        title: "UPPCS 2023 Prelims Answer Key",
        department: "uppcs",
        year: "2023",
        organization: "Uttar Pradesh Public Service Commission",
        releaseDate: "08-06-2023",
        examDate: "28-05-2023",
        objectionLastDate: "15-06-2023",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 1,000",
        downloadLink: "#",
        detailsPage: "job-details.html?id=2",
    },
    {
        id: 1,
        title: "SSC CHSL 2023 Tier 1 Answer Key",
        department: "ssc",
        year: "2023",
        organization: "Staff Selection Commission",
        releaseDate: "01-08-2023",
        examDate: "28-07-2023",
        objectionLastDate: "05-08-2023",
        qualification: "12th Pass",
        totalPosts: "Approx 5,000",
        downloadLink: "#",
        detailsPage: "job-details.html?id=1",
    },
    // Additional answer keys
    {
        id: 9,
        title: "RBI Grade B 2024 Phase I Answer Key",
        department: "rbi",
        year: "2024",
        organization: "Reserve Bank of India",
        releaseDate: "25-07-2024",
        examDate: "15-06-2024",
        objectionLastDate: "30-07-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 200",
        downloadLink: "#",
        detailsPage: "job-details.html?id=9",
    },
    {
        id: 10,
        title: "SSC JE 2024 Paper I Answer Key",
        department: "ssc",
        year: "2024",
        organization: "Staff Selection Commission",
        releaseDate: "10-08-2024",
        examDate: "20-06-2024",
        objectionLastDate: "15-08-2024",
        qualification: "Diploma in Engineering",
        totalPosts: "Approx 1,200",
        downloadLink: "#",
        detailsPage: "job-details.html?id=10",
    },
    {
        id: 11,
        title: "IBPS Clerk 2024 Prelims Answer Key",
        department: "ibps",
        year: "2024",
        organization: "Institute of Banking Personnel Selection",
        releaseDate: "05-09-2024",
        examDate: "25-07-2024",
        objectionLastDate: "10-09-2024",
        qualification: "Bachelor's Degree",
        totalPosts: "Approx 6,000",
        downloadLink: "#",
        detailsPage: "job-details.html?id=11",
    },
    {
        id: 12,
        title: "UPSC NDA 2024 Answer Key",
        department: "upsc",
        year: "2024",
        organization: "Union Public Service Commission",
        releaseDate: "15-09-2024",
        examDate: "10-08-2024",
        objectionLastDate: "20-09-2024",
        qualification: "12th Pass",
        totalPosts: "Approx 400",
        downloadLink: "#",
        detailsPage: "job-details.html?id=12",
    }
];

// DOM Elements
const answerKeyListings = document.getElementById('answerKeyListings');
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
        filterAnswerKeys();
    } else if (!searchTerm) {
        departmentSelect.value = 'all';
    }
});

// Handle Enter key in search
departmentSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        filterAnswerKeys();
    }
});

// Render Answer Keys with ads
function renderAnswerKeys(answerKeys) {
    if (answerKeys.length === 0) {
        answerKeyListings.innerHTML = `
            <div class="no-answer-keys">
                <i class="fas fa-key"></i>
                <h3>No Answer Keys Found</h3>
                <p>There are no answer keys matching your filter criteria.</p>
            </div>
        `;
        return;
    }

    answerKeyListings.innerHTML = answerKeys.map((answerKey, index) => `
        <div class="answer-key-card">
            <h3>${answerKey.title}</h3>
            <p><strong>Organization:</strong> ${answerKey.organization}</p>
            <div class="answer-key-meta">
                <span><i class="fas fa-calendar-check"></i> Release Date: ${answerKey.releaseDate}</span>
                <span><i class="fas fa-calendar-alt"></i> Exam Date: ${answerKey.examDate}</span>
                <span><i class="fas fa-user-graduate"></i> Qualification: ${answerKey.qualification}</span>
                <span><i class="fas fa-exclamation-circle"></i> Objection Last Date: ${answerKey.objectionLastDate}</span>
                <span><i class="fas fa-briefcase"></i> Total Posts: ${answerKey.totalPosts}</span>
            </div>
            <p class="info-text"><i class="fas fa-info-circle"></i> For more details, click on "View Details" button</p>
            <div class="answer-key-actions">
                <a href="${answerKey.downloadLink}" class="btn btn-primary">Download Answer Key</a>
                ${answerKey.detailsPage && answerKey.detailsPage !== "#" ? `<a href="${answerKey.detailsPage}" class="btn btn-outline">View Details</a>` : `<button class="btn btn-outline" disabled>Details Soon</button>`}
            </div>
        </div>
        
        <!-- Advertisement space after every 2nd answer key -->
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

// Filter Answer Keys
function filterAnswerKeys() {
    const department = departmentSelect.value;
    const year = yearSelect.value;

    const filteredAnswerKeys = answerKeysData.filter(answerKey => {
        const deptMatch = department === 'all' || answerKey.department === department;
        const yearMatch = year === 'all' || answerKey.year === year;
        return deptMatch && yearMatch;
    });

    renderAnswerKeys(filteredAnswerKeys);
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
    renderAnswerKeys(answerKeysData);
}

// Event Listeners
applyFilterBtn.addEventListener('click', filterAnswerKeys);
resetFilterBtn.addEventListener('click', resetFilters);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderAnswerKeys(answerKeysData);
});