# Portfólio — Claudiano Junior

Portfólio profissional online de Claudiano Junior, estudante de Ciência da Computação no CEUB, aprendendo Java e desenvolvimento backend.

## 🎯 Sobre

Este é meu portfólio pessoal, onde compartilho minha jornada de aprendizado em:
- Desenvolvimento Java e fundamentos de POO
- Spring Boot e APIs REST
- Banco de dados e SQL
- Boas práticas de programação

**Objetivo profissional**: Me especializar em Java e trabalhar como desenvolvedor em uma BigTech ou no setor bancário.

## 📁 Estrutura do Projeto

- `index.html` — Estrutura HTML semântica
- `styles.css` — Estilos responsivos e animações
- `main.js` — Lógica: menu, scroll suave, carregamento dinâmico de projetos e formulário
- `projects.json` — Projetos em Java e tecnologias relacionadas
- `favicon.svg` — Ícone do site
- `img/` — Pasta com imagens e recursos visuais

## 🚀 Como usar localmente

1. **Opção 1**: Abra o `index.html` diretamente no navegador

2. **Opção 2** (recomendado): Use um servidor local para evitar problemas com CORS ao carregar `projects.json`

```bash
# Com Python 3:
python3 -m http.server 8000

# Com Node.js (se tiver npx):
npx http-server

# Depois abra: http://localhost:8000
```

## ✏️ Personalizações

### Adicionar seus projetos reais

Edite o arquivo `projects.json`:

```json
{
  "title": "Nome do Projeto",
  "description": "Descrição curta",
  "tags": ["Java", "Spring Boot", "MySQL"],
  "url": "https://github.com/seu-usuario/projeto",
  "image": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
}
```

### Atualizar links sociais

Em `index.html`, procure pela seção de contato e atualize:
- LinkedIn: Adicione seu perfil do LinkedIn
- GitHub: Adicione seu perfil do GitHub

### Trocar cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}
```

## 📧 Formulário de Contato

O formulário atual faz validação no frontend. Para enviar emails de verdade, integre com:
- [Netlify Forms](https://www.netlify.com/products/forms/) (se hospedar na Netlify)
- [Formspree](https://formspree.io/)
- Sua própria API backend

## 🌐 Deploy

### GitHub Pages
1. Faça push do código para um repositório GitHub
2. Vá em Settings → Pages
3. Selecione a branch `main` e pasta `/root`
4. Seu site estará em `https://seu-usuario.github.io/nome-do-repo`

### Netlify
1. Arraste a pasta do projeto para [netlify.com/drop](https://app.netlify.com/drop)
2. Ou conecte seu repositório GitHub para deploy automático

## 🎓 Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+, Fetch API, Intersection Observer)

---

**Claudiano Junior**  
Estudante de Ciência da Computação | CEUB  
Aprendendo Java & Backend Development

