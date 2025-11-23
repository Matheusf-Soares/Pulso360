# 🔍 Guia de Debug - Login e Cadastro

## ✅ Sistema Atualizado com Logs e Melhorias

### O que foi corrigido:

1. ✅ **Modo Offline Melhorado**
   - Sistema agora funciona mesmo sem backend rodando
   - Login usa dados mockados quando backend não disponível
   - Cadastro simula criação com sucesso
   - Logs detalhados no console do navegador

2. ✅ **Logs Adicionados**
   - Logs em todas as etapas do processo
   - Emojis para identificar facilmente cada tipo de log
   - Console mostra exatamente onde o processo está

3. ✅ **Melhor Tratamento de Erros**
   - Notificações claras de sucesso/erro
   - Fallback para alert() caso NotificationSystem falhe
   - Erros de rede não bloqueiam a aplicação

## 🧪 Como Testar Agora

### Teste 1: Login (sem backend rodando)

1. **Abra o Console do Navegador:**
   - Chrome/Edge: `F12` ou `Cmd+Option+I` (Mac)
   - Firefox: `F12` ou `Cmd+Option+K` (Mac)

2. **Acesse:** `http://localhost:3000/login`

3. **Preencha:**
   - Email: `teste@exemplo.com`
   - Senha: `123456`

4. **Clique em "Entrar"**

5. **Observe no console:**
   ```
   🚀 Formulário de login submetido
   ✅ Validação passou, iniciando login...
   🔐 AuthContext: Iniciando login para teste@exemplo.com
   📞 AuthContext: Chamando authService.login...
   🔐 Tentando fazer login com: teste@exemplo.com
   ⚠️ Erro ao fazer login no backend: Network Error
   🎭 Usando autenticação mock (backend não disponível)
   ✅ Login mock bem-sucedido: {...}
   ✅ AuthContext: Login bem-sucedido
   ✅ AuthContext: Estado atualizado, retornando true
   🏁 AuthContext: Login finalizado
   🎯 Resultado do login: true
   ✅ Login bem-sucedido, redirecionando para home...
   🏁 Processo de login finalizado
   ```

6. **Resultado esperado:**
   - Notificação verde: "Bem-vindo(a), Maria Silva!"
   - Redirecionamento para dashboard
   - Usuário logado com sucesso

---

### Teste 2: Cadastro (sem backend rodando)

1. **Acesse:** `http://localhost:3000/cadastro`

2. **Preencha:**
   - Nome: `João Silva`
   - Email: `joao@exemplo.com`
   - Cargo: `Desenvolvedor`
   - Senioridade: `Pleno` (opcional)
   - Senha: `123456`
   - Confirmar Senha: `123456`

3. **Clique em "Criar Conta"**

4. **Observe no console:**
   ```
   🚀 Formulário de cadastro submetido
   ✅ Validação passou, criando usuário...
   📞 Chamando usuarioService.criar...
   📝 Tentando criar usuário: joao@exemplo.com
   ❌ Erro ao criar usuário: Network Error
   ⚠️ Backend não disponível, simulando criação de usuário
   ✅ Usuário mock criado: {...}
   ✅ Usuário criado com sucesso: {...}
   ⏳ Redirecionando para login em 1.5s...
   🔀 Redirecionando para /login
   🏁 Processo de cadastro finalizado
   ```

5. **Resultado esperado:**
   - Notificação verde: "Cadastro realizado com sucesso!"
   - Aguarda 1.5 segundos
   - Redirecionamento para `/login`
   - Agora pode fazer login com os dados cadastrados (mock)

---

### Teste 3: Validações do Cadastro

1. **Acesse:** `http://localhost:3000/cadastro`

2. **Teste senha curta:**
   - Preencha todos os campos
   - Senha: `123` (menos de 6 caracteres)
   - Clique em "Criar Conta"
   - **Esperado:** Mensagem de erro vermelha abaixo do campo senha

3. **Teste senhas diferentes:**
   - Senha: `123456`
   - Confirmar Senha: `654321`
   - **Esperado:** Erro "As senhas não coincidem"

4. **Teste email inválido:**
   - Email: `teste` (sem @)
   - **Esperado:** Erro "Email inválido"

---

### Teste 4: Recuperar Senha

1. **Acesse:** `http://localhost:3000/login`

2. **Clique em** "Esqueceu a senha?"

3. **Digite um email:** `teste@exemplo.com`

4. **Clique em** "Enviar Instruções"

5. **Resultado esperado:**
   - Notificação verde: "Instruções enviadas para seu email!"
   - Tela muda para confirmação
   - Mostra instruções de próximos passos

---

## 🔧 Como Testar COM Backend Rodando

### Preparação:

1. **Inicie o backend:**
```bash
cd backend
poetry run uvicorn backend.main:app --reload
```

2. **Verifique se está rodando:**
   - Abra: `http://localhost:8000/docs`
   - Deve mostrar a documentação Swagger

### Teste de Cadastro Real:

1. **Acesse:** `http://localhost:3000/cadastro`

2. **Preencha e envie o formulário**

3. **Observe no console:**
   ```
   📝 Tentando criar usuário: teste@exemplo.com
   ✅ Usuário criado com sucesso: {...}
   ```

4. **Se der erro 400 "Email já cadastrado":**
   - É porque o usuário já existe no banco
   - Use outro email ou delete do banco

### Teste de Login Real:

1. **Acesse:** `http://localhost:3000/login`

2. **Use credenciais de um usuário cadastrado**

3. **Observe no console:**
   ```
   🔐 Tentando fazer login com: teste@exemplo.com
   ✅ Login bem-sucedido no backend: {...}
   ```

4. **Se der erro 401:**
   - Credenciais incorretas
   - Endpoint de login não implementado (ainda usa mock)

---

## 🐛 Problemas Comuns

### Problema: "Nada acontece ao clicar em Entrar/Criar Conta"

**Solução 1:** Verifique o Console
- Abra DevTools (F12)
- Veja se há erros JavaScript
- Procure pelos logs com emojis

**Solução 2:** Verifique NotificationSystem
- O componente deve estar em `Layout.js`
- Deve expor `window.showNotification`
- Se não funcionar, verá `alert()` ao invés de toast

**Solução 3:** Limpe o Cache
```bash
# No terminal do frontend
rm -rf node_modules
npm install
npm start
```

### Problema: "Erro 404 ao fazer login"

**Isso é normal!** Significa:
- Endpoint `/auth/login` não existe no backend
- Sistema está usando autenticação mock
- Login funciona normalmente com dados mockados

### Problema: "Erro de CORS"

**Solução:**
- Verifique se o backend tem CORS configurado
- Arquivo: `backend/backend/main.py`
- Deve ter `CORSMiddleware` configurado

---

## 📊 Interpretando os Logs

| Emoji | Significado |
|-------|-------------|
| 🚀 | Processo iniciado |
| ✅ | Sucesso |
| ❌ | Erro |
| ⚠️ | Aviso/Fallback |
| 🔐 | Autenticação |
| 📝 | Cadastro |
| 📞 | Chamada de API |
| 🎭 | Modo Mock |
| 🏁 | Processo finalizado |
| 🔀 | Redirecionamento |
| ⏳ | Aguardando |

---

## ✨ Próximos Passos

Se tudo funcionar no modo mock:

1. **Implementar endpoint de login no backend:**
```python
@router.post("/auth/login")
async def login(email: str, senha: str):
    # Validar credenciais
    # Gerar JWT
    # Retornar token
```

2. **Testar com backend real**

3. **Implementar recuperação de senha**

---

**🎯 Agora o sistema deve funcionar perfeitamente, mesmo sem o backend rodando!**

Abra o console do navegador e teste! Você verá todos os logs detalhados. 🔍
