class ThemeSwitcher {
    constructor() {
        this.themeSwitcher = document.getElementById('themeSwitcher');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.themeSwitcher.addEventListener('click', () => this.toggleTheme());
        
        // Обновляем текст кнопки
        this.updateButtonText();
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        this.updateButtonText();
        localStorage.setItem('theme', this.currentTheme);
    }
    
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
    }
    
    updateButtonText() {
        const icon = this.themeSwitcher.querySelector('.theme-switcher__icon');
        const text = this.themeSwitcher.querySelector('.theme-switcher__text');
        
        if (this.currentTheme === 'light') {
            icon.textContent = '🌙';
            text.textContent = 'Темная тема';
        } else {
            icon.textContent = '☀️';
            text.textContent = 'Светлая тема';
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});