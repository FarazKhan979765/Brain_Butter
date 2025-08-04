// Paste all your JavaScript code from <script>...</script> here

// Page Management
let currentPage = 'home';

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
    window.scrollTo(0, 0);
    updateProgressBar();
    setTimeout(() => {
        animatePageContent();
    }, 100);
}

// Blog filtering
function filterBlogs(category) {
    const blogItems = document.querySelectorAll('.blog-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    blogItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'slideUp 0.5s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
    if (currentPage !== 'blog') {
        showPage('blog');
    }
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}

// Animate page content
function animatePageContent() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate');
        }, index * 100);
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    });
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Search functionality
function searchArticles() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const blogItems = document.querySelectorAll('.blog-item');
    blogItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const content = item.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    if (currentPage !== 'blog') {
        showPage('blog');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').className = 'fas fa-sun';
    }
    // Create particles
    createParticles();
    // Add scroll listener for progress bar
    window.addEventListener('scroll', updateProgressBar);
    // Search functionality
    document.getElementById('searchInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchArticles();
        }
    });
    document.querySelector('.search-btn').addEventListener('click', searchArticles);
    // Animate elements on page load
    setTimeout(animatePageContent, 500);
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.querySelector('.counter-number')) {
                    animateCounters();
                }
            }
        });
    });
    document.querySelectorAll('.fade-in-up, .stats-counter').forEach(el => {
        observer.observe(el);
    });
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // Add hover effects to cards
    document.querySelectorAll('.blog-card, .category-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    // Form submission
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
    // Newsletter subscription
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this.value) {
                    alert('Thank you for subscribing to BrainButter!');
                    this.value = '';
                }
            }
        });
    });
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});

// Advanced interactions

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && currentPage === 'home') {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic navbar background
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = document.body.classList.contains('dark-mode')
            ? 'rgba(26, 35, 126, 0.98)'
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = document.body.classList.contains('dark-mode')
            ? 'rgba(26, 35, 126, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add reading time calculation
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

// Easter egg: Konami code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right B A

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    if (konamiCode.join(',') === correctCode.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🧈 Brain butter mode activated! You found our secret!');
        }, 2000);
    }
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
        transform: scale(0.95);
    }
    .btn.loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        margin: auto;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}