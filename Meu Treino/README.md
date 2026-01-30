# Meu Treino - Plataforma de Treino Personalizado

Uma plataforma moderna e responsiva para gerenciamento de treinos personalizados, inspirada em BetterMe, com identidade própria e pronta para integração backend.

## 📋 Características

### Design e UX
- ✅ Visual moderno e profissional
- ✅ Paleta de cores: Vermelho (primário), Preto (base), Branco (contraste)
- ✅ Animações sutis e microinterações
- ✅ Zero poluição visual
- ✅ Mobile-first e responsivo
- ✅ Tipografia moderna e legível

### Funcionalidades Frontend
- ✅ Header com navegação e CTAs
- ✅ Hero section com destaque do valor
- ✅ Seção de Recursos (6 recursos principais)
- ✅ Seção de Planos (Cliente, Personal Trainer, Administrador)
- ✅ Modal de Login
- ✅ Formulário Multi-step de Cadastro (9 etapas)
- ✅ Validações em tempo real
- ✅ Barra de progresso
- ✅ Auto-save no localStorage
- ✅ Mensagem de sucesso
- ✅ Footer com links

### Estrutura do Formulário (9 Etapas)

1. **Criação de Conta**
   - Nome, Email, Senha, Confirmação de Senha
   - Tipo de Perfil (Cliente/Personal Trainer)

2. **Identificação**
   - Idade, Gênero, Profissão, Contato
   - Tempo sentado por dia

3. **Composição Corporal**
   - Altura, Peso, Auto-avaliação
   - Regiões a melhorar (multi-select)

4. **Histórico de Treino**
   - Treina atualmente? (Sim/Não)
   - Frequência e tipos de treino (condicional)
   - Tempo de inatividade (condicional)

5. **Limitações e Segurança**
   - Dores atuais, escala de dor
   - Lesões, Cirurgias
   - Restrições médicas, Liberação médica
   - Problemas articulares

6. **Objetivos**
   - Objetivo principal e secundário
   - Prazo desejado
   - Prioridade (1-5)
   - Evento específico

7. **Hábitos e Comportamento**
   - Horas de sono, qualidade alimentar
   - Consumo de água, nível de estresse
   - Uso de álcool/cigarro
   - Motivação principal, preferência de instrução

8. **Logística de Treino**
   - Local de treino, duração da sessão
   - Horário preferido, tipo de treino

9. **Comentários Finais**
   - Campo livre para observações

## 📁 Estrutura do Projeto

```
Meu Treino/
├── index.html              # Página principal
├── css/
│   ├── style.css           # Estilos principais
│   └── responsive.css      # Media queries e responsividade
├── js/
│   ├── main.js             # Lógica principal (navegação, validação)
│   └── form-handler.js     # Gerenciador avançado de formulário e integração API
├── assets/                 # Imagens e recursos
└── README.md               # Este arquivo
```

## 🚀 Como Usar

### Abrir no Navegador
1. Abra `index.html` em qualquer navegador moderno
2. Navegue pelas seções ou clique em "Começar grátis"
3. Preencha o formulário multi-step
4. Os dados são salvos automaticamente no localStorage

### Desenvolvimento Local
```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (http-server)
npx http-server

# Opção 3: VS Code Live Server
# Extensão "Live Server" do VS Code
```

Acesse: `http://localhost:8000`

## 🔧 Integração Backend

### API Endpoints Preparados

O arquivo `js/form-handler.js` está pronto para integração com backend.

**Configurar Base URL:**
```javascript
// Em form-handler.js, linha 12
API_CONFIG.BASE_URL = 'https://sua-api.com';
```

**Endpoint esperado:**
```
POST /api/users/register
Content-Type: application/json

Body: {
  fullName, email, password, profileType,
  age, gender, profession, contact, sitTime,
  height, weight, bodyImage, targetRegions,
  currentlyTrains, trainingFrequency, trainingTypes,
  currentPains, painScale, injuries, surgeries,
  medicalRestriction, medicalApproval, jointProblems,
  mainGoal, secondaryGoal, deadline, priority, specificEvent,
  sleepHours, foodQuality, waterIntake, stressLevel, substanceUse,
  mainMotivation, instructionStyle,
  trainingLocation, sessionDuration, preferredTime, trainingType,
  finalComments,
  submittedAt
}
```

### Usar FormManager

```javascript
// Coletar dados
const data = formManager.formData;

// Validar
const validation = formManager.validateCompleteForm(data);
if (validation.isValid) {
  // Enviar para backend
  await formManager.submitToBackend(data);
}

// Gerar resumo
const summary = formManager.generateSummary(data);
console.log(summary);
```

## 🎨 Paleta de Cores

```css
--primary: #DC143C        /* Vermelho Crimson */
--primary-dark: #B22222   /* Vermelho Escuro */
--black: #000000
--white: #FFFFFF
--gray-dark: #1a1a1a
--gray-light: #f5f5f5
--gray-medium: #999999
```

## 📱 Responsividade

- **Desktop**: Layout completo com 2 colunas na hero
- **Tablets (1024px)**: Grid 2 colunas em recursos/planos
- **Mobile (768px)**: Layout single column, navegação colapsável
- **Small Mobile (480px)**: Otimizado para telas pequenas
- **Landscape**: Ajustes para modo paisagem

## ✅ Validações Implementadas

### Frontend
- ✅ Verificação de senhas iguais
- ✅ Força de senha
- ✅ Validação de email
- ✅ Faixas de valores (idade, altura, peso)
- ✅ Campos obrigatórios por etapa
- ✅ Multi-select obrigatório

### Backend Ready
- ✅ Estrutura preparada para validação server-side
- ✅ Tratamento de erros HTTP
- ✅ Timeout em requisições
- ✅ Armazenamento seguro de dados

## 💾 Armazenamento de Dados

### LocalStorage (Development)
Os dados do formulário são salvos automaticamente:
```javascript
localStorage.getItem('meuTreinoFormData')
```

### Backend (Production)
Configure a URL da API em `form-handler.js` para enviar dados ao servidor.

## 🔐 Segurança

### Implementado
- ✅ Validação de inputs
- ✅ Sanitização básica de dados
- ✅ Verificação de email válido

### Recomendações para Backend
- ⚠️ HTTPS obrigatório
- ⚠️ CORS configurado corretamente
- ⚠️ Validação server-side de todos os campos
- ⚠️ Hash de senhas (bcrypt, argon2)
- ⚠️ Rate limiting
- ⚠️ Token JWT para autenticação

## 📊 Funcionalidades Avançadas do FormManager

```javascript
// Calcular IMC
const bmi = formManager.calculateBMI(80, 180); // 24.7

// Classificar IMC
const classification = formManager.classifyBMI(bmi); // "Peso normal"

// Validar força de senha
const strength = formManager.validatePasswordStrength('Senha@123');
// { score: 5, messages: [] }

// Gerar resumo completo
const summary = formManager.generateSummary(data);
```

## 🌐 Recursos (Imagens do Unsplash)

A imagem da hero section é carregada do Unsplash:
```
https://images.unsplash.com/photo-1534438327276-14e5300c3a48
```

Para produção, você pode:
1. Substituir por suas próprias imagens
2. Usar outras imagens do Unsplash
3. Implementar upload de imagens

## 📝 Logs e Debug

Abra o Console do Navegador (F12) para ver:
- ✅ Logs de inicialização
- ✅ Validações de formulário
- ✅ Dados coletados por etapa
- ✅ Resumo completo do formulário
- ✅ Erros e avisos

```javascript
// Acessar dados do formulário
console.log(window.MeuTreino.formManager.formData);

// Acessar configuração de API
console.log(window.MeuTreino.API_CONFIG);
```

## 🚧 Próximos Passos (Backend)

1. **Criar API REST** (Node.js, Python, etc.)
2. **Implementar autenticação** (JWT)
3. **Dashboard de usuário**
4. **Sistema de criação de treinos**
5. **Chat em tempo real**
6. **Analytics e reportes**
7. **Mobile App (React Native, Flutter)**

## 🤝 Contribuindo

Para melhorias e sugestões:
1. Teste em diferentes navegadores
2. Reporte bugs e melhorias
3. Documente novas features

## 📄 Licença

Projeto desenvolvido com foco em qualidade e scalabilidade.

---

**Desenvolvido com ❤️ para transformar vidas através do treino personalizado.**
