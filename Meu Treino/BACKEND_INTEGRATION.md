# Guia de Integração Backend - Meu Treino

Este documento descreve como integrar o frontend do Meu Treino com seu backend.

## 🔌 Configuração Inicial

### 1. Configurar URL da API

Edite `config.js` e configure a URL do seu servidor:

```javascript
// config.js
const MeuTreinoConfig = {
    ENV: 'development', // Altere para 'staging' ou 'production' conforme necessário
    API: {
        LOCAL: {
            BASE_URL: 'http://localhost:3000', // Altere para seu servidor
            TIMEOUT: 10000,
        },
        // ... outras configurações
    }
};
```

### 2. Requisitos de CORS

Configure CORS no seu backend:

```javascript
// Exemplo com Express.js
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000', 'https://seu-dominio.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 📊 Estrutura de Dados

### Modelo de Usuário (Registration)

```json
{
  "fullName": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "profileType": "cliente|trainer|admin",
  "age": "number",
  "gender": "masculino|feminino|outro",
  "profession": "string",
  "contact": "string",
  "sitTime": "menos2|2a4|4a6|6a8|mais8",
  "height": "number (cm)",
  "weight": "number (kg)",
  "bodyImage": "abaixoPeso|pesoNormal|sobrepeso|obeso|naoSei",
  "targetRegions": ["string"],
  "currentlyTrains": "sim|nao",
  "trainingFrequency": "1x|2x|3x|4x|5x|6x",
  "trainingTypes": ["string"],
  "inactiveTime": "naoEstouParado|menos1mes|1a3meses|3a6meses|6a12meses|mais1ano",
  "currentPains": "string",
  "painScale": "number (0-10)",
  "injuries": "string",
  "surgeries": "string",
  "medicalRestriction": "sim|nao",
  "medicalApproval": "sim|nao",
  "jointProblems": ["string"],
  "mainGoal": "string",
  "secondaryGoal": "string",
  "deadline": "string",
  "priority": "number (1-5)",
  "specificEvent": "string",
  "sleepHours": "string",
  "foodQuality": "string",
  "waterIntake": "string",
  "stressLevel": "string",
  "substanceUse": "string",
  "mainMotivation": "string",
  "instructionStyle": "detalhado|diretoAoPonto",
  "trainingLocation": "string",
  "sessionDuration": "string",
  "preferredTime": "manha|tarde|noite",
  "trainingType": "string",
  "finalComments": "string",
  "submittedAt": "ISO 8601 datetime"
}
```

## 🔐 Autenticação

### JWT Token Flow

1. **Register**: Usuario se registra e recebe tokens
2. **Login**: Usuario faz login e recebe tokens
3. **Refresh**: Token expirado é renovado

### Response de Autenticação

```json
{
  "success": true,
  "message": "Registro realizado com sucesso",
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "string",
      "email": "string",
      "profileType": "cliente|trainer|admin"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 3600
  }
}
```

### Usar Token no Frontend

```javascript
// Em form-handler.js ou main.js
fetch(`${API_CONFIG.BASE_URL}/api/users/profile`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
});
```

## 🚀 Endpoints Esperados

### Autenticação

#### POST `/api/v1/auth/register`
Registra novo usuário

**Request:**
```json
{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "password": "Senha@123",
  "profileType": "cliente",
  // ... dados completos do formulário
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

**Response (400/409):**
```json
{
  "success": false,
  "error": "Email já registrado"
}
```

#### POST `/api/v1/auth/login`
Faz login do usuário

**Request:**
```json
{
  "email": "joao@example.com",
  "password": "Senha@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresIn": 3600
  }
}
```

#### POST `/api/v1/auth/refresh`
Renova access token

**Request:**
```json
{
  "refreshToken": "..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "expiresIn": 3600
  }
}
```

### Usuários

#### GET `/api/v1/users/profile`
Obter perfil do usuário autenticado

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { ... dados completos ... }
  }
}
```

#### PUT `/api/v1/users/:id`
Atualizar dados do usuário

**Request:**
```json
{
  "height": 180,
  "weight": 80,
  // ... campos a atualizar
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Perfil atualizado com sucesso"
}
```

## 💾 Padrão de Response

Todos os endpoints devem seguir este padrão:

**Sucesso (2xx):**
```json
{
  "success": true,
  "message": "Mensagem descritiva",
  "data": {
    // Dados da resposta
  }
}
```

**Erro (4xx/5xx):**
```json
{
  "success": false,
  "error": "Mensagem de erro",
  "code": "ERROR_CODE",
  "details": {
    // Detalhes adicionais (opcional)
  }
}
```

## 🔒 Validações Esperadas no Backend

### Obrigatório Validar
- ✅ Email único (não duplicado)
- ✅ Senha forte (8+ chars, maiúscula, minúscula, números, especiais)
- ✅ Email válido (RFC 5322)
- ✅ Idade (13-120 anos)
- ✅ Altura (100-250 cm)
- ✅ Peso (20-300 kg)
- ✅ Campos obrigatórios
- ✅ Tamanho máximo de strings
- ✅ Enums válidos para selects

### Recomendado
- ⚠️ Rate limiting por IP
- ⚠️ Proteção contra SQL injection
- ⚠️ Proteção contra CSRF
- ⚠️ Sanitização de inputs
- ⚠️ Log de atividades

## 📝 Exemplo de Implementação (Node.js + Express)

```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/v1/auth/register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, profileType, ...otherData } = req.body;

        // Validar email único
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'Email já registrado'
            });
        }

        // Hash de senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar usuário
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profileType,
            ...otherData
        });

        // Gerar tokens
        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profileType: user.profileType
                },
                accessToken,
                refreshToken,
                expiresIn: 3600
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao registrar usuário'
        });
    }
});

module.exports = router;
```

## 🧪 Testes

### Teste o Endpoint Localmente

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva",
    "email": "joao@example.com",
    "password": "Senha@123",
    "profileType": "cliente"
  }'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "Senha@123"
  }'
```

### Teste via Browser Console

```javascript
// No console do navegador
const formData = window.MeuTreino.formManager.formData;
fetch('http://localhost:3000/api/v1/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(res => res.json())
.then(data => console.log(data));
```

## 📦 Variáveis de Ambiente (.env)

```
# Ambiente
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/meutreino
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_secreta_aqui
REFRESH_TOKEN_SECRET=sua_chave_refresh_aqui

# Email (para verificação)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app

# Frontend
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

## 🚨 Tratamento de Erros

O frontend espera códigos HTTP específicos:

- `200/201`: Sucesso
- `400`: Validação falhou
- `401`: Não autenticado
- `403`: Não autorizado
- `404`: Recurso não encontrado
- `409`: Conflito (ex: email duplicado)
- `500`: Erro do servidor

## 🔄 Fluxo Completo

1. Usuário preenche formulário
2. Frontend valida dados
3. Frontend envia POST `/api/v1/auth/register`
4. Backend valida novamente
5. Backend cria usuário e gera tokens
6. Frontend recebe tokens
7. Frontend armazena tokens em localStorage/sessionStorage
8. Usuário redirecionado para dashboard

## 📚 Recursos Adicionais

- [JWT.io](https://jwt.io) - Debugar tokens
- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Postman](https://www.postman.com) - Testar APIs

---

**Desenvolvido com foco em escalabilidade e segurança.**
