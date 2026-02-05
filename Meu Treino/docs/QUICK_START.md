# Quick Start - Meu Treino

Comece em 2 minutos.

## 1️⃣ Abrir Localmente

### Opção A: Direto no Navegador
Simplesmente clique duplo em `index.html` (recomendado para testes rápidos)

### Opção B: Com Live Server (Recomendado)
```bash
# VS Code: Instale extensão "Live Server"
# Clique direito em index.html > "Open with Live Server"

# Ou via terminal:
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 2️⃣ Explorar

1. **Homepage**: Veja hero section, recursos e planos
2. **Modal Login**: Clique em "Entrar"
3. **Signup**: Clique em "Começar grátis" ou qualquer CTA
4. **Preencher Formulário**: 9 etapas com validações
5. **Sucesso**: Veja mensagem de confirmação

## 3️⃣ Dados do Formulário

Os dados são salvos **automaticamente** no navegador:
```javascript
// Abra o console (F12) e execute:
const dados = JSON.parse(localStorage.getItem('meuTreinoFormData'));
console.log(dados);
```

## 📱 Testar Responsividade

- **Desktop**: 1920px+
- **Tablet**: 768px-1024px  
- **Mobile**: < 768px
- **Inspect**: F12 > Toggle Device Toolbar (Ctrl+Shift+M)

## ⚙️ Configurar Backend

### Mudar URL da API
Edite `config.js`:
```javascript
API: {
    LOCAL: {
        BASE_URL: 'http://seu-servidor:3000', // ← AQUI
        TIMEOUT: 10000,
    },
}
```

### Testar Conexão
```javascript
// No console:
console.log(window.MeuTreinoConfig.getAPIUrl());
```

## 🔍 Validações

| Campo | Validação |
|-------|-----------|
| Email | Formato válido |
| Senha | Min 6 caracteres |
| Confirmação | Deve ser igual |
| Idade | 13-120 anos |
| Altura | 100-250 cm |
| Peso | 20-300 kg |

## 🎨 Personalizações

### Mudar Cor Primária
Edite `css/style.css`:
```css
:root {
    --primary: #DC143C;        /* ← Vermelho */
    --primary-dark: #B22222;   /* ← Vermelho Escuro */
}
```

### Mudar Imagem da Hero
Edite `index.html` linha ~140:
```html
<img src="NOVA_URL_AQUI" alt="Treino personalizado">
```

## 📂 Estrutura

```
Meu Treino/
├── index.html           ← Página principal
├── config.js            ← Configuração
├── css/
│   ├── style.css        ← Estilos
│   └── responsive.css   ← Mobile
├── js/
│   ├── main.js          ← Lógica
│   └── form-handler.js  ← Formulário + API
├── README.md            ← Documentação completa
├── BACKEND_INTEGRATION.md ← Para integrar backend
└── QUICK_START.md       ← Este arquivo
```

## 🐛 Debug

### Console do Navegador (F12)
```javascript
// Ver dados do formulário
console.log(window.MeuTreino.formManager.formData);

// Ver configuração
console.log(window.MeuTreino.API_CONFIG);

// Validar força de senha
const strength = window.MeuTreino.formManager.validatePasswordStrength('Senha@123');
console.log(strength);
```

## 🚀 Próximos Passos

1. **Backend**: Siga `BACKEND_INTEGRATION.md`
2. **Deploy**: Hospede em Vercel, Netlify, etc
3. **Customizar**: Ajuste cores, textos, imagens
4. **Mobile App**: Use React Native ou Flutter

## ✅ Checklist

- [ ] Abri o projeto localmente
- [ ] Preenchum formulário de teste
- [ ] Verifiquei dados no localStorage
- [ ] Testei responsividade em mobile
- [ ] Configurei URL da API
- [ ] Li documentação completa (README.md)

## 📞 Suporte

Se tiver dúvidas:
1. Leia `README.md` - Documentação completa
2. Leia `BACKEND_INTEGRATION.md` - Para integração backend
3. Abra Console (F12) - Ver logs e erros
4. Verifique `config.js` - Configurações globais

## 🎉 Pronto!

Você tem um frontend profissional e pronto para produção. Agora é só integrar o backend!

Boa sorte! 🚀
