// Theme Toggle
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        // Get theme from data attribute set by inline script
        this.currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.init();
    }

    init() {
        // Theme is already set by inline script, just update the icon
        this.updateToggleIcon();
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Enable transitions after page load
        window.addEventListener('load', () => {
            document.body.classList.add('theme-initialized');
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        this.updateToggleIcon();
        localStorage.setItem('theme', this.currentTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateToggleIcon() {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
}

// Mobile Navigation
class Navigation {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.init();
    }

    init() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }
}

// Project Filtering
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.filterProjects(e));
        });
    }

    filterProjects(e) {
        const filter = e.target.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter projects
        this.projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Form Validation
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
        }
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');

        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'Это поле обязательно для заполнения');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Введите корректный email адрес');
                return false;
            }
        }

        this.clearError(field);
        return true;
    }

    showError(field, message) {
        const errorElement = document.getElementById(field.id + 'Error');
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearError(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        field.classList.remove('error');
        errorElement.style.display = 'none';
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm();
        }
    }

    submitForm() {
        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
            this.form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// Animation on Scroll
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .course-card, .timeline-item');
        elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Progress Bar Animation
class ProgressAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.animateProgressBars();
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new Navigation();
    new ProjectFilter();
    new ContactForm();
    new ScrollAnimations();
    new ProgressAnimator();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .skill-card,
    .project-card,
    .course-card,
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .progress-fill {
        transition: width 1s ease-in-out;
    }
    
    .form-input.error {
        border-color: #ef4444;
    }
`;
document.head.appendChild(style);