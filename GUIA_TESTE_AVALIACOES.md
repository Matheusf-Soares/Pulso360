# Guia Rápido de Teste - Integração de Avaliações

## 🚀 Iniciar Sistema

### Terminal 1 - Backend
```powershell
cd backend\backend
poetry run python main.py
```
**Verificar:** Backend rodando em `http://localhost:8000`

### Terminal 2 - Frontend
```powershell
cd frontend\pulso360
npm start
```
**Verificar:** Frontend rodando em `http://localhost:3000`

---

## 📝 Cenários de Teste

### Cenário 1: Responder Avaliação (ContinuarAvaliacao.js)

**Passos:**
1. Login no sistema
2. Navegar para `/avaliacoes`
3. Encontrar avaliação com status "rascunho" ou "em_andamento"
4. Clicar em "Continuar" (ícone de lápis)

**Validações:**
- [ ] Carrega competências do usuário agrupadas por categoria
- [ ] Exibe seções com ícones (💻 Técnica, 👥 Equipe, etc.)
- [ ] Mostra nível atual de cada competência (ex: "Nível Atual: 3/5")
- [ ] Escala de 1-5 funciona (botões clicáveis)
- [ ] Campo de comentário opcional aceita texto
- [ ] Indicador "💾 Salvando..." aparece após responder
- [ ] Indicador muda para "✓ Salvo às HH:MM" após 2 segundos
- [ ] Navegação entre seções funciona
- [ ] Progresso atualiza (ex: "Seção 2 de 4")
- [ ] Botão "Enviar Avaliação" só aparece na última seção
- [ ] Ao tentar enviar sem responder tudo, mostra alerta
- [ ] Após enviar completo, redireciona para `/avaliacoes`

**Teste de Auto-Save:**
```javascript
// Abrir DevTools (F12) → Console
// Responder uma competência
// Observar requisição POST/PUT para /itens-avaliacao após 2s
// Verificar resposta 200 OK
```

**Teste de Validação:**
```javascript
// Responder apenas metade das competências
// Ir para última seção
// Clicar "Enviar Avaliação"
// Verificar alert: "Você precisa responder todas as X competências..."
```

---

### Cenário 2: Ver Resultado (ResultadoAvaliacao.js)

**Pré-requisito:** Ter avaliação com status "concluida"

**Passos:**
1. Navegar para `/avaliacoes`
2. Encontrar avaliação "concluida"
3. Clicar em "Ver Resultado" (ícone de gráfico)

**Validações:**
- [ ] Exibe nota global no círculo grande (ex: "4.2 de 5")
- [ ] Mostra label de classificação (Excelente/Muito Bom/etc.)
- [ ] Cards de categorias aparecem com scores
- [ ] Cada card mostra:
  - Ícone da categoria
  - Score médio
  - Barra de progresso visual
  - Número de competências avaliadas
- [ ] Tab "Visão Geral" mostra resumo estatístico:
  - Total de Competências
  - Competências Avaliadas
  - Nota Média
  - Categorias
- [ ] Tab "Detalhes por Seção" mostra:
  - Cada categoria expandida
  - Lista de competências com notas
  - Nível atual vs. Nota avaliação
  - Comentários (se houver)
- [ ] Botão "Imprimir" abre diálogo de impressão
- [ ] Botão "Exportar PDF" mostra "Funcionalidade em desenvolvimento"

---

### Cenário 3: Auto-Save Detalhado

**Objetivo:** Verificar salvamento automático funciona

**Passos:**
1. Abrir avaliação para continuar
2. Abrir DevTools → Network tab
3. Filtrar por "itens-avaliacao"
4. Responder uma competência (nota + comentário)
5. Aguardar 2 segundos

**Validações:**
- [ ] Requisição POST `/itens-avaliacao` (se primeira resposta)
- [ ] Requisição PUT `/itens-avaliacao/{id}` (se editando resposta)
- [ ] Payload contém:
  ```json
  {
    "avaliacao_id": "uuid...",
    "competencia_id": "uuid...",
    "nota": 4,
    "comentario": "Texto do comentário"
  }
  ```
- [ ] Resposta 200 ou 201 com item criado/atualizado
- [ ] Indicador visual muda de "Salvando..." para "Salvo às HH:MM"

**Teste de Interrupção:**
1. Responder competência
2. ANTES de 2 segundos, responder outra
3. Verificar que apenas 1 requisição é enviada (debounce funcionando)

---

### Cenário 4: Validação de Conclusão

**Objetivo:** Sistema impede enviar avaliação incompleta

**Passos:**
1. Abrir avaliação com 10 competências
2. Responder apenas 7
3. Navegar até última seção
4. Clicar "Enviar Avaliação"

**Validações:**
- [ ] Alert aparece com mensagem:
  ```
  Você precisa responder todas as 10 competências antes de finalizar.
  7/10 respondidas.
  ```
- [ ] Avaliação NÃO é enviada
- [ ] Usuário permanece na página

**Teste de Sucesso:**
1. Responder as 3 competências faltantes
2. Clicar "Enviar Avaliação" novamente
3. Verificar:
  - [ ] Requisição PUT `/avaliacoes/{id}` com `{"status": "concluida"}`
  - [ ] Alert: "Avaliação concluída com sucesso!"
  - [ ] Redirecionamento para `/avaliacoes`

---

## 🔍 Verificações no Backend

### Logs Esperados
```
INFO: Recebendo requisição POST /itens-avaliacao
INFO: Criado item de avaliação: {id}
INFO: Calculando nota_global para avaliação: {avaliacao_id}
INFO: Nota global atualizada: 4.25
```

### Verificar no Banco de Dados

**Query 1: Ver itens criados**
```sql
SELECT 
  ia.id, 
  ia.nota, 
  ia.comentario, 
  uc.nome as competencia_nome
FROM item_avaliacao ia
JOIN usuario_competencia uc ON ia.competencia_id = uc.id
WHERE ia.avaliacao_id = '{avaliacao_id}'
ORDER BY uc.nome;
```

**Query 2: Ver nota_global atualizada**
```sql
SELECT 
  id, 
  tipo, 
  status, 
  nota_global,
  data_conclusao
FROM avaliacao
WHERE id = '{avaliacao_id}';
```

**Verificações:**
- [ ] `nota_global` é média das notas dos itens
- [ ] `status` = 'concluida' após enviar
- [ ] `data_conclusao` preenchida com timestamp

---

## 🐛 Troubleshooting

### Problema: "Erro ao carregar avaliação"

**Possíveis causas:**
1. Backend não está rodando
2. ID inválido na URL
3. Usuário não tem permissão

**Solução:**
```powershell
# Verificar backend
curl http://localhost:8000/avaliacoes/{id}

# Verificar token JWT válido
# DevTools → Application → Local Storage → token
```

### Problema: Auto-save não funciona

**Verificar:**
1. Console do navegador tem erros?
2. Network tab mostra requisição bloqueada (CORS)?
3. Token expirado?

**Debug:**
```javascript
// No Console do navegador
console.log('Token:', localStorage.getItem('token'));

// Verificar resposta da API
fetch('http://localhost:8000/itens-avaliacao', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}).then(r => r.json()).then(console.log);
```

### Problema: Competências não aparecem

**Verificar:**
1. Usuário avaliado tem competências cadastradas?
2. Relacionamento `usuario_id` correto?

**Teste no backend:**
```python
# No Python shell
from backend.repositories.usuario_competencia_repository import UsuarioCompetenciaRepository
repo = UsuarioCompetenciaRepository()
competencias = await repo.filtrar({"usuario_id": "uuid-do-usuario"})
print(competencias)
```

### Problema: nota_global não atualiza

**Verificar logs:**
```
# Deve aparecer ao criar/editar item
INFO: Calculando nota_global para avaliação: {id}
INFO: Nota global atualizada: {valor}
```

**Se não aparecer:**
- Verificar método `_get_avaliacao_service()` não dá erro
- Verificar lazy import do `AvaliacaoService`

---

## ✅ Checklist Final

### Funcionalidades
- [ ] Carregar avaliação por ID
- [ ] Carregar competências do usuário
- [ ] Agrupar competências por categoria
- [ ] Renderizar seções dinâmicas
- [ ] Salvar respostas (nota + comentário)
- [ ] Auto-save com debounce 2s
- [ ] Indicador visual de salvamento
- [ ] Validar completude antes de enviar
- [ ] Atualizar status para "concluida"
- [ ] Calcular nota_global automaticamente
- [ ] Exibir resultado com scores por categoria
- [ ] Detalhar competências avaliadas
- [ ] Mostrar estatísticas

### UX
- [ ] Loading states funcionam
- [ ] Error states funcionam
- [ ] Navegação entre seções suave
- [ ] Progresso visível
- [ ] Feedback de ações (alerts, indicadores)
- [ ] Responsivo (mobile-friendly)

### Segurança
- [ ] Validação no backend (status != concluída)
- [ ] Competência pertence ao avaliado
- [ ] Autenticação via JWT
- [ ] CORS configurado

---

## 📊 Métricas de Performance

### Tempos Esperados
- **Carregar avaliação:** < 500ms
- **Carregar competências:** < 300ms
- **Salvar item:** < 200ms
- **Calcular nota_global:** < 100ms
- **Carregar resultado:** < 800ms

### Otimizações Implementadas
- Queries com `joinedload` (evita N+1)
- Debounce no auto-save
- Cache de competências no estado
- Lazy import para evitar circular dependency

---

## 📞 Suporte

**Problemas técnicos:**
1. Verificar logs do backend
2. Verificar console do navegador (F12)
3. Verificar Network tab (requisições HTTP)
4. Consultar `INTEGRACAO_AVALIACOES_RESUMO.md`

**Documentação adicional:**
- `backend/api/endpoints/itens_avaliacao.py` - Endpoints
- `backend/services/avaliacao_service.py` - Lógica de negócio
- `frontend/src/services/itemAvaliacaoService.js` - Cliente API

---

*Guia atualizado em 4 de dezembro de 2025*
