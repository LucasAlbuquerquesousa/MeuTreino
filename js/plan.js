/**
 * Meu Treino - Plano (Plan Tab)
 * Lógica para a aba de plano do usuário
 */

// ============================================
// ESTADO GLOBAL
// ============================================

const PlanState = {
    isLoggedIn: false,
    currentUser: null,
    sidebarOpen: false,
    currentSection: 'plan',
};

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initPlan();
    setupEventListeners();
    checkAuthStatus();
});

function initPlan() {
    MeuTreinoConfig.log('Plano inicializado');
}

// ============================================
// AUTENTICAÇÃO
// ============================================

function checkAuthStatus() {
    const authToken = localStorage.getItem(MeuTreinoConfig.STORAGE.AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(MeuTreinoConfig.STORAGE.USER_DATA_KEY);

    if (authToken && userData) {
        PlanState.isLoggedIn = true;
        PlanState.currentUser = JSON.parse(userData);
        showPlanDashboard();
    } else {
        showLoginForm();
    }
}

function showLoginForm() {
    const loginContainer = document.getElementById('loginContainer');
    const planContainer = document.getElementById('planContainer');

    if (loginContainer && planContainer) {
        loginContainer.style.display = 'flex';
        planContainer.style.display = 'none';
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function showPlanDashboard() {
    const loginContainer = document.getElementById('loginContainer');
    const planContainer = document.getElementById('planContainer');

    if (loginContainer && planContainer) {
        loginContainer.style.display = 'none';
        planContainer.style.display = 'flex';
    }

    updateUserInfo();
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const errorMessage = document.getElementById('errorMessage');

    // Validação simples para demo
    if (email === 'usuario@teste.com' && password === 'teste12345') {
        const userData = {
            id: '1',
            name: 'Matheus Roldan',
            email: email,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            goal: 'Ganhar Massa',
            targetWeight: '90 kg',
            program: 'Calisthenics',
        };

        localStorage.setItem(MeuTreinoConfig.STORAGE.AUTH_TOKEN_KEY, 'demo-token');
        localStorage.setItem(MeuTreinoConfig.STORAGE.USER_DATA_KEY, JSON.stringify(userData));

        PlanState.isLoggedIn = true;
        PlanState.currentUser = userData;

        showPlanDashboard();
    } else {
        if (errorMessage) {
            errorMessage.textContent = 'Email ou senha incorretos';
            errorMessage.style.display = 'block';
        }
        MeuTreinoConfig.log('Falha no login');
    }
}

function logout() {
    localStorage.removeItem(MeuTreinoConfig.STORAGE.AUTH_TOKEN_KEY);
    localStorage.removeItem(MeuTreinoConfig.STORAGE.USER_DATA_KEY);

    PlanState.isLoggedIn = false;
    PlanState.currentUser = null;

    showLoginForm();
    location.reload();
}

// ============================================
// ATUALIZAR INFORMAÇÕES DO USUÁRIO
// ============================================

function updateUserInfo() {
    if (!PlanState.currentUser) return;

    const user = PlanState.currentUser;

    // Atualizar programa
    const programName = document.querySelector('.program-name');
    if (programName) {
        programName.textContent = user.program || 'Meu Programa';
    }

    // Atualizar avatares
    const avatars = document.querySelectorAll('[class*="user-avatar"]');
    avatars.forEach((avatar) => {
        if (avatar instanceof HTMLImageElement) {
            avatar.src = user.avatar || 'https://via.placeholder.com/150';
            avatar.alt = user.name || 'Avatar';
        }
    });

    // Atualizar metas
    updateTargets();
}

function updateTargets() {
    const user = PlanState.currentUser;
    const targetCards = document.querySelectorAll('.target-card');

    // Atualiza todos os cards (agora existem 2: um em plan-content e outro em progressSection)
    targetCards.forEach((card, index) => {
        const goalValue = card.querySelector('.target-value');
        
        if (index % 2 === 0) {
            // Cards de objetivo (índices 0, 2, 4...)
            if (goalValue) {
                goalValue.textContent = user.goal || 'Ganhar Massa';
            }
        } else {
            // Cards de peso (índices 1, 3, 5...)
            if (goalValue) {
                goalValue.textContent = user.targetWeight || '90 kg';
            }
        }
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Sidebar mobile
    const menuToggle = document.querySelector('.menu-toggle-mobile');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileSidebar);
    }

    // Bottom nav
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(item);
        });
    });

    // Menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (!item.hasAttribute('data-toggle')) {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    switchToSection(section);
                }
            }
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Day items
    const dayItems = document.querySelectorAll('.day-item');
    dayItems.forEach((item) => {
        item.addEventListener('click', () => handleDaySelect(item));
    });

    // Target cards
    const targetCards = document.querySelectorAll('.target-card');
    targetCards.forEach((card) => {
        card.addEventListener('click', () => handleTargetCardClick(card));
    });
}

// ============================================
// SIDEBAR MOBILE
// ============================================

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!sidebar) return;

    if (window.innerWidth >= 768) return; // Não ativa em desktop

    sidebar.classList.toggle('mobile-open');
    if (overlay) {
        overlay.classList.toggle('visible');
    }

    PlanState.sidebarOpen = sidebar.classList.contains('mobile-open');
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }
    if (overlay) {
        overlay.classList.remove('visible');
    }

    PlanState.sidebarOpen = false;
}

function toggleSubmenuMobile(event) {
    event.preventDefault();

    const submenu = document.getElementById('submenu');
    if (submenu) {
        const isOpen = submenu.style.display !== 'none';
        submenu.style.display = isOpen ? 'none' : 'flex';
    }
}

// ============================================
// NAVEGAÇÃO
// ============================================

function switchToSection(section) {
    PlanState.currentSection = section;

    // Atualizar active state no menu
    const allMenuItems = document.querySelectorAll('[data-section]');
    allMenuItems.forEach((item) => {
        item.classList.remove('active');
    });

    const activeItem = document.querySelector(`[data-section="${section}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Controlar visibilidade dos headers
    const planHeaderPlan = document.getElementById('planHeaderPlan');
    const planHeaderProgress = document.getElementById('planHeaderProgress');
    const planHeaderMore = document.getElementById('planHeaderMore');

    if (planHeaderPlan) {
        planHeaderPlan.style.display = section === 'plan' ? 'flex' : 'none';
    }
    if (planHeaderProgress) {
        planHeaderProgress.style.display = section === 'progress' ? 'flex' : 'none';
    }
    if (planHeaderMore) {
        planHeaderMore.style.display = section === 'more' ? 'flex' : 'none';
    }

    // Atualizar visibilidade de seções
    const planContent = document.querySelector('.plan-content');
    const progressSection = document.getElementById('progressSection');
    const moreSection = document.getElementById('moreSection');

    if (section === 'plan') {
        if (planContent) planContent.style.display = 'block';
        if (progressSection) progressSection.style.display = 'none';
        if (moreSection) moreSection.style.display = 'none';
    } else if (section === 'progress') {
        if (planContent) planContent.style.display = 'none';
        if (progressSection) progressSection.style.display = 'flex';
        progressSection.style.flexDirection = 'column';
        if (moreSection) moreSection.style.display = 'none';
        updateProgressSection();
    } else if (section === 'more') {
        if (planContent) planContent.style.display = 'none';
        if (progressSection) progressSection.style.display = 'none';
        if (moreSection) moreSection.style.display = 'flex';
        moreSection.style.flexDirection = 'column';
    } else {
        if (planContent) planContent.style.display = 'block';
        if (progressSection) progressSection.style.display = 'none';
        if (moreSection) moreSection.style.display = 'none';
    }

    // Atualizar bottom nav
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach((item) => {
        item.classList.remove('active');
    });

    const bottomNavItem = document.querySelector(`.bottom-nav-item[onclick*="${section}"]`);
    if (bottomNavItem) {
        bottomNavItem.classList.add('active');
    }

    closeMobileSidebar();

    MeuTreinoConfig.log(`Seção alterada: ${section}`);
}

function switchSection(event, section) {
    event.preventDefault();
    switchToSection(section);
}

function handleNavigation(item) {
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach((nav) => {
        nav.classList.remove('active');
    });

    item.classList.add('active');
}

// ============================================
// DIAS
// ============================================

function handleDaySelect(dayItem) {
    const dayItems = document.querySelectorAll('.day-item');
    dayItems.forEach((item) => {
        item.classList.remove('today');
    });

    dayItem.classList.add('today');

    const dayNumber = dayItem.querySelector('.day-number')?.textContent;
    MeuTreinoConfig.log(`Dia selecionado: ${dayNumber}`);

    // Animar
    dayItem.style.animation = 'none';
    setTimeout(() => {
        dayItem.style.animation = '';
    }, 10);
}

// ============================================
// WORKOUT
// ============================================

function startWorkout() {
    if (!PlanState.isLoggedIn) {
        alert('Por favor, faça login primeiro');
        return;
    }

    MeuTreinoConfig.log('Iniciando visualização da tela de execução...');

    // Mostrar tela de execução
    const planContainer = document.getElementById('planContainer');
    const executionScreen = document.getElementById('workoutExecutionScreen');
    const bottomNav = document.querySelector('.bottom-nav');

    if (planContainer) planContainer.style.display = 'none';
    if (executionScreen) executionScreen.style.display = 'flex';
    if (bottomNav) bottomNav.style.display = 'none';

    // Scroll para o topo
    window.scrollTo(0, 0);
}

function goBackToPlan() {
    MeuTreinoConfig.log('Voltando para o plano...');

    const planContainer = document.getElementById('planContainer');
    const executionScreen = document.getElementById('workoutExecutionScreen');
    const bottomNav = document.querySelector('.bottom-nav');

    if (executionScreen) executionScreen.style.display = 'none';
    if (planContainer) planContainer.style.display = 'flex';
    if (bottomNav) bottomNav.style.display = 'flex';

    // Scroll para o topo
    window.scrollTo(0, 0);
}

function handleStartTraining() {
    if (!PlanState.isLoggedIn) {
        alert('Por favor, faça login primeiro');
        return;
    }

    MeuTreinoConfig.log('Começando o treino...');

    // Efeito visual no botão
    const btn = document.querySelector('.btn-start-workout');
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Treino Iniciado!';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
        }, 2000);
    }

    // Aqui você poderia navegar para a página de execução real do treino
    // ou abrir um modal com o exercício primeiro
}

// ============================================
// TARGET CARDS
// ============================================

function handleTargetCardClick(card) {
    const label = card.querySelector('.target-label')?.textContent;

    MeuTreinoConfig.log(`Card clicado: ${label}`);

    // Adicionar feedback visual
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 100);

    // Aqui você poderia abrir um modal para editar o alvo
    // openTargetEditModal(label);
}

// ============================================
// RESPONSIVIDADE
// ============================================

let resizeTimeout;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 768) {
            closeMobileSidebar();

            const sidebar = document.querySelector('.dashboard-sidebar');
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
        }
    }, 100);
});

// ============================================
// TEMAS E CORES
// ============================================

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--black', '#ffffff');
        document.documentElement.style.setProperty('--white', '#1a1a1a');
    } else {
        document.documentElement.style.setProperty('--black', '#000000');
        document.documentElement.style.setProperty('--white', '#ffffff');
    }
}

// ============================================
// UTILITÁRIOS
// ============================================

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// PROGRESSO SECTION
// ============================================

function updateProgressSection() {
    if (!PlanState.currentUser) return;

    const user = PlanState.currentUser;

    // Atualizar avatares na seção de progresso
    const progressAvatars = document.querySelectorAll('#progressSection [class*="user-avatar"]');
    progressAvatars.forEach((avatar) => {
        if (avatar instanceof HTMLImageElement) {
            avatar.src = user.avatar || 'https://via.placeholder.com/150';
            avatar.alt = user.name || 'Avatar';
        }
    });

    // Atualizar dados de progresso (placeholder - em produção viria de uma API)
    updateWeightCard();
    updateHistoryCards();
    updateMetricsCards();
}

function updateWeightCard() {
    // Dados dinâmicos viriam de uma API real
    const monthSpan = document.querySelector('.weight-month');
    if (monthSpan) {
        const now = new Date();
        const monthName = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        monthSpan.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    }
}

function updateHistoryCards() {
    const historyCards = document.querySelectorAll('.history-card');
    if (historyCards.length >= 3) {
        // Dados simulados - em produção viria de uma API
        const data = [
            { label: 'Peso Inicial', value: '98 kg' },
            { label: 'Peso Atual', value: '94 kg' },
            { label: 'Peso Alvo', value: '85 kg' },
        ];

        historyCards.forEach((card, index) => {
            if (data[index]) {
                card.querySelector('.history-value').textContent = data[index].value;
            }
        });
    }
}

function updateMetricsCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    if (metricCards.length >= 4) {
        // Dados simulados - em produção viria de sensores/API
        const metrics = [
            { label: 'Passos', value: '8.340', meta: 'de 10.000' },
            { label: 'Estresse', value: 'Baixo', meta: '25%' },
            { label: 'Freq. Cardíaca', value: '72 bpm', meta: 'Normal' },
            { label: 'Sono', value: '7h 42min', meta: 'Ótimo' },
        ];

        metricCards.forEach((card, index) => {
            if (metrics[index]) {
                const content = card.querySelector('.metric-content');
                const value = content.querySelector('.metric-value');
                const meta = content.querySelector('.metric-meta');

                if (value) value.textContent = metrics[index].value;
                if (meta) meta.textContent = metrics[index].meta;
            }
        });
    }
}

function handleAddWeight() {
    if (!PlanState.isLoggedIn) {
        alert('Por favor, faça login primeiro');
        return;
    }

    MeuTreinoConfig.log('Abrindo formulário de adição de peso...');

    // Efeito visual no botão
    const btn = document.querySelector('.btn-add-weight');
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Peso Adicionado!';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
        }, 2000);
    }

    // Aqui você poderia abrir um modal para registrar novo peso
    // openWeightModal();
}

// ============================================
// MAIS SECTION
// ============================================

function handleBoostCardClick(card) {
    const title = card.querySelector('.boost-card-title')?.textContent;
    MeuTreinoConfig.log(`Boost card clicado: ${title}`);

    // Efeito visual
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 100);

    // Aqui você poderia navegar para a página do produto ou abrir um modal
    // window.location.href = `/product/${slugify(title)}`;
}

function handleProgressItemClick(item) {
    const label = item.querySelector('.progress-item-label')?.textContent;
    MeuTreinoConfig.log(`Progress item clicado: ${label}`);

    // Efeito visual
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
        item.style.transform = '';
    }, 100);

    // Aqui você poderia navegar para a página de registro do item
    // window.location.href = `/log/${slugify(label)}`;
}

// ============================================
// DEBUG
// ============================================

// ============================================
// TREINO EM ANDAMENTO (In Progress Screen)
// ============================================

function handleStartTraining() {
    const executionScreen = document.getElementById('workoutExecutionScreen');
    const inProgressScreen = document.getElementById('workoutInProgressScreen');
    const planContainer = document.getElementById('planContainer');
    const bottomNav = document.querySelector('.bottom-nav');

    if (executionScreen && inProgressScreen) {
        executionScreen.style.display = 'none';
        inProgressScreen.style.display = 'flex';
        
        if (bottomNav) {
            bottomNav.style.display = 'none';
        }

        if (planContainer) {
            planContainer.style.display = 'none';
        }

        MeuTreinoConfig.log('Treino em andamento iniciado');
    }
}

function handleCloseWorkout() {
    const modal = document.getElementById('confirmExitModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeConfirmExitModal() {
    const modal = document.getElementById('confirmExitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function confirmExit() {
    const inProgressScreen = document.getElementById('workoutInProgressScreen');
    const exitScreen = document.getElementById('workoutExitScreen');
    const modal = document.getElementById('confirmExitModal');

    if (modal) {
        modal.style.display = 'none';
    }

    if (inProgressScreen && exitScreen) {
        inProgressScreen.style.display = 'none';
        exitScreen.style.display = 'flex';

        // Reset selected reason
        const reasonCards = document.querySelectorAll('.reason-card');
        reasonCards.forEach((card) => {
            card.classList.remove('selected');
        });

        MeuTreinoConfig.log('Tela de saída aberta');
    }
}

function selectReason(element, reasonCode) {
    const reasonCards = document.querySelectorAll('.reason-card');
    
    reasonCards.forEach((card) => {
        card.classList.remove('selected');
    });

    element.classList.add('selected');
    PlanState.selectedExitReason = reasonCode;

    MeuTreinoConfig.log(`Motivo selecionado: ${reasonCode}`);
}

function handleSubmitExit() {
    if (!PlanState.selectedExitReason) {
        MeuTreinoConfig.log('Selecione um motivo para continuar');
        return;
    }

    // Simular feedback
    const btn = document.querySelector('.btn-submit-exit');
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Enviado!';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;

            // Voltar para plano
            returnToPlanFromExit();
        }, 1500);
    }
}

function returnToPlanFromExit() {
    const exitScreen = document.getElementById('workoutExitScreen');
    const planContainer = document.getElementById('planContainer');
    const bottomNav = document.querySelector('.bottom-nav');
    const executionScreen = document.getElementById('workoutExecutionScreen');

    if (exitScreen) {
        exitScreen.style.display = 'none';
    }

    if (planContainer) {
        planContainer.style.display = 'flex';
    }

    if (bottomNav) {
        bottomNav.style.display = 'flex';
    }

    if (executionScreen) {
        executionScreen.style.display = 'flex';
    }

    // Reset state
    PlanState.selectedExitReason = null;

    MeuTreinoConfig.log('Voltando para plano');
}

function handleNext() {
    MeuTreinoConfig.log('Próximo exercício');
}

function handlePrevious() {
    MeuTreinoConfig.log('Exercício anterior');
}

// Event listeners para próximo/anterior/pular
document.addEventListener('DOMContentLoaded', () => {
    const btnSkip = document.querySelector('.btn-skip-exercise');
    if (btnSkip) {
        btnSkip.addEventListener('click', () => {
            MeuTreinoConfig.log('Exercício pulado');
        });
    }

    const nextExerciseCard = document.querySelector('.next-exercise-card');
    if (nextExerciseCard) {
        nextExerciseCard.addEventListener('click', () => {
            MeuTreinoConfig.log('Card do próximo exercício clicado');
        });
    }
});

if (MeuTreinoConfig.DEBUG) {
    window.PlanDebug = {
        PlanState,
        switchToSection,
        startWorkout,
        goBackToPlan,
        handleStartTraining,
        handleDaySelect,
        logout,
        handleAddWeight,
        updateProgressSection,
        handleBoostCardClick,
        handleProgressItemClick,
        handleCloseWorkout,
        closeConfirmExitModal,
        confirmExit,
        selectReason,
        handleSubmitExit,
        returnToPlanFromExit,
        handleNext,
        handlePrevious,
    };

    MeuTreinoConfig.log('Debug mode ativado. Use window.PlanDebug para acessar funções');
}
