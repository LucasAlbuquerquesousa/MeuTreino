/**
 * Meu Treino - Configuração Global
 * Centralize todas as configurações da aplicação aqui
 */

const MeuTreinoConfig = {
    // ============================================
    // AMBIENTE
    // ============================================
    ENV: 'development', // 'development', 'staging', 'production'
    DEBUG: true,

    // ============================================
    // API
    // ============================================
    API: {
        // Para desenvolvimento local
        LOCAL: {
            BASE_URL: 'http://localhost:3000',
            TIMEOUT: 10000,
        },
        // Para staging
        STAGING: {
            BASE_URL: 'https://staging-api.meutreino.com',
            TIMEOUT: 15000,
        },
        // Para produção
        PRODUCTION: {
            BASE_URL: 'https://api.meutreino.com',
            TIMEOUT: 20000,
        }
    },

    // ============================================
    // ENDPOINTS
    // ============================================
    ENDPOINTS: {
        // Autenticação
        REGISTER: '/api/v1/auth/register',
        LOGIN: '/api/v1/auth/login',
        LOGOUT: '/api/v1/auth/logout',
        VERIFY_EMAIL: '/api/v1/auth/verify-email',
        REFRESH_TOKEN: '/api/v1/auth/refresh',

        // Usuários
        GET_USER: '/api/v1/users/:id',
        UPDATE_USER: '/api/v1/users/:id',
        GET_PROFILE: '/api/v1/users/profile',
        UPDATE_PROFILE: '/api/v1/users/profile',

        // Treinos
        GET_WORKOUTS: '/api/v1/workouts',
        CREATE_WORKOUT: '/api/v1/workouts',
        GET_WORKOUT: '/api/v1/workouts/:id',
        UPDATE_WORKOUT: '/api/v1/workouts/:id',
        DELETE_WORKOUT: '/api/v1/workouts/:id',

        // Progresso
        GET_PROGRESS: '/api/v1/progress',
        SAVE_PROGRESS: '/api/v1/progress',
        GET_METRICS: '/api/v1/metrics',

        // Comunicação
        SEND_MESSAGE: '/api/v1/messages',
        GET_MESSAGES: '/api/v1/messages',

        // Admin
        GET_USERS: '/api/v1/admin/users',
        GET_REPORTS: '/api/v1/admin/reports',
        GET_ANALYTICS: '/api/v1/admin/analytics',
    },

    // ============================================
    // VALIDAÇÕES
    // ============================================
    VALIDATION: {
        PASSWORD: {
            MIN_LENGTH: 8,
            MAX_LENGTH: 128,
            REQUIRE_UPPERCASE: true,
            REQUIRE_LOWERCASE: true,
            REQUIRE_NUMBERS: true,
            REQUIRE_SPECIAL: true,
            SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:",.<>?/',
        },
        EMAIL: {
            MIN_LENGTH: 5,
            MAX_LENGTH: 255,
            PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        NAME: {
            MIN_LENGTH: 3,
            MAX_LENGTH: 100,
        },
        AGE: {
            MIN: 13,
            MAX: 120,
        },
        HEIGHT: {
            MIN: 100, // cm
            MAX: 250, // cm
        },
        WEIGHT: {
            MIN: 20, // kg
            MAX: 300, // kg
        }
    },

    // ============================================
    // CATEGORIAS E OPÇÕES
    // ============================================
    OPTIONS: {
        PROFILE_TYPES: {
            CLIENTE: 'cliente',
            TRAINER: 'trainer',
            ADMIN: 'admin',
        },
        GENDERS: {
            MALE: 'masculino',
            FEMALE: 'feminino',
            OTHER: 'outro',
        },
        SIT_TIME: {
            LESS_2: 'menos2',
            BETWEEN_2_4: '2a4',
            BETWEEN_4_6: '4a6',
            BETWEEN_6_8: '6a8',
            MORE_8: 'mais8',
        },
        BODY_IMAGE: {
            UNDERWEIGHT: 'abaixoPeso',
            NORMAL: 'pesoNormal',
            OVERWEIGHT: 'sobrepeso',
            OBESE: 'obeso',
            NOT_SURE: 'naoSei',
        },
        TARGET_REGIONS: {
            CHEST: 'peito',
            SHOULDERS: 'ombros',
            ABS: 'abdomen',
            HAMSTRING: 'posteriorCoxa',
            CALVES: 'panturrilhas',
            POSTURE: 'postura',
            BACK: 'costas',
            ARMS: 'bracos',
            QUADRICEPS: 'quadriceps',
            GLUTES: 'gluteos',
            MOBILITY: 'mobilidade',
        },
        TRAINING_FREQUENCY: {
            ONE_X: '1x',
            TWO_X: '2x',
            THREE_X: '3x',
            FOUR_X: '4x',
            FIVE_X: '5x',
            SIX_PLUS: '6x',
        },
        TRAINING_TYPES: {
            MUSCULACAO: 'musculacao',
            CROSSFIT: 'crossfit',
            LUTAS: 'lutas',
            YOGA: 'yoga',
            ESPORTES_COLETIVOS: 'esportesColetivos',
            FUNCIONAL: 'funcional',
            CORRIDA: 'corrida',
            PILATES: 'pilates',
            HIIT: 'hiit',
        },
        GOALS: {
            EMAGRECIMENTO: 'emagrecimento',
            HIPERTROFIA: 'hipertrofia',
            SAUDE: 'saude',
            CONDICIONAMENTO: 'condicionamento',
            PERFORMANCE: 'performance',
            MOBILIDADE: 'mobilidade',
        },
        DEADLINES: {
            ONE_MONTH: '1mes',
            THREE_MONTHS: '3meses',
            SIX_MONTHS: '6meses',
            ONE_YEAR: '1ano',
            NO_DEADLINE: 'semPrazo',
        },
        SLEEP_HOURS: {
            LESS_5: 'menos5',
            BETWEEN_5_6: '5a6',
            BETWEEN_6_7: '6a7',
            BETWEEN_7_8: '7a8',
            EIGHT_PLUS: 'mais8',
        },
        FOOD_QUALITY: {
            VERY_BAD: 'muitoRuim',
            BAD: 'ruim',
            REGULAR: 'regular',
            GOOD: 'boa',
            VERY_GOOD: 'muitoBoa',
        },
        WATER_INTAKE: {
            LESS_1L: 'menos1L',
            BETWEEN_1_2L: '1a2L',
            BETWEEN_2_3L: '2a3L',
            MORE_3L: 'mais3L',
        },
        STRESS_LEVEL: {
            LOW: 'baixo',
            MODERATE: 'moderado',
            HIGH: 'alto',
        },
        SUBSTANCE_USE: {
            NONE: 'naoConsumo',
            ALCOHOL_OCCASIONAL: 'alcoolOcasional',
            ALCOHOL_FREQUENT: 'alcoolFrequente',
            CIGARRO_OCCASIONAL: 'cigarroOcasional',
            CIGARRO_FREQUENT: 'cigarroFrequente',
            BOTH: 'ambos',
        },
        MOTIVATION: {
            RESULTS: 'resultados',
            HEALTH: 'saude',
            AESTHETICS: 'estetica',
            DISCIPLINE: 'disciplina',
            WELLBEING: 'bemEstar',
            PERFORMANCE: 'performance',
        },
        INSTRUCTION_STYLE: {
            DETAILED: 'detalhado',
            DIRECT: 'diretoAoPonto',
        },
        TRAINING_LOCATION: {
            GYM: 'academia',
            HOME: 'casa',
            STUDIO: 'estudio',
            OUTDOOR: 'arLivre',
            CONDOMINIUM: 'condominio',
        },
        SESSION_DURATION: {
            THIRTY: '30min',
            FORTY_FIVE: '45min',
            SIXTY: '60min',
            NINETY: '90min',
        },
        PREFERRED_TIME: {
            MORNING: 'manha',
            AFTERNOON: 'tarde',
            EVENING: 'noite',
        },
        TRAINING_TYPE_PREF: {
            MUSCULACAO: 'musculacao',
            FUNCIONAL: 'funcional',
            CARDIO: 'cardio',
            MOBILIDADE: 'mobilidade',
            HIIT: 'hiit',
            MIX: 'mixCombinado',
        },
    },

    // ============================================
    // MENSAGENS
    // ============================================
    MESSAGES: {
        SUCCESS: {
            REGISTRATION: 'Cadastro realizado com sucesso!',
            LOGIN: 'Login realizado com sucesso!',
            WORKOUT_CREATED: 'Treino criado com sucesso!',
            PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
        },
        ERROR: {
            REGISTRATION_FAILED: 'Erro ao realizar cadastro. Tente novamente.',
            EMAIL_ALREADY_REGISTERED: 'Este email já está registrado.',
            INVALID_CREDENTIALS: 'Email ou senha incorretos.',
            NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
            SERVER_ERROR: 'Erro do servidor. Tente novamente mais tarde.',
        },
        VALIDATION: {
            PASSWORD_MISMATCH: 'Senhas não conferem.',
            WEAK_PASSWORD: 'Senha muito fraca.',
            INVALID_EMAIL: 'Email inválido.',
            INVALID_AGE: 'Idade inválida.',
            MISSING_FIELDS: 'Preencha todos os campos obrigatórios.',
        }
    },

    // ============================================
    // CORES
    // ============================================
    COLORS: {
        PRIMARY: '#DC143C',
        PRIMARY_DARK: '#B22222',
        BLACK: '#000000',
        WHITE: '#FFFFFF',
        GRAY_DARK: '#1a1a1a',
        GRAY_LIGHT: '#f5f5f5',
        GRAY_MEDIUM: '#999999',
        SUCCESS: '#4CAF50',
        ERROR: '#f44336',
        WARNING: '#FF9800',
        INFO: '#2196F3',
    },

    // ============================================
    // TIPOGRAFIA
    // ============================================
    TYPOGRAPHY: {
        FONT_FAMILY: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        FONT_WEIGHTS: {
            LIGHT: 300,
            NORMAL: 400,
            MEDIUM: 500,
            SEMI_BOLD: 600,
            BOLD: 700,
            EXTRA_BOLD: 800,
        },
        SIZES: {
            XS: '12px',
            SM: '14px',
            MD: '16px',
            LG: '18px',
            XL: '20px',
            XXL: '24px',
            XXXL: '32px',
            TITLE: '48px',
        }
    },

    // ============================================
    // BREAKPOINTS
    // ============================================
    BREAKPOINTS: {
        MOBILE_S: 320,
        MOBILE_M: 375,
        MOBILE_L: 425,
        TABLET: 768,
        DESKTOP: 1024,
        DESKTOP_L: 1440,
        DESKTOP_XL: 1920,
    },

    // ============================================
    // RATE LIMITING
    // ============================================
    RATE_LIMIT: {
        REGISTER_ATTEMPTS: 5,
        REGISTER_WINDOW: 3600000, // 1 hora
        LOGIN_ATTEMPTS: 5,
        LOGIN_WINDOW: 900000, // 15 minutos
    },

    // ============================================
    // STORAGE
    // ============================================
    STORAGE: {
        FORM_DATA_KEY: 'meuTreinoFormData',
        USER_DATA_KEY: 'meuTreinoUser',
        AUTH_TOKEN_KEY: 'meuTreinoAuthToken',
        REFRESH_TOKEN_KEY: 'meuTreinoRefreshToken',
    },

    // ============================================
    // MÉTODOS UTILITÁRIOS
    // ============================================

    /**
     * Obter API config baseado no ambiente
     */
    getAPIConfig() {
        return this.API[this.ENV.toUpperCase()] || this.API.LOCAL;
    },

    /**
     * Obter URL completa da API
     */
    getAPIUrl() {
        return this.getAPIConfig().BASE_URL;
    },

    /**
     * Obter timeout da API
     */
    getAPITimeout() {
        return this.getAPIConfig().TIMEOUT;
    },

    /**
     * Log condicional (apenas em desenvolvimento)
     */
    log(...args) {
        if (this.DEBUG) {
            console.log('[MeuTreino]', ...args);
        }
    },

    /**
     * Log de erro
     */
    error(...args) {
        console.error('[MeuTreino ERROR]', ...args);
    },

    /**
     * Log de aviso
     */
    warn(...args) {
        if (this.DEBUG) {
            console.warn('[MeuTreino WARN]', ...args);
        }
    },
};

// ============================================
// EXPORTAR PARA USO GLOBAL
// ============================================

window.MeuTreinoConfig = MeuTreinoConfig;

// Log de inicialização
MeuTreinoConfig.log('Configuração carregada', `Ambiente: ${MeuTreinoConfig.ENV}`);
