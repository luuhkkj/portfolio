// ========== SCROLL SUAVE ==========
/* Adiciona scroll suave pra todos links de âncora (#section) */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; /* Ignora # vazio */
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});



// ========== HAMBURGER MENU ==========
/* Seleciona elementos do menu mobile */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const header = document.querySelector('header');


// Verificar se os elementos existem antes de usar
if (hamburger && navMenu && navLinks.length > 0) {
  // Abrir/Fechar Menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });


  // Fechar ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}



// ========== LÓGICA DE SCROLL DO HEADER ==========
/* Header some ao rolar pra baixo (hide on scroll) */
let lastScrollTop = 0;


window.addEventListener('scroll', function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;


  // Se o menu mobile estiver aberto, NÃO esconde o header
  if (navMenu && navMenu.classList.contains('active')) {
    lastScrollTop = scrollTop;
    return;
  }


  // Lógica: Se rolar para baixo > 50px, esconde
  if (header) {
    if (scrollTop > lastScrollTop && scrollTop > 50) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
  }


  lastScrollTop = scrollTop;
});



// ========== PROJETOS COM MODAL ==========
/* Array com dados dos projetos (fácil adicionar novos) */
const projects = [
  {
    id: 1,
    title: "Movie Recommender",
    category: "Data",
    image: "https://i.pinimg.com/564x/bb/38/5f/bb385fe35a98be5a571835a9216b2315.jpg",
    shortDesc: "Sistema de Recomendação de Filmes",
    fullDesc: "Movie Recommender: sistema interativo de recomendação de filmes com busca TF-IDF e collaborative filtering. Usa MovieLens 25M (62k filmes, 25M+ ratings) com widget Jupyter ao vivo. Python, Pandas, scikit-learn. ",
    techs: ["Python", "Pandas", "Jupyter", "scikit-learn"],
    link: "https://colab.research.google.com/drive/1QGqnJW7ULUGyzZJ28i6ge8nD7CSQki8j?usp=sharing",
    repo: "https://github.com/luuhkkj/Sistema-de-recomenda-o-de-filmes"
  },
  {
    id: 2,
    title: "Projeto 2",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    shortDesc: "Controle financeiro pessoal.",
    fullDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. App mobile com sincronização em tempo real.",
    techs: ["React Native", "Firebase"],
    link: "#",
    repo: "#"
  },
  {
    id: 3,
    title: "Projeto 3",
    category: "Data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    shortDesc: "Visualização de KPIs.",
    fullDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dashboard interativo para análise de dados.",
    techs: ["Python", "Pandas", "D3.js"],
    link: "#",
    repo: "#"
  }
];



/* Renderiza cards dos projetos dinamicamente */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;


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



/* Abre modal com detalhes do projeto */
function openProjectModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;


  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalImg = document.getElementById('modal-img');
  const modalLink = document.getElementById('modal-link');
  const modalTechs = document.getElementById('modal-techs');


  // Verificar se todos os elementos existem
  if (!modal || !modalTitle || !modalCategory || !modalDesc || !modalImg || !modalLink || !modalTechs) {
    console.error('Elementos do modal não encontrados no DOM');
    return;
  }


  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDesc.textContent = project.fullDesc;
  modalImg.src = project.image;
  modalLink.href = project.link;


  // Techs como tags
  modalTechs.innerHTML = project.techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('');


  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; /* Bloqueia scroll bg */


  modalLink.href = project.link;
  const modalRepo = document.getElementById('modal-repo');
  if (modalRepo && project.repo) {
    modalRepo.href = project.repo;  // ← Popula repo link
  }
}



/* Fecha modal */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}



// Inicializa projetos quando DOM carrega
document.addEventListener('DOMContentLoaded', renderProjects);



// Fecha modal clicando fora
document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (modal && e.target.id === 'project-modal') {
    closeProjectModal();
  }
});


// Fecha modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});
