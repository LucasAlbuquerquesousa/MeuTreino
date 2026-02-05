// ============================================
// CREDENCIAIS VÁLIDAS
// ============================================

const VALID_CREDENTIALS = {
    email: 'usuario@teste.com',
    password: 'teste12345'
};

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);

    // Configurar navegação do menu
    setupMenuNavigation();

    // Carregar treinos
    loadWorkouts();

    // Verificar sessão anterior
    checkSession();

    // Inicializar interações dos day-cards
    initializeDayCards();
});

// ============================================
// AUTENTICAÇÃO
// ============================================

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Limpar mensagem de erro anterior
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validar credenciais
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        // Credenciais corretas
        saveSession(email);
        showDashboard();
    } else {
        // Credenciais incorretas
        showError('Email ou senha incorretos. Tente novamente.');
        // Limpar campos
        document.getElementById('password').value = '';
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// ============================================
// GERENCIAMENTO DE SESSÃO
// ============================================

function saveSession(email) {
    localStorage.setItem('meeuTreino_user', JSON.stringify({
        email: email,
        timestamp: new Date().getTime()
    }));
}

function checkSession() {
    const userSession = localStorage.getItem('meeuTreino_user');
    if (userSession) {
        showDashboard();
    }
}

function logout() {
    localStorage.removeItem('meeuTreino_user');
    location.reload();
}

// ============================================
// EXIBIÇÃO DO DASHBOARD
// ============================================

function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'grid';
    // Ativar seção padrão
    activateSection('meuPlano');
}

// ============================================
// NAVEGAÇÃO DO MENU
// ============================================

function setupMenuNavigation() {
    // Menu items normais (não o "Mais")
    const menuItems = document.querySelectorAll('.menu-item:not(.menu-mais):not(.submenu-item)');
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                activateSection(section);
            }
        });
    });

    // Menu "Mais" para expandir/retrair submenu
    const maisMenu = document.querySelector('.menu-mais');
    if (maisMenu) {
        maisMenu.addEventListener('click', function (e) {
            e.preventDefault();
            toggleSubmenu();
        });
    }

    // Items do submenu
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                activateSection(section);
                // Fechar submenu após clicar
                closeSubmenu();
            }
        });
    });
}

function activateSection(sectionName) {
    // Desativar todos os menu items
    const allMenuItems = document.querySelectorAll('.menu-item:not(.submenu-item)');
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Ativar o menu item correto
    const activeMenuItem = document.querySelector(
        `.menu-item[data-section="${sectionName}"], .submenu-item[data-section="${sectionName}"]`
    );
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }

    // Desativar todas as seções
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Ativar a seção selecionada
    const activeSection = document.getElementById(`${sectionName}-section`);
    if (activeSection) {
        activeSection.classList.add('active');
        
        // Se for a seção de treinos, garantir que os cards estão carregados
        if (sectionName === 'treinos') {
            loadWorkouts();
        }
    }

    // Fechar submenu se não for submenu
    if (sectionName !== 'refeicoes' && sectionName !== 'desafios') {
        closeSubmenu();
    }
}

function toggleSubmenu() {
    const submenu = document.getElementById('submenu');
    const maisMenu = document.querySelector('.menu-mais');

    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'flex';
        maisMenu.classList.add('active');
    } else {
        closeSubmenu();
    }
}

function closeSubmenu() {
    const submenu = document.getElementById('submenu');
    const maisMenu = document.querySelector('.menu-mais');
    submenu.style.display = 'none';
    maisMenu.classList.remove('active');
}

// ============================================
// RESPONSIVIDADE MOBILE
// ============================================

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.add('active');
    overlay.classList.add('active');
    
    // Prevenir scroll do body quando menu está aberto
    document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Fechar sidebar ao clicar no overlay
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileSidebar);
    }
});

function toggleSubmenuMobile(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleSubmenu();
}

// ============================================
// TREINOS
// ============================================

const workoutsData = [
    {
        title: 'Treino de Calistenia',
        count: 28,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=375&fit=crop'
    },
    {
        title: 'Calistenia com Equipamento',
        count: 28,
        image: 'https://images.unsplash.com/photo-1552158473-41b8b4067cdc?w=600&h=375&fit=crop'
    },
    {
        title: 'Ginásio',
        count: 28,
        image: 'https://images.unsplash.com/photo-1534367789618-91f5c9cdc9c9?w=600&h=375&fit=crop'
    },
    {
        title: 'Programa de Abdominais',
        count: 12,
        image: 'https://images.unsplash.com/photo-1579758629938-03607ccf1b91?w=600&h=375&fit=crop'
    },
    {
        title: 'Treinos Micro',
        count: 28,
        image: 'https://images.unsplash.com/photo-1540497905925-c6a59fc8ab4d?w=600&h=375&fit=crop'
    },
    {
        title: 'Plano de Pilates na Parede',
        count: 28,
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=375&fit=crop'
    },
    {
        title: 'Pilates em Casa',
        count: 28,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=375&fit=crop'
    },
    {
        title: 'Plano de Treinos de Pilates na Cadeira',
        count: 28,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=375&fit=crop'
    },
    {
        title: 'Fitness em Casa',
        count: 83,
        image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=600&h=375&fit=crop'
    },
    {
        title: 'Boxe',
        count: 15,
        image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&h=375&fit=crop'
    },
    {
        title: 'Alongamento',
        count: 17,
        image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=375&fit=crop'
    },
    {
        title: 'Ioga na Cadeira',
        count: 14,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=375&fit=crop'
    },
    {
        title: 'Caminhada Interior',
        count: 15,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=375&fit=crop'
    },
    {
        title: 'Corrida',
        count: 23,
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=375&fit=crop'
    },
    {
        title: 'Treinos Kegel',
        count: 7,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=375&fit=crop'
    }
];

function loadWorkouts() {
    const container = document.getElementById('workoutsGrid');
    if (!container) {
        console.error('Container workoutsGrid não encontrado');
        return;
    }

    container.innerHTML = workoutsData.map((workout, index) => `
        <div class="workout-card" data-index="${index}">
            <div class="workout-card-image">
                <img src="${workout.image}" alt="${workout.title}" loading="lazy">
            </div>
            <div class="workout-card-content">
                <h3 class="workout-card-title">${workout.title}</h3>
                <p class="workout-card-info">${workout.count} treinos</p>
            </div>
        </div>
    `).join('');

    // Adicionar event listeners aos cards
    document.querySelectorAll('.workout-card').forEach(card => {
        card.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const workout = workoutsData[index];
            // Aqui você pode adicionar a lógica de navegação
            console.log('Clicou em:', workout.title);
        });
    });
}

// ============================================
// INICIALIZAÇÃO DOS DAY-CARDS
// ============================================

function initializeDayCards() {
    const dayCards = document.querySelectorAll('.day-card');
    const scrollContainer = document.querySelector('.days-scroll-container');
    const daysGrid = document.querySelector('.days-grid');

    dayCards.forEach(card => {
        card.addEventListener('click', function() {
            const dayNumber = this.textContent.trim();
            console.log('Clicou no dia:', dayNumber);

            // Adicionar classe selecionado (opcional)
            dayCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });

        // Melhorar feedback ao tocar
        card.addEventListener('touchstart', function() {
            this.style.opacity = '0.9';
        });

        card.addEventListener('touchend', function() {
            if (this.classList.contains('completed')) {
                this.style.opacity = '1';
            } else if (this.classList.contains('today')) {
                this.style.opacity = '1';
            } else {
                this.style.opacity = '0.5';
            }
        });
    });

    // Scroll smooth automático para o dia atual
    if (scrollContainer && daysGrid) {
        setTimeout(() => {
            const todayCard = document.querySelector('.day-card.today');
            if (todayCard) {
                // Calcular scroll suave para centralizar o dia atual
                const scrollPosition = todayCard.offsetLeft - (scrollContainer.clientWidth / 2) + (todayCard.clientWidth / 2);
                scrollContainer.scrollTo({
                    left: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}
