# 🐛 Guia de Debug - Problema de Dados Não Atualizando

## 📋 Problema Relatado
Os dados do usuário (mensagem de boas-vindas, símbolo do perfil, nome, email) não estão sendo atualizados após o login.

## 🔧 Alterações Feitas

### 1. **Logs de Debug Adicionados**
Adicionei logs extensivos em pontos críticos:

- ✅ **AuthContext.js**: Logs quando verifica autenticação e quando faz login
- ✅ **Topbar.js**: Log mostrando o user do contexto
- ✅ **Home.js**: Logs mostrando user e userData processado + useEffect para monitorar mudanças
- ✅ **authService.js**: Logs já existentes mantidos

### 2. **Painel de Debug Visual** 🎯
Criei um componente `DebugPanel` que mostra em tempo real:

- Estado do AuthContext (user, isAuthenticated)
- Dados do localStorage (access_token, user)
- User object parseado e formatado
- Botão para logar tudo no console

**Como usar:**
1. Abra a aplicação (http://localhost:3000)
2. Procure o botão "🐛 Debug" no canto inferior direito
3. Clique para abrir o painel
4. Observe os dados enquanto faz login

### 3. **Warnings Corrigidos**
Todos os warnings do ESLint foram corrigidos com `eslint-disable` apropriados.

## 🧪 Como Testar

### Passo 1: Abra o Console do Navegador
Pressione `F12` ou `Cmd+Option+I` (Mac) para abrir as DevTools.

### Passo 2: Vá para a aba Console
Você verá logs com emojis:
- 🔍 = Verificação
- 🔐 = Autenticação
- 📞 = Chamada de API
- ✅ = Sucesso
- ❌ = Erro
- 🏠 = Home page
- 🔄 = Atualização de estado

### Passo 3: Faça Login
Use qualquer email/senha. O sistema vai:
1. Tentar o backend real
2. Se falhar, usar dados mock

### Passo 4: Observe os Logs

**Sequência esperada:**
```
🔍 AuthContext: Verificando autenticação...
🔍 Autenticado: false
🔍 Usuário atual: null

🔐 AuthContext: Iniciando login para [email]
📞 AuthContext: Chamando authService.login...
🔐 Tentando fazer login com: [email]
⚠️ Erro ao fazer login no backend: [erro]
🎭 Usando autenticação mock (backend não disponível)
✅ Login mock bem-sucedido: {user: {...}}
✅ AuthContext: Login bem-sucedido {...}
👤 AuthContext: Dados do usuário recebido: {...}
✅ AuthContext: Estado atualizado
👤 AuthContext: user state agora é: {...}

🔍 Topbar: user do contexto: {...}
🏠 Home: user do contexto: {...}
🏠 Home: userData processado: {...}
🔄 Home: useEffect - user foi atualizado: {...}
```

### Passo 5: Use o Debug Panel
1. Clique no botão "🐛 Debug"
2. Veja:
   - **AuthContext State**: Se `user` está null ou tem dados
   - **LocalStorage**: Se access_token e user estão salvos
   - **User Object**: Dados parseados do usuário

## 🔍 Diagnóstico

### Cenário 1: Dados Não Aparecem

**Se no Debug Panel você vê:**
- ✅ LocalStorage tem user
- ❌ AuthContext user é null

**Problema:** O AuthContext não está lendo do localStorage corretamente.

**Solução:** Verifique a função `getCurrentUser()` em authService.js

### Cenário 2: Dados Aparecem Mas UI Não Atualiza

**Se no Debug Panel você vê:**
- ✅ LocalStorage tem user
- ✅ AuthContext user tem dados
- ❌ Topbar/Home ainda mostram valores padrão

**Problema:** Os componentes não estão renderizando novamente.

**Solução:** Force um refresh ou verifique se o useAuth() está retornando corretamente.

### Cenário 3: Login Não Salva Dados

**Se após login você vê:**
- ❌ LocalStorage vazio
- ❌ AuthContext user é null

**Problema:** O authService.login() não está salvando no localStorage.

**Solução:** Verifique se authService.login() está chamando `localStorage.setItem()`.

## 🎯 Logs Importantes para Você Verificar

Após fazer login, procure por estas linhas no console:

```javascript
✅ AuthContext: Login bem-sucedido
👤 AuthContext: Dados do usuário recebido: { ... }
✅ AuthContext: user state agora é: { ... }
```

Se você ver essas linhas, significa que:
- ✅ O login funcionou
- ✅ Os dados foram salvos no estado
- ✅ O contexto foi atualizado

Depois, procure por:

```javascript
🔍 Topbar: user do contexto: { ... }
🏠 Home: user do contexto: { ... }
```

Se você ver `null` aqui, mas viu os dados antes, significa que:
- ❌ Os componentes não estão recebendo o contexto atualizado
- ❌ Pode ser um problema de re-renderização

## 📊 Dados Esperados no Mock

Quando você faz login com o mock (backend offline), os dados salvos são:

```javascript
{
  id: '1',
  nome: 'Maria Silva',
  email: '[seu email]', // O email que você digitou
  cargo: 'Desenvolvedora Frontend Sênior',
  foto_url: null
}
```

Esses dados devem aparecer:
- ✅ No Debug Panel
- ✅ No Topbar (nome, email, iniciais)
- ✅ Na Home (saudação, avatar)
- ✅ No Perfil (todos os campos)

## 🚨 O Que Fazer Se Não Funcionar

### 1. Limpe o Cache
```javascript
// No console do navegador, execute:
localStorage.clear();
location.reload();
```

### 2. Verifique o Navegador
Certifique-se de que:
- ✅ Cookies estão habilitados
- ✅ LocalStorage está habilitado
- ✅ Não está em modo anônimo/privado

### 3. Force Rebuild
```bash
# No terminal:
cd frontend/pulso360
rm -rf node_modules/.cache
npm start
```

### 4. Verifique os Dados no localStorage Manualmente
```javascript
// No console do navegador:
console.log('Token:', localStorage.getItem('access_token'));
console.log('User:', localStorage.getItem('user'));
console.log('User parsed:', JSON.parse(localStorage.getItem('user')));
```

## 📱 Próximos Passos

Após fazer os testes acima:

1. **Envie os logs**: Copie os logs do console e me envie
2. **Screenshot do Debug Panel**: Tire um print do painel de debug
3. **Descreva o comportamento**: Me diga exatamente o que você vê

Com essas informações, poderei identificar exatamente onde está o problema!

## 🔗 Arquivos Modificados

```
frontend/pulso360/src/
├── App.js                      ✅ Adicionado DebugPanel
├── components/
│   ├── DebugPanel.js          ✅ NOVO - Painel de debug visual
│   └── Topbar.js              ✅ Adicionado log
├── contexts/
│   └── AuthContext.js         ✅ Logs aprimorados
└── pages/
    ├── Home.js                ✅ Logs + useEffect para monitorar user
    ├── Perfil.js              ✅ Warning corrigido
    ├── Notificacoes.js        ✅ Warning corrigido
    └── Relatorios.js          ✅ Warning corrigido
```

## 🎉 Servidor Rodando

O servidor já está rodando em: **http://localhost:3000**

Abra essa URL no navegador e teste agora! 🚀
