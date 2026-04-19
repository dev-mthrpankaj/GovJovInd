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

// Job Data with starting dates
const jobsData = [
    {
        id: 1011,
        title: "U.P Police Sub Inspector Online Form 2025",
        department: "upprpb",
        year: "2025",
        organization: "Uttar Pradesh Police Recruitment and Promotion Board",
        startingDate: "12-08-2025",
        lastDate: "11-09-2025",
        qualification: "Bachelor's Degree",
        totalPosts: "4543",
        applyLink: "https://www.upprpb.in/#/auth/landing",
        detailsPage: "../Job_Details/HTML_JobDetails/job-details-1011.html"
    },
    {
        id: 1012,
        title: "Bihar SSC Office Attendant 2025",
        department: "bssc",
        year: "2025",
        organization: "Bihar Staff Selection Commission",
        startingDate: "25-08-2025",
        lastDate: "26-09-2025",
        qualification: "High School or Equivalent",
        totalPosts: "3727",
        applyLink: "https://www.onlinebssc.com/officeattendantspecial/",
        detailsPage: "job-details-1012.html"
    },
    {
        id: 1013,
        title: "Bihar BSSC 4th Graduate Level 2025",
        department: "bssc",
        year: "2025",
        organization: "Bihar Staff Selection Commission",
        startingDate: "25-08-2025",
        lastDate: "26-09-2025",
        qualification: "Bachelor's Degree",
        totalPosts: "1481",
        applyLink: "https://www.onlinebssc.com/4thgralevel/",
        detailsPage: "job-details-1013.html"
    },
    {
        id: 1014,
        title: "BSF Head Constable Radio 2025",
        department: "bsf",
        year: "2023",
        organization: "Border Security Force",
        startingDate: "24-08-2025",
        lastDate: "23-09-2025",
        qualification: "Intermediate with Science",
        totalPosts: "1121",
        applyLink: "https://rectt.bsf.gov.in/auth/login",
        detailsPage: "job-details-1014.html"
    },
    {
        id: 1015,
        title: "Bihar SHS Lab Technician Online Form 2025",
        department: "bshs",
        year: "2023",
        organization: "Bihar State Health Society",
        startingDate: "01-09-2025",
        lastDate: "12-09-2025",
        qualification: "10+2 or above",
        totalPosts: "1075",
        applyLink: "#",
        detailsPage: "job-details-1015.html"
    },
    {
        id: 1016,
        title: "MHA IB Junior Intelligence Officer JIO Online Form 2025",
        department: "mhaib",
        year: "2025",
        organization: "Ministry of Home Affairs (IB)",
        startingDate: "23-08-2025",
        lastDate: "14-09-2025",
        qualification: "Graduate",
        totalPosts: "394",
        applyLink: "https://cdn.digialm.com/EForms/configuredHtml/1258/94260/Index.html",
        detailsPage: "job-details-1016.html"
    },
    {
        id: 1017,
        title: "IBPS Clerk 15th Online Form 2025",
        department: "ibps",
        year: "2025",
        organization: "Institute of Banking Personnel Selection",
        startingDate: "20-08-2025",
        lastDate: "28-09-2025",
        qualification: "Bachelor's Degree",
        totalPosts: "10277",
        applyLink: "https://www.ibps.in/",
        detailsPage: "job-details-1017.html"
    },
    {
        id: 1018,
        title: "DSSSB Delhi High Court Court Attendant Online Form 2025",
        department: "dsssb",
        year: "2025",
        organization: "Delhi Subordinate Services Selection Board",
        startingDate: "26-08-2025",
        lastDate: "24-09-2025",
        qualification: "high School or Equivalent",
        totalPosts: "334",
        applyLink: "https://dsssbonline.nic.in/",
        detailsPage: "job-details-1018.html"
    }
];

// DOM Elements
const jobListings = document.getElementById('jobListings');
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
        filterJobs();
    } else if (!searchTerm) {
        departmentSelect.value = 'all';
    }
});

// Handle Enter key in search
departmentSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        filterJobs();
    }
});

// Render Jobs with starting dates and ads
function renderJobs(jobs) {
    if (jobs.length === 0) {
        jobListings.innerHTML = `
            <div class="no-jobs">
                <i class="fas fa-briefcase"></i>
                <h3>No Jobs Found</h3>
                <p>There are no jobs matching your filter criteria.</p>
            </div>
        `;
        return;
    }

    jobListings.innerHTML = jobs.map((job, index) => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p><strong>Organization:</strong> ${job.organization}</p>
            <div class="job-meta">
                <span><i class="fas fa-calendar-check"></i> Starting Date: ${job.startingDate}</span>
                <span><i class="fas fa-calendar-alt"></i> Last Date: ${job.lastDate}</span>
                <span><i class="fas fa-user-graduate"></i> Qualification: ${job.qualification}</span>
                <span><i class="fas fa-briefcase"></i> Total Posts: ${job.totalPosts}</span>
            </div>
            <p class="info-text"><i class="fas fa-info-circle"></i> For more information, click on "View Details" button</p>
            <div class="job-actions">
                <a href="${job.applyLink}" class="btn btn-primary">Apply Now</a>
                <a href="../HTML/${job.detailsPage}" class="btn btn-outline">View Details</a>
            </div>
        </div>
        
        <!-- Advertisement space after every 2nd job -->
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

// Filter Jobs
function filterJobs() {
    const department = departmentSelect.value;
    const year = yearSelect.value;

    const filteredJobs = jobsData.filter(job => {
        const deptMatch = department === 'all' || job.department === department;
        const yearMatch = year === 'all' || job.year === year;
        return deptMatch && yearMatch;
    });

    renderJobs(filteredJobs);
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
    renderJobs(jobsData);
}

// Event Listeners
applyFilterBtn.addEventListener('click', filterJobs);
resetFilterBtn.addEventListener('click', resetFilters);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderJobs(jobsData);
});