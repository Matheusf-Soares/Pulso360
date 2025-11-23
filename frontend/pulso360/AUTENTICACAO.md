# 🔐 Sistema de Autenticação - Pulso360

## ✨ Funcionalidades Implementadas

### 1. 🚀 Página de Login (`/login`)
- Login com email e senha
- Opção "Lembrar-me"
- Link para recuperação de senha
- Link para criar nova conta
- Autenticação com JWT
- Fallback com dados mockados se backend não disponível

### 2. 📝 Página de Cadastro (`/cadastro`)
- Formulário completo de registro
- Validação em tempo real
- Campos obrigatórios:
  - Nome completo
  - Email corporativo
  - Cargo
  - Senha (mínimo 6 caracteres)
  - Confirmação de senha
- Campos opcionais:
  - Senioridade (dropdown)
- Mensagens de erro claras
- Integração com backend via `usuarioService.criar()`
- Redirecionamento automático para login após sucesso

### 3. 🔑 Página de Recuperação de Senha (`/recuperar-senha`)
- Formulário de recuperação por email
- Validação de email
- Tela de confirmação após envio
- Instruções claras de próximos passos
- Opção de reenviar email
- Link para voltar ao login

## 🎨 Design e UX

### Características Visuais:
- ✅ Design moderno com gradientes
- ✅ Cards com glassmorphism
- ✅ Animações suaves
- ✅ Responsivo (mobile-first)
- ✅ Feedback visual em tempo real
- ✅ Ícones emoji para melhor UX
- ✅ Estados de loading

### Validações:
- ✅ Email no formato correto
- ✅ Senha mínima de 6 caracteres
- ✅ Confirmação de senha deve coincidir
- ✅ Nome mínimo de 3 caracteres
- ✅ Campos obrigatórios destacados
- ✅ Mensagens de erro contextuais

## 🛣️ Fluxo de Navegação

```
┌─────────────────┐
│   /login        │ ─────► Login com credenciais
│                 │
│  Links:         │
│  • Cadastro     │ ─────► /cadastro
│  • Recuperar    │ ─────► /recuperar-senha
└─────────────────┘

┌─────────────────┐
│   /cadastro     │ ─────► Criar nova conta
│                 │
│  Após sucesso:  │
│  • Redirect to  │ ─────► /login
└─────────────────┘

┌─────────────────┐
│ /recuperar-senha│ ─────► Recuperar acesso
│                 │
│  Após enviar:   │
│  • Mostra tela  │ ─────► Confirmação
│    confirmação  │
└─────────────────┘
```

## 🔧 Como Usar

### Login:
1. Acesse `http://localhost:3000/login`
2. Digite email e senha
3. Clique em "Entrar"
4. Será redirecionado para o dashboard

### Cadastro:
1. Acesse `http://localhost:3000/cadastro` ou clique em "Criar conta" no login
2. Preencha todos os campos obrigatórios (*)
3. Clique em "Criar Conta"
4. Aguarde confirmação
5. Será redirecionado para o login

### Recuperar Senha:
1. Acesse `http://localhost:3000/recuperar-senha` ou clique em "Esqueceu a senha?" no login
2. Digite seu email
3. Clique em "Enviar Instruções"
4. Verifique seu email (em produção)

## 📱 Responsividade

Todas as páginas são totalmente responsivas:

- **Desktop** (> 968px): Layout com cards laterais de informações
- **Tablet** (640px - 968px): Cards de informações em scroll horizontal
- **Mobile** (< 640px): Layout vertical com cards empilhados

## 🎯 Integração com Backend

### Endpoints Utilizados:

#### Cadastro:
```javascript
POST /api/v1/usuarios
Body: {
  nome: string,
  email: string,
  senha: string,
  cargo: string,
  senioridade?: string
}
```

#### Login (a implementar no backend):
```javascript
POST /api/v1/auth/login
Body: {
  email: string,
  senha: string
}
Response: {
  access_token: string,
  user: {...}
}
```

#### Recuperar Senha (a implementar no backend):
```javascript
POST /api/v1/auth/recuperar-senha
Body: {
  email: string
}
```

## 🔒 Segurança

- ✅ Senhas nunca são exibidas (type="password")
- ✅ Tokens JWT armazenados no localStorage
- ✅ Validação tanto no frontend quanto backend
- ✅ CORS configurado no backend
- ✅ Proteção contra XSS com validações
- ✅ Logout limpa todos os dados do localStorage

## 🐛 Tratamento de Erros

### Cadastro:
- Email já cadastrado → Mensagem clara
- Dados inválidos → Destaque nos campos
- Erro de rede → Notificação de erro

### Login:
- Credenciais inválidas → Mensagem de erro
- Token expirado → Redirect para login
- Backend offline → Fallback com mock

### Recuperação:
- Email não encontrado → Mensagem genérica (segurança)
- Erro de rede → Opção de tentar novamente

## 🎨 Customização

### Alterar cores:
Edite as variáveis CSS em `index.css`:
```css
:root {
  --primary: #3b82f6;
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
}
```

### Alterar validações:
Edite as funções `validateForm()` em cada página.

## 📋 Checklist de Funcionalidades

- [x] Login funcional
- [x] Cadastro de usuários
- [x] Recuperação de senha
- [x] Validações de formulário
- [x] Mensagens de erro/sucesso
- [x] Estados de loading
- [x] Responsividade completa
- [x] Integração com backend
- [x] Proteção de rotas
- [x] Logout funcional
- [x] Persistência de sessão
- [ ] Verificação de email (a implementar)
- [ ] Reset de senha via email (a implementar)
- [ ] Two-Factor Authentication (futuro)

## 🚀 Melhorias Futuras

1. **Verificação de Email**
   - Enviar email de confirmação após cadastro
   - Link de ativação de conta

2. **Reset de Senha**
   - Implementar endpoint no backend
   - Gerar token temporário
   - Página de redefinição de senha

3. **Autenticação Social**
   - Login com Google
   - Login com Microsoft

4. **Segurança Adicional**
   - Two-Factor Authentication (2FA)
   - Captcha no cadastro
   - Limite de tentativas de login

5. **UX Avançada**
   - Força da senha visual
   - Sugestões de senha forte
   - Preenchimento automático de cargo

---

**Desenvolvido com ❤️ para Pulso360** 🚀
