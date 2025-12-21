// ==================== Configuração de Segurança ====================
// Hash SHA-256 da sua senha (gerado de forma segura)
// Para gerar um novo hash, abra o console do navegador e digite:
// generatePasswordHash('SUA_SENHA_AQUI')

// Função para gerar hash SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Função auxiliar para gerar hash (usar no console do navegador)
async function generatePasswordHash(password) {
    const hash = await hashPassword(password);
    console.log('Hash da senha:', hash);
    console.log('Cole este hash no arquivo admin.js na variável ADMIN_PASSWORD_HASH');
    return hash;
}
// Para usar: abra o console e digite: generatePasswordHash('sua_senha_aqui')

// Tentar carregar `admin-config.json` local (ignorável pelo Git) e sobrescrever o hash
let ADMIN_PASSWORD_HASH = '851afe768087db95f380fcfa2ced7c13a152ec9aef486bd665b8f219b3fb2fd8'; // valor padrão (já configurado)
(async function loadAdminConfig(){
    try {
        const res = await fetch('admin-config.json');
        if (res.ok) {
            const cfg = await res.json();
            if (cfg.ADMIN_PASSWORD_HASH) {
                ADMIN_PASSWORD_HASH = cfg.ADMIN_PASSWORD_HASH;
                console.info('admin-config.json carregado — hash aplicado');
            }
        }
    } catch (err) {
        // não crítico — continuar com o hash embutido
    }
})();

// ==================== Autenticação ====================
const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');

// Verificar se já está logado
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
} else {
    loginScreen.style.display = 'flex';
}

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    const passwordHash = await hashPassword(password);
    
    if (passwordHash === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        loginError.textContent = '';
        document.getElementById('admin-password').value = '';
    } else {
        loginError.textContent = '❌ Senha incorreta!';
        setTimeout(() => loginError.textContent = '', 3000);
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
});

function showAdminPanel() {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    loadProjects();
    loadSkills();
}

// ==================== Sistema de Tabs ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Atualizar botões
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Atualizar conteúdo
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// ==================== CRUD de Projetos ====================
let projects = [];
let editingProjectIndex = null;

// Carregar projetos do localStorage ou do JSON
async function loadProjects() {
    const stored = localStorage.getItem('portfolio_projects');
    
    if (stored) {
        projects = JSON.parse(stored);
    } else {
        // Carregar do JSON original
        try {
            const res = await fetch('projects.json');
            if (res.ok) {
                projects = await res.json();
                saveProjects(); // Salvar no localStorage
            }
        } catch (err) {
            console.error('Erro ao carregar projetos:', err);
            projects = [];
        }
    }
    
    renderProjects();
}

function saveProjects() {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjects();
}

function renderProjects() {
    const container = document.getElementById('projects-list');
    
    if (projects.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum projeto cadastrado ainda.</p>';
        return;
    }
    
    container.innerHTML = projects.map((project, index) => `
        <div class="item-card">
            <div class="item-header">
                <h4>${project.title}</h4>
                <div class="item-actions">
                    <button onclick="editProject(${index})" class="btn-icon" title="Editar">✏️</button>
                    <button onclick="deleteProject(${index})" class="btn-icon" title="Excluir">🗑️</button>
                </div>
            </div>
            <p>${project.description}</p>
            <div class="item-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.url}" target="_blank" class="item-link">🔗 ${project.url}</a>
        </div>
    `).join('');
}

// Formulário de Projeto
const projectForm = document.getElementById('project-form');
const projectFormTitle = document.getElementById('project-form-title');
const cancelProjectBtn = document.getElementById('cancel-project');

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const project = {
        title: document.getElementById('project-title').value.trim(),
        description: document.getElementById('project-description').value.trim(),
        url: document.getElementById('project-url').value.trim(),
        image: document.getElementById('project-image').value.trim(),
        tags: document.getElementById('project-tags').value.split(',').map(t => t.trim()).filter(t => t)
    };
    
    if (editingProjectIndex !== null) {
        // Editar
        projects[editingProjectIndex] = project;
        editingProjectIndex = null;
        projectFormTitle.textContent = 'Adicionar Novo Projeto';
        cancelProjectBtn.style.display = 'none';
    } else {
        // Adicionar
        projects.push(project);
    }
    
    saveProjects();
    projectForm.reset();
    
    // Feedback visual
    showNotification('Projeto salvo com sucesso!', 'success');
});

cancelProjectBtn.addEventListener('click', () => {
    editingProjectIndex = null;
    projectForm.reset();
    projectFormTitle.textContent = 'Adicionar Novo Projeto';
    cancelProjectBtn.style.display = 'none';
});

function editProject(index) {
    const project = projects[index];
    editingProjectIndex = index;
    
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-url').value = project.url;
    document.getElementById('project-image').value = project.image;
    document.getElementById('project-tags').value = project.tags.join(', ');
    
    projectFormTitle.textContent = 'Editar Projeto';
    cancelProjectBtn.style.display = 'inline-block';
    
    // Scroll para o formulário
    projectForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteProject(index) {
    if (confirm(`Tem certeza que deseja excluir o projeto "${projects[index].title}"?`)) {
        projects.splice(index, 1);
        saveProjects();
        showNotification('Projeto excluído!', 'info');
    }
}

// ==================== CRUD de Habilidades ====================
let skills = [];
let editingSkillIndex = null;

// Carregar habilidades do localStorage ou criar padrão
async function loadSkills() {
    const stored = localStorage.getItem('portfolio_skills');
    
    if (stored) {
        skills = JSON.parse(stored);
    } else {
        // Criar habilidades padrão do HTML
        skills = [
            {
                category: "Java & Backend",
                items: [
                    "Java (Estudando)",
                    "Spring Boot (Aprendendo)",
                    "POO & Fundamentos",
                    "REST APIs"
                ]
            },
            {
                category: "Banco de Dados",
                items: [
                    "SQL (MySQL, PostgreSQL)",
                    "Modelagem de Dados",
                    "JDBC",
                    "Conceitos de Persistência"
                ]
            },
            {
                category: "Ferramentas & Práticas",
                items: [
                    "Git & GitHub",
                    "Maven/Gradle",
                    "IntelliJ IDEA / Eclipse",
                    "Lógica de Programação"
                ]
            }
        ];
        saveSkills();
    }
    
    renderSkills();
}

function saveSkills() {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
    renderSkills();
}

function renderSkills() {
    const container = document.getElementById('skills-list');
    
    if (skills.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhuma habilidade cadastrada ainda.</p>';
        return;
    }
    
    container.innerHTML = skills.map((skill, index) => `
        <div class="item-card">
            <div class="item-header">
                <h4>${skill.category}</h4>
                <div class="item-actions">
                    <button onclick="editSkill(${index})" class="btn-icon" title="Editar">✏️</button>
                    <button onclick="deleteSkill(${index})" class="btn-icon" title="Excluir">🗑️</button>
                </div>
            </div>
            <ul class="skill-items-list">
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Formulário de Habilidade
const skillForm = document.getElementById('skill-form');
const skillFormTitle = document.getElementById('skill-form-title');
const cancelSkillBtn = document.getElementById('cancel-skill');

skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const skill = {
        category: document.getElementById('skill-category').value.trim(),
        items: document.getElementById('skill-items').value
            .split('\n')
            .map(item => item.trim())
            .filter(item => item)
    };
    
    if (editingSkillIndex !== null) {
        // Editar
        skills[editingSkillIndex] = skill;
        editingSkillIndex = null;
        skillFormTitle.textContent = 'Adicionar Nova Categoria de Habilidade';
        cancelSkillBtn.style.display = 'none';
    } else {
        // Adicionar
        skills.push(skill);
    }
    
    saveSkills();
    skillForm.reset();
    
    showNotification('Habilidade salva com sucesso!', 'success');
});

cancelSkillBtn.addEventListener('click', () => {
    editingSkillIndex = null;
    skillForm.reset();
    skillFormTitle.textContent = 'Adicionar Nova Categoria de Habilidade';
    cancelSkillBtn.style.display = 'none';
});

function editSkill(index) {
    const skill = skills[index];
    editingSkillIndex = index;
    
    document.getElementById('skill-category').value = skill.category;
    document.getElementById('skill-items').value = skill.items.join('\n');
    
    skillFormTitle.textContent = 'Editar Habilidade';
    cancelSkillBtn.style.display = 'inline-block';
    
    // Scroll para o formulário
    skillForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteSkill(index) {
    if (confirm(`Tem certeza que deseja excluir a categoria "${skills[index].category}"?`)) {
        skills.splice(index, 1);
        saveSkills();
        showNotification('Habilidade excluída!', 'info');
    }
}

// ==================== Notificações ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
