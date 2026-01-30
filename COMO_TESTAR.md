# Guia de Testes - Quiz e Formulário de Criação de Conta

## Como Testar as Alterações

### Método 1: Abrir direto no navegador

1. Abra `index.html` em seu navegador (duplo clique no arquivo)
2. Vá para a seção "Pronto para começar?"
3. Clique no botão "Criar conta gratuita"

### Método 2: Usar um servidor local (recomendado)

**Windows - PowerShell:**
```powershell
cd "c:\Users\silvi\OneDrive\Documentos\Paginas\Meu Treino"
python -m http.server 8000
```

**Windows - Command Prompt:**
```cmd
cd c:\Users\silvi\OneDrive\Documentos\Paginas\Meu Treino
python -m http.server 8000
```

Depois acesse: `http://localhost:8000`

## Cenários de Teste

### Teste 1: Validação de Campos Vazios

**Passos:**
1. Clique em "Criar conta gratuita"
2. Clique em "Continuar para formulário completo" (sem preencher nada)

**Resultado Esperado:**
- Alert dizendo "Por favor, digite seu nome completo"

### Teste 2: Validação de E-mail

**Passos:**
1. Clique em "Criar conta gratuita"
2. Preencha Nome: "João Silva"
3. Preencha E-mail: "email_invalido"
4. Clique em "Continuar"

**Resultado Esperado:**
- Alert dizendo "Por favor, digite um e-mail válido"

### Teste 3: Validação de Senha

**Passos:**
1. Complete Nome, E-mail corretamente
2. Preencha Senha: "123"
3. Clique em "Continuar"

**Resultado Esperado:**
- Alert dizendo "A senha deve ter no mínimo 6 caracteres"

### Teste 4: Confirmação de Senha Não Coincide

**Passos:**
1. Preencha todos os campos até Confirmação
2. Senha: "senha123"
3. Confirmação: "senha456"
4. Clique em "Continuar"

**Resultado Esperado:**
- Alert dizendo "As senhas não conferem"

### Teste 5: Tipo de Perfil Obrigatório

**Passos:**
1. Preencha todos os campos corretamente
2. Não selecione nenhum tipo de perfil
3. Clique em "Continuar"

**Resultado Esperado:**
- Alert dizendo "Por favor, selecione um tipo de perfil"

### Teste 6: Fluxo Completo de Sucesso

**Passos:**
1. Clique em "Criar conta gratuita"
2. Preencha:
   - Nome: "João Silva"
   - E-mail: "joao@example.com"
   - Senha: "senha123"
   - Confirmação: "senha123"
   - Tipo de Perfil: "Cliente"
3. Clique em "Continuar para formulário completo"

**Resultado Esperado:**
- ✓ Exibida mensagem "Conta criada com sucesso!"
- ✓ Ícone de sucesso (✓) em verde
- ✓ Botão "Continuar" visível

### Teste 7: Pré-preenchimento do Formulário

**Passos:**
1. Complete o fluxo do Teste 6
2. Clique em "Continuar" na mensagem de sucesso
3. Verifique a Etapa 1 - Identificação

**Resultado Esperado:**
- ✓ Campo "Nome completo" preenchido com "João Silva"
- ✓ Campo "E-mail" preenchido com "joao@example.com"
- ✓ Campos de Senha preenchidos
- ✓ Tipo de Perfil "Cliente" selecionado

### Teste 8: Fechar Modal

**Passos:**
1. Clique em "Criar conta gratuita"
2. Clique no botão × (fechar) no canto superior direito

**Resultado Esperado:**
- Modal fecha
- Volta à página principal

### Teste 9: Fechar Clicando Fora

**Passos:**
1. Clique em "Criar conta gratuita"
2. Clique fora do modal (na área escura)

**Resultado Esperado:**
- Modal fecha
- Volta à página principal

## Verificações Visuais

### Elementos do Quiz Modal

✓ **Cabeçalho:**
- Gradiente vermelho (de #DC143C para #B22222)
- Texto branco em contraste
- Título maior (28px)
- Encosta nas bordas laterais

✓ **Campos de Entrada:**
- Bordas de 2px sólidas (cinza)
- Padding confortável (12px 15px)
- Fundo branco
- Quando focado: borda vermelha + sombra suave

✓ **Opções de Radio:**
- Com bordas de 2px
- Padding dentro da opção
- Hover: borda vermelha + fundo leve
- Selecionado: texto em negrito vermelho

✓ **Botão:**
- Largura 100%
- Cor vermelha
- Hover: mais escuro + sombra

✓ **Mensagem de Sucesso:**
- Ícone ✓ em 60px, vermelho
- Título grande (26px)
- Espaçamento generoso
- Centrado

### Elementos do Formulário Detalhado

✓ **Títulos das Etapas:**
- 28px, em negrito
- Linha inferior em cinza
- Bom espaçamento

✓ **Perguntas e Opções:**
- Mesmo visual consistente
- Bordas em 2px
- Hover effects
- Estados selecionados destacados

## Testes em Diferentes Navegadores

### Chrome / Edge / Firefox
- Abra as Developer Tools (F12)
- Console deve estar vazio (sem errors)
- Visual deve ser consistente

### Mobile (Teste Responsivo)

**Passos:**
1. Abra o site no navegador
2. Aperte F12 para Developer Tools
3. Clique no ícone de dispositivo móvel
4. Teste o fluxo todo no modo mobile

**Esperado:**
- Modal ainda visível
- Campos acessíveis e clickáveis
- Sem scroll horizontal desnecessário

## Verificação de localStorage

**Para ver os dados salvos:**

1. Abra o DevTools (F12)
2. Vá para a aba "Application" ou "Storage"
3. Clique em "Local Storage"
4. Procure por `meuTreinoAccountData`

**Esperado:**
```json
{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "profileType": "cliente",
  "createdAt": "2025-01-29T..."
}
```

## Checklist de Conclusão

- [ ] Teste 1 passou
- [ ] Teste 2 passou
- [ ] Teste 3 passou
- [ ] Teste 4 passou
- [ ] Teste 5 passou
- [ ] Teste 6 passou
- [ ] Teste 7 passou
- [ ] Teste 8 passou
- [ ] Teste 9 passou
- [ ] Visual do header correto
- [ ] Bordas dos inputs visíveis
- [ ] Hover effects funcionando
- [ ] Radio buttons funcionam
- [ ] Modal fecha corretamente
- [ ] Dados persistem em localStorage
- [ ] Responsivo em mobile
- [ ] Sem errors no console

## Possíveis Issues e Soluções

### Issue: Modal não abre

**Solução:**
- Verifique se JavaScript está habilitado
- Verifique se `js/main.js` está carregado
- Abra o console (F12) e procure por errors

### Issue: Validações não funcionam

**Solução:**
- Limpe o cache (Ctrl+Shift+Del)
- Verifique se `main.js` foi salvo corretamente
- Reload a página (Ctrl+R ou Cmd+R)

### Issue: Visual errado (bordas não aparecem)

**Solução:**
- Limpe o cache do CSS
- Hard reload (Ctrl+Shift+R ou Cmd+Shift+R)
- Verifique se `style.css` foi editado corretamente

### Issue: Dados não salvam

**Solução:**
- Verifique se localStorage está habilitado
- Verifique no console se há erro de persistência
- Teste no DevTools → Application → Local Storage

## Relatório de Testes

Quando tiver finalizado todos os testes, crie um arquivo `RELATORIO_TESTES.txt` com:

```
Data: [data]
Navegador: [Chrome/Firefox/Safari/Edge] versão [X]
Testes Realizados: [9/9]
Problemas Encontrados: [Nenhum / Listar]
Status Final: ✓ APROVADO / ⚠️ COM RESSALVAS / ✗ FALHOU
Observações: [Adicione aqui se necessário]
```

## Próximas Etapas

Após os testes:

1. **Se tudo passou:**
   - Faça commit das alterações
   - Deploy para produção

2. **Se houver issues:**
   - Documente-as em um arquivo `ISSUES.md`
   - Entre em contato para suporte

## Contato para Suporte

Se encontrar algum problema:
1. Verifique este guia novamente
2. Procure por mensagens de erro no console
3. Tente limpar cache e reload
4. Se persistir, documente e abra uma issue
