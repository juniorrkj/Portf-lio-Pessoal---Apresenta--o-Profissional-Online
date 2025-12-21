// ==================== Seletores seguros ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// ==================== Dark Mode Toggle ====================
// Verificar preferência salva
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
        
        // Salvar preferência
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ==================== Menu Hamburger ====================

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fechar menu quando clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ==================== Scroll Suave ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // somente links internos
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ==================== Ativar Link da Nav ao Scrollar ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Animação ao Aparecer (Intersection Observer) ====================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Estilos para animações e active link
const style = document.createElement('style');
style.textContent = `
    .projeto-card,
    .habilidade-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// ==================== Carregar projetos dinamicamente ====================
async function loadProjects() {
    const container = document.getElementById('projetos-list');
    if (!container) return;

    try {
<<<<<<< HEAD
        const res = await fetch('projects.json');
        if (!res.ok) throw new Error('Falha ao carregar projects.json');
        const projects = await res.json();
=======
        let projects = [];
        
        // Tentar carregar do localStorage (gerenciado pelo admin)
        const storedProjects = localStorage.getItem('portfolio_projects');
        
        if (storedProjects) {
            projects = JSON.parse(storedProjects);
        try {
            let projects = [];

            // Tentar carregar do localStorage (gerenciado pelo admin)
            const storedProjects = localStorage.getItem('portfolio_projects');

            if (storedProjects) {
                projects = JSON.parse(storedProjects);
            } else {
                // Carregar do JSON original se não houver no localStorage
                const res = await fetch('projects.json');
                if (!res.ok) throw new Error('Falha ao carregar projects.json');
                projects = await res.json();
            }
                    <a href="${p.url || '#'}" class="btn btn-secondary" target="_blank" rel="noopener">Ver Projeto</a>
                </div>
            `;

            container.appendChild(card);
            observer.observe(card);
        });
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p>Não foi possível carregar os projetos no momento.</p>';
    }
}

// ==================== Carregar habilidades dinamicamente ====================
async function loadSkills() {
    const container = document.querySelector('.habilidades-grid');
    if (!container) return;

    try {
        let skills = [];

        // Tentar carregar do localStorage (gerenciado pelo admin)
        const storedSkills = localStorage.getItem('portfolio_skills');

        if (storedSkills) {
            skills = JSON.parse(storedSkills);
        } else {
            // Carregar do JSON original se não houver no localStorage
            const res = await fetch('skills.json');
            if (res.ok) {
                skills = await res.json();
            }
        }

        if (skills.length > 0) {
            // Limpar container e adicionar habilidades
            container.innerHTML = '';

            skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.className = 'habilidade-item';
                skillItem.innerHTML = `
                    <h3>${skill.category}</h3>
                    <ul>
                        ${skill.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
                container.appendChild(skillItem);
                observer.observe(skillItem);
            });
        }
    } catch (err) {
        console.error('Erro ao carregar habilidades:', err);
    }
}
// ==================== Formulário de Contato ====================
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            feedback.textContent = 'Por favor, preencha todos os campos.';
            feedback.style.color = '#ffdddd';
            return;
        }

        // validação simples de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedback.textContent = 'Por favor, insira um email válido.';
            feedback.style.color = '#ffdddd';
            return;
        }

        // Simular envio (aqui você pode integrar com API ou Netlify Forms)
        feedback.textContent = 'Enviando...';
        feedback.style.color = '#fff';

        setTimeout(() => {
            feedback.textContent = 'Mensagem enviada com sucesso! Obrigado.';
            feedback.style.color = '#cde7d9';
            form.reset();
        }, 900);
    });
}

// ==================== Carregamento da Página ====================
window.addEventListener('load', () => {
    console.log('Portfólio carregado com sucesso!');
    // Animar hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle) heroTitle.style.animation = 'slideDown 0.8s ease forwards';
    if (heroSubtitle) heroSubtitle.style.animation = 'slideDown 0.8s ease 0.2s forwards';

    loadProjects();
<<<<<<< HEAD
    setupContactForm();
    initCarousel();
    // observar items de habilidades
    document.querySelectorAll('.habilidade-item').forEach(item => observer.observe(item));
=======
    loadSkills();
    setupContactForm();
    initCarousel();
>>>>>>> bc169cb (Initial commit: add admin panel and config example)
});

// ==================== Carrossel de Fotos ====================
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Criar dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (opcional - a cada 5 segundos)
    setInterval(nextSlide, 5000);
}

// ==================== Animações Keyframes ====================
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(animationStyle);
