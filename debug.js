// Debug para a navegação de treinos
console.log('=== DEBUG INICIALIZADO ===');

// Verificar estrutura do DOM
console.log('Seção treinos-section:', document.getElementById('treinos-section'));
console.log('Grid workoutsGrid:', document.getElementById('workoutsGrid'));
console.log('Menu item treinos:', document.querySelector('[data-section="treinos"]'));

// Quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO ===');
    
    const treinosSection = document.getElementById('treinos-section');
    const menuItem = document.querySelector('[data-section="treinos"]');
    
    console.log('Seção treinos:', treinosSection);
    console.log('Classes da seção:', treinosSection?.className);
    console.log('Display computado:', window.getComputedStyle(treinosSection).display);
    
    console.log('Menu item:', menuItem);
    console.log('Classes menu item:', menuItem?.className);
    
    // Testar clique manual
    console.log('Testando clique no menu treinos...');
    if (menuItem) {
        menuItem.addEventListener('click', function(e) {
            console.log('CLIQUE DETECTADO NO MENU TREINOS');
            console.log('Evento:', e);
        });
    }
    
    // Monitorar mudanças de classe
    if (treinosSection) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    console.log('Classes atualizadas:', treinosSection.className);
                    console.log('Display computado:', window.getComputedStyle(treinosSection).display);
                }
            });
        });
        
        observer.observe(treinosSection, { attributes: true });
        console.log('Observador de mutações iniciado');
    }
});

// Sobrescrever loadWorkouts para debug
const originalLoadWorkouts = window.loadWorkouts;
window.loadWorkouts = function() {
    console.log('loadWorkouts() chamado');
    if (originalLoadWorkouts) {
        originalLoadWorkouts.call(this);
    }
};

// Sobrescrever activateSection para debug
const originalActivateSection = window.activateSection;
window.activateSection = function(sectionName) {
    console.log('activateSection() chamado com:', sectionName);
    if (originalActivateSection) {
        originalActivateSection.call(this, sectionName);
    }
};
