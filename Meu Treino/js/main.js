/**
 * Meu Treino - Main JavaScript
 * Controla navegação, modal e interações gerais da página
 */

// ============================================
// SMOOTH SCROLL HELPER
// ============================================

function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        if (selector === '#signup') {
            openSignup();
        } else {
            element.scrollIntoView({ behavior: 'smooth' });
            closeMobileMenu();
        }
    }
}

// ============================================
// MODAL DE LOGIN
// ============================================

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ============================================
// MODAL DE QUIZ
// ============================================

function showQuizModal() {
    const quizModal = document.getElementById('quizModal');
    quizModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuizModal() {
    const quizModal = document.getElementById('quizModal');
    quizModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetQuiz();
}

function submitQuiz() {
    // Validar se todas as perguntas foram respondidas
    const fullName = document.getElementById('quizFullName').value.trim();
    const email = document.getElementById('quizEmail').value.trim();
    const password = document.getElementById('quizPassword').value.trim();
    const confirmPassword = document.getElementById('quizConfirmPassword').value.trim();
    const profileType = document.querySelector('input[name="quizProfileType"]:checked');

    if (!fullName) {
        alert('Por favor, digite seu nome completo');
        return;
    }

    if (!email) {
        alert('Por favor, digite seu e-mail');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, digite um e-mail válido');
        return;
    }

    if (!password) {
        alert('Por favor, crie uma senha');
        return;
    }

    if (password.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres');
        return;
    }

    if (!confirmPassword) {
        alert('Por favor, confirme sua senha');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não conferem');
        return;
    }

    if (!profileType) {
        alert('Por favor, selecione um tipo de perfil');
        return;
    }

    // Coletar dados do quiz
    const quizData = {
        fullName: fullName,
        email: email,
        profileType: profileType.value,
        completedAt: new Date().toISOString()
    };

    // Armazenar dados (para futura integração com backend)
    localStorage.setItem('meuTreinoQuizData', JSON.stringify(quizData));
    console.log('Quiz Data:', quizData);

    // Mostrar mensagem de sucesso
    showQuizSuccess();
}

function showQuizSuccess() {
    const quizContent = document.getElementById('quizContent');
    const quizSuccess = document.getElementById('quizSuccess');

    quizContent.style.display = 'none';
    quizSuccess.style.display = 'block';
}

function resetQuiz() {
    const quizForm = document.getElementById('quizForm');
    const quizContent = document.getElementById('quizContent');
    const quizSuccess = document.getElementById('quizSuccess');

    if (quizForm) {
        quizForm.reset();
    }
    quizContent.style.display = 'block';
    quizSuccess.style.display = 'none';
}

function proceedToDetailedForm() {
    // Fechar modal do quiz
    closeQuizModal();
    
    // Abrir página de signup no primeiro passo
    openSignup();
}

// Fechar modal ao clicar fora
window.onclick = function (event) {
    const loginModal = document.getElementById('loginModal');
    const quizModal = document.getElementById('quizModal');
    const signupPage = document.getElementById('signup');

    if (event.target === loginModal) {
        closeLoginModal();
    }

    if (event.target === quizModal) {
        closeQuizModal();
    }

    if (event.target === signupPage && signupPage.classList.contains('active')) {
        closeSignup();
    }
};

// ============================================
// SIGNUP PAGE
// ============================================

function openSignup() {
    const signupPage = document.getElementById('signup');
    signupPage.classList.add('active');
    document.body.style.overflow = 'hidden';
    goToStep(1);
}

function closeSignup() {
    const signupPage = document.getElementById('signup');
    signupPage.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

// ============================================
// NAVEGAÇÃO ENTRE ETAPAS
// ============================================

function goToStep(stepNumber) {
    // Esconder todas as etapas
    const allSteps = document.querySelectorAll('.signup-step');
    allSteps.forEach(step => step.classList.remove('active'));

    // Mostrar etapa desejada
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Esconder sucesso
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('active');
}

// ============================================
// VALIDAÇÕES
// ============================================

function validateStep(stepNumber) {
    const form = document.getElementById(`step${stepNumber}-form`);

    if (!form) return false;

    // Validação básica HTML5
    if (!form.checkValidity()) {
        showFormError(form);
        return false;
    }

    // Validações customizadas
    switch (stepNumber) {
        case 1:
            if (!validateStep1()) return false;
            break;
        case 2:
            if (!validateStep2()) return false;
            break;
        case 3:
            if (!validateStep3()) return false;
            break;
        case 4:
            if (!validateStep4()) return false;
            break;
        case 5:
            if (!validateStep5()) return false;
            break;
        case 6:
            if (!validateStep6()) return false;
            break;
        case 7:
            if (!validateStep7()) return false;
            break;
        case 8:
            if (!validateStep8()) return false;
            break;
    }

    // Se passou em todas validações, ir para próximo passo
    goToStep(stepNumber + 1);
    return true;
}

function validateStep1() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const profileType = document.querySelector('input[name="profileType"]:checked');

    if (password !== confirmPassword) {
        alert('Senhas não conferem');
        return false;
    }

    if (password.length < 6) {
        alert('Senha deve ter no mínimo 6 caracteres');
        return false;
    }

    if (!profileType) {
        alert('Selecione um tipo de perfil');
        return false;
    }

    return true;
}

function validateStep2() {
    const age = document.getElementById('age').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const profession = document.getElementById('profession').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const sitTime = document.querySelector('input[name="sitTime"]:checked');

    if (!age) {
        alert('Por favor, digite sua idade');
        return false;
    }

    const ageNum = parseInt(age);
    if (ageNum < 13 || ageNum > 120) {
        alert('Idade inválida (deve estar entre 13 e 120 anos)');
        return false;
    }

    if (!gender) {
        alert('Por favor, selecione seu gênero');
        return false;
    }

    if (!profession) {
        alert('Por favor, digite sua profissão');
        return false;
    }

    if (!contact) {
        alert('Por favor, digite seu e-mail ou WhatsApp');
        return false;
    }

    if (!sitTime) {
        alert('Por favor, selecione o tempo que fica sentado');
        return false;
    }

    return true;
}

function validateStep3() {
    const height = document.getElementById('height').value.trim();
    const weight = document.getElementById('weight').value.trim();
    const bodyImage = document.querySelector('input[name="bodyImage"]:checked');
    const targetRegions = document.querySelectorAll('input[name="targetRegions"]:checked');

    if (!height) {
        alert('Por favor, digite sua altura');
        return false;
    }

    const heightNum = parseFloat(height);
    if (heightNum < 100 || heightNum > 250) {
        alert('Altura inválida (deve estar entre 100cm e 250cm)');
        return false;
    }

    if (!weight) {
        alert('Por favor, digite seu peso');
        return false;
    }

    const weightNum = parseFloat(weight);
    if (weightNum < 20 || weightNum > 300) {
        alert('Peso inválido (deve estar entre 20kg e 300kg)');
        return false;
    }

    if (!bodyImage) {
        alert('Por favor, selecione como você se enxerga');
        return false;
    }

    if (targetRegions.length === 0) {
        alert('Selecione pelo menos uma região para melhorar');
        return false;
    }

    return true;
}

function validateStep4() {
    const currentlyTrains = document.querySelector('input[name="currentlyTrains"]:checked');

    if (!currentlyTrains) {
        alert('Selecione se você treina ou não');
        return false;
    }

    if (currentlyTrains.value === 'sim') {
        const trainingFrequency = document.querySelector('input[name="trainingFrequency"]:checked');
        const trainingTypes = document.querySelectorAll('input[name="trainingTypes"]:checked');

        if (!trainingFrequency) {
            alert('Por favor, selecione sua frequência de treino');
            return false;
        }

        if (trainingTypes.length === 0) {
            alert('Por favor, selecione pelo menos um tipo de treino');
            return false;
        }
    } else {
        const inactiveTime = document.querySelector('input[name="inactiveTime"]:checked');
        
        if (!inactiveTime) {
            alert('Por favor, selecione há quanto tempo está parado');
            return false;
        }
    }

    return true;
}

function validateStep5() {
    const medicalRestriction = document.querySelector('input[name="medicalRestriction"]:checked');
    const medicalApproval = document.querySelector('input[name="medicalApproval"]:checked');

    if (!medicalRestriction) {
        alert('Por favor, indique se possui restrição médica');
        return false;
    }

    if (!medicalApproval) {
        alert('Por favor, indique se possui liberação médica');
        return false;
    }

    return true;
}

function validateStep6() {
    const mainGoal = document.querySelector('input[name="mainGoal"]:checked');
    const deadline = document.querySelector('input[name="deadline"]:checked');

    if (!mainGoal) {
        alert('Por favor, selecione seu objetivo principal');
        return false;
    }

    if (!deadline) {
        alert('Por favor, selecione seu prazo desejado');
        return false;
    }

    return true;
}

function validateStep7() {
    const sleepHours = document.querySelector('input[name="sleepHours"]:checked');
    const foodQuality = document.querySelector('input[name="foodQuality"]:checked');
    const waterIntake = document.querySelector('input[name="waterIntake"]:checked');
    const stressLevel = document.querySelector('input[name="stressLevel"]:checked');
    const substanceUse = document.querySelector('input[name="substanceUse"]:checked');
    const mainMotivation = document.querySelector('input[name="mainMotivation"]:checked');
    const instructionStyle = document.querySelector('input[name="instructionStyle"]:checked');

    if (!sleepHours) {
        alert('Por favor, selecione suas horas de sono');
        return false;
    }

    if (!foodQuality) {
        alert('Por favor, selecione sua avaliação de alimentação');
        return false;
    }

    if (!waterIntake) {
        alert('Por favor, selecione seu consumo de água');
        return false;
    }

    if (!stressLevel) {
        alert('Por favor, selecione seu nível de estresse');
        return false;
    }

    if (!substanceUse) {
        alert('Por favor, selecione sua resposta sobre álcool/cigarro');
        return false;
    }

    if (!mainMotivation) {
        alert('Por favor, selecione sua principal motivação');
        return false;
    }

    if (!instructionStyle) {
        alert('Por favor, selecione sua preferência de instrução');
        return false;
    }

    return true;
}

function validateStep8() {
    const trainingLocation = document.querySelector('input[name="trainingLocation"]:checked');
    const sessionDuration = document.querySelector('input[name="sessionDuration"]:checked');
    const preferredTime = document.querySelector('input[name="preferredTime"]:checked');
    const trainingType = document.querySelector('input[name="trainingType"]:checked');

    if (!trainingLocation) {
        alert('Por favor, selecione onde pretende treinar');
        return false;
    }

    if (!sessionDuration) {
        alert('Por favor, selecione o tempo por sessão');
        return false;
    }

    if (!preferredTime) {
        alert('Por favor, selecione seu horário preferido');
        return false;
    }

    if (!trainingType) {
        alert('Por favor, selecione seu tipo de treino preferido');
        return false;
    }

    return true;
}

function showFormError(form) {
    const inputs = form.querySelectorAll(':invalid');
    inputs.forEach(input => {
        input.focus();
        input.style.borderColor = 'red';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 2000);
    });
    alert('Por favor, preencha todos os campos obrigatórios');
}

// ============================================
// SUBMIT DO FORMULÁRIO
// ============================================

function submitForm() {
    // Coletar todos os dados do formulário
    const formData = collectFormData();

    // Validar dados
    if (!formData) {
        alert('Erro ao processar formulário');
        return false;
    }

    // Preparar dados para envio (para futura integração com backend)
    console.log('Form Data to Submit:', formData);

    // Enviar para backend (quando disponível)
    sendFormDataToBackend(formData);

    // Mostrar mensagem de sucesso
    showSuccessMessage();

    return false;
}

function collectFormData() {
    const data = {};

    // Etapa 1
    data.fullName = document.getElementById('fullName')?.value || '';
    data.email = document.getElementById('email')?.value || '';
    data.password = document.getElementById('password')?.value || '';
    data.profileType = document.querySelector('input[name="profileType"]:checked')?.value;

    // Etapa 2
    data.age = document.getElementById('age')?.value || '';
    data.gender = document.querySelector('input[name="gender"]:checked')?.value;
    data.profession = document.getElementById('profession')?.value || '';
    data.contact = document.getElementById('contact')?.value || '';
    data.sitTime = document.querySelector('input[name="sitTime"]:checked')?.value;

    // Etapa 3
    data.height = document.getElementById('height')?.value || '';
    data.weight = document.getElementById('weight')?.value || '';
    data.bodyImage = document.querySelector('input[name="bodyImage"]:checked')?.value;
    data.targetRegions = Array.from(document.querySelectorAll('input[name="targetRegions"]:checked')).map(el => el.value);

    // Etapa 4
    data.currentlyTrains = document.querySelector('input[name="currentlyTrains"]:checked')?.value;
    if (data.currentlyTrains === 'sim') {
        data.trainingFrequency = document.querySelector('input[name="trainingFrequency"]:checked')?.value;
        data.trainingTypes = Array.from(document.querySelectorAll('input[name="trainingTypes"]:checked')).map(el => el.value);
    } else {
        data.inactiveTime = document.querySelector('input[name="inactiveTime"]:checked')?.value;
    }

    // Etapa 5
    data.currentPains = document.getElementById('currentPains')?.value || '';
    data.painScale = document.getElementById('painScale')?.value || '';
    data.injuries = document.getElementById('injuries')?.value || '';
    data.surgeries = document.getElementById('surgeries')?.value || '';
    data.medicalRestriction = document.querySelector('input[name="medicalRestriction"]:checked')?.value;
    data.medicalApproval = document.querySelector('input[name="medicalApproval"]:checked')?.value;
    data.jointProblems = Array.from(document.querySelectorAll('input[name="jointProblems"]:checked')).map(el => el.value);

    // Etapa 6
    data.mainGoal = document.querySelector('input[name="mainGoal"]:checked')?.value;
    data.secondaryGoal = document.querySelector('input[name="secondaryGoal"]:checked')?.value;
    data.deadline = document.querySelector('input[name="deadline"]:checked')?.value;
    data.priority = document.getElementById('priority')?.value || '';
    data.specificEvent = document.getElementById('specificEvent')?.value || '';

    // Etapa 7
    data.sleepHours = document.querySelector('input[name="sleepHours"]:checked')?.value;
    data.foodQuality = document.querySelector('input[name="foodQuality"]:checked')?.value;
    data.waterIntake = document.querySelector('input[name="waterIntake"]:checked')?.value;
    data.stressLevel = document.querySelector('input[name="stressLevel"]:checked')?.value;
    data.substanceUse = document.querySelector('input[name="substanceUse"]:checked')?.value;
    data.mainMotivation = document.querySelector('input[name="mainMotivation"]:checked')?.value;
    data.instructionStyle = document.querySelector('input[name="instructionStyle"]:checked')?.value;

    // Etapa 8
    data.trainingLocation = document.querySelector('input[name="trainingLocation"]:checked')?.value;
    data.sessionDuration = document.querySelector('input[name="sessionDuration"]:checked')?.value;
    data.preferredTime = document.querySelector('input[name="preferredTime"]:checked')?.value;
    data.trainingType = document.querySelector('input[name="trainingType"]:checked')?.value;

    // Etapa 9
    data.finalComments = document.getElementById('finalComments')?.value || '';

    // Adicionar timestamp
    data.submittedAt = new Date().toISOString();

    return data;
}

function sendFormDataToBackend(formData) {
    // TODO: Implementar integração com backend
    // Exemplo de chamada API:
    /*
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar formulário');
    });
    */

    // Por enquanto, armazenar em localStorage para demonstração
    localStorage.setItem('meuTreinoFormData', JSON.stringify(formData));
}

function showSuccessMessage() {
    // Esconder todos os steps
    const allSteps = document.querySelectorAll('.signup-step');
    allSteps.forEach(step => step.classList.remove('active'));

    // Mostrar mensagem de sucesso
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('active');
}

// ============================================
// RESET DO FORMULÁRIO
// ============================================

function resetForm() {
    // Resetar todos os forms
    document.querySelectorAll('form').forEach(form => form.reset());

    // Resetar progress bars
    document.querySelectorAll('.progress-fill').forEach(fill => {
        fill.style.width = '0%';
    });

    // Resetar para step 1
    goToStep(1);
}

// ============================================
// HELPERS PARA INPUTS DINÂMICOS
// ============================================

function updatePainValue() {
    const painScale = document.getElementById('painScale');
    const painValue = document.getElementById('painValue');
    painValue.textContent = painScale.value;
}

function updatePriorityValue() {
    const priority = document.getElementById('priority');
    const priorityValue = document.getElementById('priorityValue');
    priorityValue.textContent = priority.value;
}

function toggleTrainingFrequency() {
    const trainingFrequencySection = document.getElementById('trainingFrequencySection');
    const inactiveSection = document.getElementById('inactiveSection');
    const currentlyTrains = document.querySelector('input[name="currentlyTrains"]:checked')?.value;

    if (currentlyTrains === 'sim') {
        trainingFrequencySection.style.display = 'block';
        inactiveSection.style.display = 'none';
    } else {
        trainingFrequencySection.style.display = 'none';
        inactiveSection.style.display = 'block';
    }
}

// ============================================
// MENU MOBILE
// ============================================

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');
    if (nav && headerActions) {
        nav.classList.toggle('active');
        headerActions.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');
    if (nav && headerActions) {
        nav.classList.remove('active');
        headerActions.classList.remove('active');
    }
}

// ============================================
// VALIDAÇÃO DE EMAIL
// ============================================

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Adicionar listeners para inputs dinamicos
    const currentlyTrainsRadios = document.querySelectorAll('input[name="currentlyTrains"]');
    currentlyTrainsRadios.forEach(radio => {
        radio.addEventListener('change', toggleTrainingFrequency);
    });

    // Validação de email em tempo real
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Fechar signup ao pressionar ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSignup();
        }
    });

    console.log('Meu Treino - Aplicação iniciada com sucesso');
});
