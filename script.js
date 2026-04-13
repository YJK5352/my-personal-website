// ===== 页面加载动画 =====
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
});

// ===== 深色/浅色模式 =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(dark) {
  body.classList.toggle('dark-mode', dark);
  themeToggle.textContent = dark ? '☀️' : '🌙';
}

setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== 手机端菜单 =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // 点击链接后关闭菜单
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== 滚动渐显动画 (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== 作品模态框 =====
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');
const modalLink = document.getElementById('modalLink');
const closeModalBtn = document.querySelector('.close-modal');

const projectData = {
  '1': {
    title: '我的第一个AI个人网站',
    image: 'https://via.placeholder.com/680x300/6366f1/ffffff?text=个人网站',
    description: '这是我利用 AI 辅助开发的第一个个人网站。采用现代前端技术栈，实现了完美的响应式设计，支持深色/浅色模式切换。通过这个项目，我深入学习了 CSS 变量、Flexbox/Grid 布局以及现代 UI 设计原则。',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'AI Tools'],
    link: '#'
  },
  '2': {
    title: '待办事项小工具',
    image: 'https://via.placeholder.com/680x300/10a37f/ffffff?text=待办工具',
    description: '一个功能齐全的待办事项管理工具。支持任务的增删改查，集成了 LocalStorage 功能，确保数据在页面刷新后依然存在。界面设计简洁直观，极大提升了使用效率。',
    tech: ['JavaScript', 'LocalStorage', 'CSS Grid'],
    link: '#'
  },
  '3': {
    title: 'AI聊天助手演示',
    image: 'https://via.placeholder.com/680x300/f59e0b/ffffff?text=AI聊天',
    description: '展示 AI 聊天能力的交互式界面。模拟了真实聊天应用的体验，包括打字机效果、自动滚到底部以及流畅的动画转换。探索了如何构建更具人性化的 AI 交互体验。',
    tech: ['WebSockets', 'Animations', 'CSS'],
    link: '#'
  }
};

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;
  modalImage.src = data.image;
  modalImage.alt = data.title;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
  modalLink.href = data.link;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    if (card) openModal(card.dataset.project);
  });
});

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== 联系表单 =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      // 3秒后重置表单
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }, 4000);
    }, 1500);
  });
}
