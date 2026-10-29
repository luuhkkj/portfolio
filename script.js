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
/* Array com dados dos projetos */
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
    title: "Medusa",
    category: "Mobile",
    image: "images/medusa.png",
    shortDesc: "Aplicativo voltado ao planejamento de rotas mais seguras para mulheres.",
    fullDesc: "Projeto de aplicativo voltado à mobilidade e à segurança de mulheres. A proposta é apoiar o planejamento de trajetos com menor exposição a riscos, usando informações sobre o percurso para auxiliar a escolha de rotas. O objetivo é oferecer apoio à decisão, sem garantir a ausência de riscos no deslocamento.",
    techs: ["React Native", "Expo", "TypeScript"],
    link: null,
    repo: "https://github.com/luuhkkj/Medusa"
  },
  {
    id: 3,
    title: "Vértice",
    category: "Dados e Educação",
    image: "images/vertice.png",
    shortDesc: "Sistema voltado à identificação precoce de riscos de evasão e reprovação escolar.",
    fullDesc: "Projeto de sistema preditivo de risco de evasão e reprovação no Ensino Médio. A proposta é organizar indicadores como notas, frequência, histórico de reprovações, participação e entregas para apoiar professores e coordenação na identificação precoce de sinais de risco. O foco é subsidiar intervenções pedagógicas, sem substituir a avaliação dos educadores ou determinar automaticamente o futuro do estudante.",
    techs: ["Python", "Streamlit", "Pandas", "Plotly"],
    link: null,
    repo: "https://github.com/luuhkkj/Vertice"
  },
  {
    id: 4,
    title: "Eyesland",
    category: "Jogos",
    image: "images/eyesland.png",
    shortDesc: "Aventura 2D pirata com exploração, puzzles e terror psicológico.",
    fullDesc: "Jogo 2D de aventura, puzzles e terror psicológico com temática pirata. O jogador acompanha Flint na busca pelo segredo da Ilha que Respira. A jornada começa em uma taverna, com relatos sobre desaparecimentos e um antigo tesouro, e avança por cenários de exploração, enigmas e desafios de escape room que revelam os mistérios da ilha.",
    techs: ["Godot", "GDScript"],
    link: null,
    repo: "https://github.com/luuhkkj/Eyesland"
  }
];



/* Renderiza cards dos projetos dinamicamente */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(project => `
    <div
      class="project-card"
      role="button"
      tabindex="0"
      aria-label="Ver detalhes de ${project.title}"
      aria-haspopup="dialog"
      data-project-id="${project.id}"
    >
      <img
        src="${project.image}"
        alt="${project.title}"
        class="card-img"
        loading="lazy"
        decoding="async"
      >

      <div class="card-content">
        <span class="card-category">${project.category}</span>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.shortDesc}</p>

        <span class="card-link">
          Ver detalhes
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    const open = () => {
      openProjectModal(Number(card.dataset.projectId));
    };

    card.addEventListener('click', open);

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
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
    const modalRepo = document.getElementById('modal-repo');
    const modalTechs = document.getElementById('modal-techs');

    if (
      !modal ||
      !modalTitle ||
      !modalCategory ||
      !modalDesc ||
      !modalImg ||
      !modalLink ||
      !modalRepo ||
      !modalTechs
    ) {
      console.error('Elementos do modal não encontrados no DOM');
      return;
    }

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDesc.textContent = project.fullDesc;

    modalImg.src = project.image;
    modalImg.alt = `Imagem do projeto ${project.title}`;

    modalTechs.replaceChildren();

    project.techs.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      modalTechs.appendChild(tag);
    });

    const hasDemo =
      typeof project.link === 'string' &&
      project.link.trim() !== '' &&
      project.link.trim() !== '#';

    const hasRepo =
      typeof project.repo === 'string' &&
      project.repo.trim() !== '' &&
      project.repo.trim() !== '#';

    modalLink.hidden = !hasDemo;
    modalRepo.hidden = !hasRepo;

    if (hasDemo) {
      modalLink.href = project.link;
      modalLink.rel = 'noopener noreferrer';
    } else {
      modalLink.removeAttribute('href');
    }

    if (hasRepo) {
      modalRepo.href = project.repo;
      modalRepo.rel = 'noopener noreferrer';
    } else {
      modalRepo.removeAttribute('href');
    }

    modal.classList.toggle('repository-only', !hasDemo);
    modal.classList.add('active');

    document.body.style.overflow = 'hidden';
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

// ========== EFEITO DE DIGITAÇÃO ==========
function initTypingEffect() {
  const element = document.getElementById('typing-role');

  if (!element) {
    console.error('Não foi encontrado o elemento #typing-role.');
    return;
  }

  if (element.dataset.typingInitialized === 'true') return;
  element.dataset.typingInitialized = 'true';

  const roles = [
    "Estudante de Computação",
    "Desenvolvedor de Software",
    "Entusiasta de Dados e IA",
    "Cientista de Dados em Formação",
    "Desenvolvedor de Projetos"
  ];

  const typingSpeed = 85;
  const deletingSpeed = 40;
  const pauseAfterTyping = 1600;
  const pauseBeforeTyping = 300;

  const motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  // Mantém sua escolha atual de executar o efeito neste dispositivo.
  // Para respeitar a preferência de movimento reduzido, use false.
  const forceAnimationForTesting = true;

  let roleIndex = 0;
  let characterIndex = 0;
  let timerId;

  function typeNextCharacter() {
    element.classList.remove('is-paused');

    const text = roles[roleIndex];

    characterIndex++;
    element.textContent = text.slice(0, characterIndex);

    if (characterIndex < text.length) {
      timerId = window.setTimeout(
        typeNextCharacter,
        typingSpeed
      );
      return;
    }

    // Frase completa: começa a piscar durante a pausa.
    element.classList.add('is-paused');

    timerId = window.setTimeout(() => {
      // Antes de apagar: cursor volta a ficar fixo e visível.
      element.classList.remove('is-paused');
      deleteNextCharacter();
    }, pauseAfterTyping);
  }

  function deleteNextCharacter() {
    element.classList.remove('is-paused');

    const text = roles[roleIndex];

    characterIndex--;
    element.textContent = text.slice(0, characterIndex);

    if (characterIndex > 0) {
      timerId = window.setTimeout(
        deleteNextCharacter,
        deletingSpeed
      );
      return;
    }

    // Texto vazio: espera sem piscar e passa à próxima frase.
    roleIndex = (roleIndex + 1) % roles.length;

    timerId = window.setTimeout(
      typeNextCharacter,
      pauseBeforeTyping
    );
  }

  function start() {
    window.clearTimeout(timerId);
    element.classList.remove('is-paused');

    roleIndex = 0;
    characterIndex = 0;

    if (motionPreference.matches && !forceAnimationForTesting) {
      element.textContent = roles[0];
      return;
    }

    element.textContent = '';

    timerId = window.setTimeout(
      typeNextCharacter,
      pauseBeforeTyping
    );
  }

  if (typeof motionPreference.addEventListener === 'function') {
    motionPreference.addEventListener('change', start);
  }

  start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypingEffect);
} else {
  initTypingEffect();
}