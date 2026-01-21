// Scroll suave (mantém o seu)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// === PROJETOS COM MODAL ===
const projects = [
  {
    id: 1,
    title: "Projeto 1",
    category: "Fullstack",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    shortDesc: "Loja completa com pagamentos Stripe.",
    fullDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sistema e-commerce robusto com painel admin.",
    techs: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://google.com"
  },
  {
    id: 2,
    title: "Projeto 2",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    shortDesc: "Controle financeiro pessoal.",
    fullDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. App mobile com sincronização em tempo real.",
    techs: ["React Native", "Firebase"],
    link: "#"
  },
  {
    id: 3,
    title: "Projeto 3",
    category: "Data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    shortDesc: "Visualização de KPIs.",
    fullDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dashboard interativo para análise de dados.",
    techs: ["Python", "Pandas", "D3.js"],
    link: "#"
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(project => `
    <div class="project-card" onclick="openProjectModal(${project.id})">
      <img src="${project.image}" alt="${project.title}" class="card-img">
      <div class="card-content">
        <span class="card-category">${project.category}</span>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.shortDesc}</p>
        <span class="card-link">
          Ver detalhes <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    </div>
  `).join('');
}

function openProjectModal(id) {
  const project = projects.find(p => p.id === id);
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-category').textContent = project.category;
  document.getElementById('modal-desc').textContent = project.fullDesc;
  document.getElementById('modal-img').src = project.image;
  document.getElementById('modal-link').href = project.link;
  
  // Techs
  const techs = document.getElementById('modal-techs');
  techs.innerHTML = project.techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
  
  document.getElementById('project-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Inicializa projetos
renderProjects();

// Eventos do modal
document.getElementById('project-modal').addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

/* Lógica para esconder o menu ao rolar a tela */
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Se rolar para baixo e já tiver passado de 50px do topo
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Esconde o header (puxa ele para cima)
        header.style.transform = "translateY(-100%)";
    } else {
        // Se rolar para cima, mostra o header
        header.style.transform = "translateY(0)";
    }
    
    lastScrollTop = scrollTop;
});