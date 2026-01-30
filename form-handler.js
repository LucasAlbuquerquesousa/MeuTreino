/**
 * Meu Treino - Form Handler
 * Gerencia validações avançadas e integração com backend
 * Preparado para futura integração com API REST
 */

// ============================================
// CONFIGURAÇÃO DA API
// ============================================

const API_CONFIG = {
    // BASE_URL: 'https://api.meutreino.com', // Será preenchido em produção
    BASE_URL: 'http://localhost:3000', // Para desenvolvimento local
    ENDPOINTS: {
        REGISTER: '/api/users/register',
        LOGIN: '/api/users/login',
        GET_USER: '/api/users/:id',
        UPDATE_USER: '/api/users/:id',
        GET_WORKOUTS: '/api/workouts',
        CREATE_WORKOUT: '/api/workouts',
    }
};

// ============================================
// CLASSE PARA GERENCIAR FORMULÁRIO
// ============================================

class FormManager {
    constructor() {
        this.currentStep = 1;
        this.formData = this.loadFromLocalStorage() || {};
        this.isSubmitting = false;
    }

    /**
     * Carrega dados salvos do localStorage
     */
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('meuTreinoFormData');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Erro ao carregar dados do localStorage:', error);
            return null;
        }
    }

    /**
     * Salva dados no localStorage (auto-save)
     */
    saveToLocalStorage() {
        try {
            localStorage.setItem('meuTreinoFormData', JSON.stringify(this.formData));
        } catch (error) {
            console.error('Erro ao salvar dados no localStorage:', error);
        }
    }

    /**
     * Valida força da senha
     */
    validatePasswordStrength(password) {
        const strength = {
            score: 0,
            messages: []
        };

        if (password.length < 8) {
            strength.messages.push('Mínimo 8 caracteres');
        } else {
            strength.score += 1;
        }

        if (!/[a-z]/.test(password)) {
            strength.messages.push('Incluir letras minúsculas');
        } else {
            strength.score += 1;
        }

        if (!/[A-Z]/.test(password)) {
            strength.messages.push('Incluir letras maiúsculas');
        } else {
            strength.score += 1;
        }

        if (!/[0-9]/.test(password)) {
            strength.messages.push('Incluir números');
        } else {
            strength.score += 1;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            strength.messages.push('Incluir caracteres especiais (!@#$%^&*)');
        } else {
            strength.score += 1;
        }

        return strength;
    }

    /**
     * Calcula IMC
     */
    calculateBMI(weight, height) {
        // height em cm, converter para m
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return parseFloat(bmi.toFixed(1));
    }

    /**
     * Classifica IMC
     */
    classifyBMI(bmi) {
        if (bmi < 18.5) return 'Abaixo do peso';
        if (bmi < 25) return 'Peso normal';
        if (bmi < 30) return 'Sobrepeso';
        return 'Obeso';
    }

    /**
     * Envia dados para o backend
     */
    async submitToBackend(data) {
        if (this.isSubmitting) return false;

        this.isSubmitting = true;

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
                timeout: 10000 // 10 segundos timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Registro bem-sucedido:', result);
            
            // Limpar dados do localStorage após envio bem-sucedido
            localStorage.removeItem('meuTreinoFormData');
            
            return result;

        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao enviar formulário. Verifique sua conexão e tente novamente.');
            return false;
        } finally {
            this.isSubmitting = false;
        }
    }

    /**
     * Valida estrutura completa do formulário
     */
    validateCompleteForm(data) {
        const errors = [];

        // Validar Etapa 1
        if (!data.fullName || data.fullName.trim().length < 3) {
            errors.push('Nome completo inválido');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Email inválido');
        }

        if (!data.password || data.password.length < 6) {
            errors.push('Senha muito fraca');
        }

        if (!data.profileType) {
            errors.push('Tipo de perfil não selecionado');
        }

        // Validar Etapa 2
        if (!data.age || data.age < 13 || data.age > 120) {
            errors.push('Idade inválida');
        }

        if (!data.gender) {
            errors.push('Gênero não selecionado');
        }

        // Validar Etapa 3
        if (!data.height || data.height < 100 || data.height > 250) {
            errors.push('Altura inválida');
        }

        if (!data.weight || data.weight < 20 || data.weight > 300) {
            errors.push('Peso inválido');
        }

        if (!Array.isArray(data.targetRegions) || data.targetRegions.length === 0) {
            errors.push('Selecione pelo menos uma região para melhorar');
        }

        // Validar Etapa 6
        if (!data.mainGoal) {
            errors.push('Objetivo principal não selecionado');
        }

        // Validar Etapa 7
        if (!data.instructionStyle) {
            errors.push('Preferência de instrução não selecionada');
        }

        // Validar Etapa 8
        if (!data.trainingLocation || !data.sessionDuration || !data.preferredTime) {
            errors.push('Dados de logística de treino incompletos');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Valida email
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Gera resumo dos dados (para visualização)
     */
    generateSummary(data) {
        return {
            basicInfo: {
                fullName: data.fullName,
                email: data.email,
                profileType: data.profileType,
            },
            physicalInfo: {
                height: `${data.height}cm`,
                weight: `${data.weight}kg`,
                bmi: this.calculateBMI(data.weight, data.height),
                bmiClassification: this.classifyBMI(this.calculateBMI(data.weight, data.height)),
            },
            goals: {
                main: data.mainGoal,
                secondary: data.secondaryGoal,
                deadline: data.deadline,
                priority: data.priority
            },
            habits: {
                sleep: data.sleepHours,
                foodQuality: data.foodQuality,
                stressLevel: data.stressLevel,
                substance: data.substanceUse
            },
            trainingPreferences: {
                location: data.trainingLocation,
                duration: data.sessionDuration,
                time: data.preferredTime,
                type: data.trainingType
            }
        };
    }
}

// ============================================
// INSTÂNCIA GLOBAL
// ============================================

const formManager = new FormManager();

// ============================================
// HELPERS PARA LOGGING
// ============================================

function logFormStep(stepNumber, data) {
    console.log(`[Etapa ${stepNumber}] Dados coletados:`, data);
}

function logFormSubmission(data) {
    console.group('Formulário Completo Submetido');
    console.log('Dados:', data);
    console.log('Resumo:', formManager.generateSummary(data));
    console.log('Timestamp:', new Date().toLocaleString('pt-BR'));
    console.groupEnd();
}

// ============================================
// AUTO-SAVE DO FORMULÁRIO
// ============================================

document.addEventListener('change', function(e) {
    if (e.target.closest('form')) {
        // Auto-save a cada mudança (throttled)
        if (window.autoSaveTimeout) {
            clearTimeout(window.autoSaveTimeout);
        }
        window.autoSaveTimeout = setTimeout(() => {
            formManager.saveToLocalStorage();
            console.log('Formulário salvo automaticamente');
        }, 1000);
    }
});

// ============================================
// VALIDAÇÃO EM TEMPO REAL
// ============================================

// Email
document.addEventListener('blur', function(e) {
    if (e.target.id === 'email') {
        const isValid = formManager.isValidEmail(e.target.value);
        if (!isValid && e.target.value) {
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }
    }
}, true);

// Senha
document.addEventListener('blur', function(e) {
    if (e.target.id === 'password') {
        const strength = formManager.validatePasswordStrength(e.target.value);
        if (strength.messages.length > 0 && e.target.value) {
            console.warn('Força da senha:', strength);
        }
    }
}, true);

// ============================================
// EXPORT PARA INTEGRAÇÃO
// ============================================

window.MeuTreino = {
    FormManager: FormManager,
    formManager: formManager,
    API_CONFIG: API_CONFIG
};

console.log('Form Handler carregado. Acesso via window.MeuTreino');
