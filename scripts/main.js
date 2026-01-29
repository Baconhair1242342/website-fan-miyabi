// scripts/main.js - ОБНОВЛЕННЫЙ
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Мияби загружен!');
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                const icon = document.querySelector('.menu-toggle i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Анимация для карточек
    document.querySelectorAll('.feature, .ability-card, .gallery-item').forEach(element => {
        observer.observe(element);
    });
    
    // Добавляем CSS для анимации
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .feature, .ability-card, .gallery-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .feature.animate-in, 
            .ability-card.animate-in, 
            .gallery-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Проверка активной страницы в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage === './' && currentPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});