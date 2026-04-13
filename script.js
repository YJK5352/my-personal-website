// 深色/浅色模式切换功能
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme');

// 检查系统偏好设置
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 初始化主题
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
} else {
    // 如果没有保存的主题，使用系统偏好
    body.classList.toggle('dark-mode', prefersDarkScheme);
    updateThemeIcon(prefersDarkScheme);
}

// 主题切换按钮点击事件
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    updateThemeIcon(isDarkMode);
    // 保存主题设置到本地存储
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// 更新主题图标
function updateThemeIcon(isDarkMode) {
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 联系表单提交功能
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // 模拟表单提交
        setTimeout(() => {
            alert('感谢留言！我会尽快回复你。');
            contactForm.reset();
        }, 500);
    });
}

// 滚动动画功能
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// 初始加载时检查
window.addEventListener('load', handleScrollAnimation);
// 滚动时检查
window.addEventListener('scroll', handleScrollAnimation);