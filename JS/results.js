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

// Result Data
const resultsData = [
    {
        id: 8,
        title: "SSC CGL 2024 Final Result",
        department: "ssc",
        year: "2024",
        organization: "Staff Selection Commission",
        resultDate: "15-06-2024",
        examDate: "14-03-2024",
        qualification: "Bachelor's Degree",
        totalCandidates: "14582",
        resultLink: "https://ssc.gov.in/",
        detailsPage: "job-details.html?id=8",
    },
    {
        id: 7,
        title: "UPSC Civil Services 2023 Final Result",
        department: "upsc",
        year: "2023",
        organization: "Union Public Service Commission",
        resultDate: "16-05-2023",
        examDate: "05-06-2023",
        qualification: "Bachelor's Degree",
        totalCandidates: "1105",
        resultLink: "#",
        detailsPage: "job-details.html?id=7",
    },
    {
        id: 6,
        title: "IBPS PO XII Final Result 2023",
        department: "ibps",
        year: "2023",
        organization: "Institute of Banking Personnel Selection",
        resultDate: "01-12-2023",
        examDate: "21-10-2023",
        qualification: "Bachelor's Degree",
        totalCandidates: "6432",
        resultLink: "#",
        detailsPage: "job-details.html?id=6",
    },
    {
        id: 5,
        title: "UPSSSC PET 2023 Result",
        department: "upsssc",
        year: "2023",
        organization: "UP Subordinate Services Selection Commission",
        resultDate: "10-07-2023",
        examDate: "10-06-2023",
        qualification: "High School or Equivalent",
        totalCandidates: "20000+",
        resultLink: "#",
        detailsPage: "job-details.html?id=5",
    },
    {
        id: 4,
        title: "SSC GD Constable 2023 Final Result",
        department: "ssc",
        year: "2023",
        organization: "Staff Selection Commission",
        resultDate: "24-05-2023",
        examDate: "31-03-2023",
        qualification: "10th Pass",
        totalCandidates: "25000",
        resultLink: "#",
        detailsPage: "job-details.html?id=4",
    },
    {
        id: 3,
        title: "UPSC CDS I 2024 Result",
        department: "upsc",
        year: "2024",
        organization: "Union Public Service Commission",
        resultDate: "20-04-2024",
        examDate: "09-03-2024",
        qualification: "Bachelor's Degree",
        totalCandidates: "457",
        resultLink: "#",
        detailsPage: "job-details.html?id=3",
    },
    {
        id: 2,
        title: "UPPCS 2023 Prelims Result",
        department: "uppcs",
        year: "2023",
        organization: "Uttar Pradesh Public Service Commission",
        resultDate: "08-08-2023",
        examDate: "28-05-2023",
        qualification: "Bachelor's Degree",
        totalCandidates: "1000",
        resultLink: "#",
        detailsPage: "job-details.html?id=2",
    },
    {
        id: 1,
        title: "SSC CHSL 2023 Tier 2 Result",
        department: "ssc",
        year: "2023",
        organization: "Staff Selection Commission",
        resultDate: "01-09-2023",
        examDate: "28-07-2023",
        qualification: "12th Pass",
        totalCandidates: "5000",
        resultLink: "#",
        detailsPage: "job-details.html?id=1",
    },
    // Additional results
    {
        id: 9,
        title: "RBI Grade B 2024 Phase II Result",
        department: "rbi",
        year: "2024",
        organization: "Reserve Bank of India",
        resultDate: "25-07-2024",
        examDate: "15-06-2024",
        qualification: "Bachelor's Degree",
        totalCandidates: "850",
        resultLink: "#",
        detailsPage: "job-details.html?id=9",
    },
    {
        id: 10,
        title: "SSC JE 2024 Paper I Result",
        department: "ssc",
        year: "2024",
        organization: "Staff Selection Commission",
        resultDate: "10-08-2024",
        examDate: "20-06-2024",
        qualification: "Diploma in Engineering",
        totalCandidates: "3200",
        resultLink: "#",
        detailsPage: "job-details.html?id=10",
    },
    {
        id: 11,
        title: "IBPS Clerk 2024 Final Result",
        department: "ibps",
        year: "2024",
        organization: "Institute of Banking Personnel Selection",
        resultDate: "05-09-2024",
        examDate: "25-07-2024",
        qualification: "Bachelor's Degree",
        totalCandidates: "7800",
        resultLink: "#",
        detailsPage: "job-details.html?id=11",
    },
    {
        id: 12,
        title: "UPSC NDA 2024 Result",
        department: "upsc",
        year: "2024",
        organization: "Union Public Service Commission",
        resultDate: "15-09-2024",
        examDate: "10-08-2024",
        qualification: "12th Pass",
        totalCandidates: "6000",
        resultLink: "#",
        detailsPage: "job-details.html?id=12",
    }
];

// DOM Elements
const resultListings = document.getElementById('resultListings');
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
        filterResults();
    } else if (!searchTerm) {
        departmentSelect.value = 'all';
    }
});

// Handle Enter key in search
departmentSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        filterResults();
    }
});

// Render Results with ads
function renderResults(results) {
    if (results.length === 0) {
        resultListings.innerHTML = `
            <div class="no-results">
                <i class="fas fa-file-alt"></i>
                <h3>No Results Found</h3>
                <p>There are no results matching your filter criteria.</p>
            </div>
        `;
        return;
    }

    resultListings.innerHTML = results.map((result, index) => `
        <div class="result-card">
            <h3>${result.title}</h3>
            <p><strong>Organization:</strong> ${result.organization}</p>
            <div class="result-meta">
                <span><i class="fas fa-calendar-check"></i> Result Date: ${result.resultDate}</span>
                <span><i class="fas fa-calendar-alt"></i> Exam Date: ${result.examDate}</span>
                <span><i class="fas fa-user-graduate"></i> Qualification: ${result.qualification}</span>
                <span><i class="fas fa-users"></i> Total Candidates: ${result.totalCandidates}</span>
            </div>
            <p class="info-text"><i class="fas fa-info-circle"></i> For more details, click on "View Details" button</p>
            <div class="result-actions">
                <a href="${result.resultLink}" class="btn btn-primary">View Result</a>
                 ${result.detailsPage && result.detailsPage !== "#" ? `<a href="${result.detailsPage}" class="btn btn-outline">View Details</a>` : `<button class="btn btn-outline" disabled>Details Soon</button>`}
            </div>
        </div>
        
        <!-- Advertisement space after every 2nd result -->
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

// Filter Results
function filterResults() {
    const department = departmentSelect.value;
    const year = yearSelect.value;

    const filteredResults = resultsData.filter(result => {
        const deptMatch = department === 'all' || result.department === department;
        const yearMatch = year === 'all' || result.year === year;
        return deptMatch && yearMatch;
    });

    renderResults(filteredResults);
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
    renderResults(resultsData);
}

// Event Listeners
applyFilterBtn.addEventListener('click', filterResults);
resetFilterBtn.addEventListener('click', resetFilters);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderResults(resultsData);
});