# API Changes - Integração de Avaliações

## 📡 Novos Endpoints

### GET /itens-avaliacao/avaliacao/{avaliacao_id}
**Descrição:** Lista todos os itens de uma avaliação específica

**Autenticação:** Bearer Token (JWT)

**Parâmetros:**
- `avaliacao_id` (path, UUID) - ID da avaliação

**Resposta 200:**
```json
[
  {
    "id": "uuid",
    "avaliacao_id": "uuid",
    "competencia_id": "uuid",
    "nota": 4.5,
    "comentario": "Ótimo desempenho em React"
  },
  {
    "id": "uuid",
    "avaliacao_id": "uuid",
    "competencia_id": "uuid",
    "nota": 3.0,
    "comentario": null
  }
]
```

**Exemplo de uso:**
```javascript
// Frontend
const itens = await itemAvaliacaoService.listByAvaliacao(avaliacaoId);
```

```bash
# cURL
curl -X GET "http://localhost:8000/itens-avaliacao/avaliacao/{avaliacao_id}" \
  -H "Authorization: Bearer {token}"
```

---

## 🔄 Endpoints Modificados

### POST /itens-avaliacao
**Mudança:** Agora recalcula `nota_global` da avaliação automaticamente

**Antes:**
- Criava item
- Retornava item criado

**Depois:**
- Criava item
- **SE nota fornecida:** Recalcula `nota_global` da avaliação
- Retorna item criado

**Impacto:** `nota_global` sempre atualizada em tempo real

---

### PUT /itens-avaliacao/{item_id}
**Mudança:** Agora recalcula `nota_global` da avaliação automaticamente

**Antes:**
- Atualizava item
- Retornava item atualizado

**Depois:**
- Atualizava item
- **SE nota modificada:** Recalcula `nota_global` da avaliação
- Retorna item atualizado

**Impacto:** `nota_global` sempre sincronizada com itens

---

## 🆕 Novos Métodos de Serviço (Backend)

### AvaliacaoService.calcular_nota_global(avaliacao_id)
**Descrição:** Calcula e atualiza a nota global da avaliação

**Parâmetros:**
- `avaliacao_id` (str) - ID da avaliação

**Retorna:** `float` - Nota global calculada

**Lógica:**
1. Busca todos os itens da avaliação
2. Filtra itens com nota não-nula
3. Calcula média aritmética
4. Arredonda para 2 casas decimais
5. Atualiza campo `nota_global` da avaliação
6. Retorna 0.0 se não houver notas

**Exemplo:**
```python
# Itens com notas: [4.5, 3.0, 5.0, 4.0]
# Média: (4.5 + 3.0 + 5.0 + 4.0) / 4 = 4.125
# Arredondado: 4.13
```

---

## 📊 Mudanças no Modelo de Dados

### Campo nota_global (Avaliacao)
**Antes:**
- Calculado apenas ao concluir avaliação (`POST /avaliacoes/{id}/concluir`)
- Ficava desatualizado se itens fossem editados

**Depois:**
- Recalculado automaticamente em 3 momentos:
  1. Ao criar item com nota (`POST /itens-avaliacao`)
  2. Ao editar item com nota (`PUT /itens-avaliacao/{id}`)
  3. Ao concluir avaliação (`POST /avaliacoes/{id}/concluir`)
- Sempre reflete estado atual dos itens

---

## 🔗 Novos Endpoints de Integração (Frontend)

### itemAvaliacaoService.listByAvaliacao(avaliacaoId)
```javascript
const itens = await itemAvaliacaoService.listByAvaliacao('uuid-avaliacao');
// Retorna: Array<ItemAvaliacao>
```

### itemAvaliacaoService.create(itemData)
```javascript
const item = await itemAvaliacaoService.create({
  avaliacao_id: 'uuid',
  competencia_id: 'uuid',
  nota: 4.5,
  comentario: 'Ótimo!'
});
// Retorna: ItemAvaliacao
// Efeito colateral: Recalcula nota_global
```

### itemAvaliacaoService.update(itemId, itemData)
```javascript
const item = await itemAvaliacaoService.update('uuid-item', {
  nota: 5.0,
  comentario: 'Excelente!'
});
// Retorna: ItemAvaliacao
// Efeito colateral: Recalcula nota_global
```

### itemAvaliacaoService.createOrUpdate(itemData)
```javascript
// Helper que decide automaticamente criar OU atualizar
const item = await itemAvaliacaoService.createOrUpdate({
  id: existingId || undefined,
  avaliacao_id: 'uuid',
  competencia_id: 'uuid',
  nota: 4.0,
  comentario: 'Bom'
});
```

### usuarioService.getCompetencias(usuarioId)
```javascript
const competencias = await usuarioService.getCompetencias('uuid-usuario');
// Retorna: Array<UsuarioCompetencia>
// [
//   { id: 'uuid', nome: 'Técnica - React', nivel: 4, descricao: '...' },
//   { id: 'uuid', nome: 'Comunicação - Verbal', nivel: 3, descricao: '...' }
// ]
```

---

## 📝 Contratos de API Atualizados

### GET /usuario-competencias (uso atualizado)
**Parâmetros de Query:**
- `usuario_id` (UUID) - Filtra competências por usuário
- `size` (int) - Tamanho da página (default: 50, max: 100)
- `page` (int) - Número da página (default: 1)

**Exemplo:**
```javascript
// Buscar todas as competências de um usuário
fetch('/usuario-competencias?usuario_id=uuid&size=100')
  .then(r => r.json())
  .then(data => {
    console.log(data.items); // Array de competências
    console.log(data.total); // Total de competências
  });
```

---

## 🔐 Validações Adicionadas

### ItemAvaliacaoService.add()
**Validações:**
1. ✅ Avaliação existe
2. ✅ Avaliação não está concluída
3. ✅ Competência existe
4. ✅ Competência pertence ao usuário avaliado

**Erro 400 se:**
- Tentar adicionar item a avaliação concluída
- Competência não pertence ao avaliado

### ItemAvaliacaoService.edit()
**Validações:**
1. ✅ Item existe
2. ✅ Avaliação não está concluída

**Erro 400 se:**
- Tentar editar item de avaliação concluída

---

## 🎯 Fluxo Completo de Dados

### 1. Carregar Avaliação para Responder
```
Frontend                          Backend
   |                                 |
   |-- GET /avaliacoes/{id} -------->|
   |<-- Avaliacao --------------------|
   |                                 |
   |-- GET /usuario-competencias --->|
   |    ?usuario_id={avaliado_id}   |
   |<-- List<Competencia> ------------|
   |                                 |
   |-- GET /itens-avaliacao -------->|
   |    /avaliacao/{id}              |
   |<-- List<ItemAvaliacao> ----------|
```

### 2. Responder Competência (Auto-Save)
```
Frontend                          Backend
   |                                 |
   |-- POST /itens-avaliacao ------->| ItemAvaliacaoService.add()
   |    { avaliacao_id,             |   ↓
   |      competencia_id,            | Valida avaliação não concluída
   |      nota, comentario }         |   ↓
   |                                 | Valida competência pertence ao avaliado
   |                                 |   ↓
   |                                 | Cria ItemAvaliacao
   |                                 |   ↓
   |                                 | SE nota != null:
   |                                 |   AvaliacaoService.calcular_nota_global()
   |                                 |     ↓
   |                                 |   Busca todos os itens
   |                                 |     ↓
   |                                 |   Calcula média
   |                                 |     ↓
   |                                 |   Atualiza avaliacao.nota_global
   |<-- ItemAvaliacao ----------------|
```

### 3. Editar Resposta (Auto-Save)
```
Frontend                          Backend
   |                                 |
   |-- PUT /itens-avaliacao/{id} --->| ItemAvaliacaoService.edit()
   |    { nota, comentario }        |   ↓
   |                                 | Busca item
   |                                 |   ↓
   |                                 | Valida avaliação não concluída
   |                                 |   ↓
   |                                 | Atualiza item
   |                                 |   ↓
   |                                 | SE "nota" in data:
   |                                 |   AvaliacaoService.calcular_nota_global()
   |<-- ItemAvaliacao ----------------|
```

### 4. Finalizar Avaliação
```
Frontend                          Backend
   |                                 |
   |-- PUT /avaliacoes/{id} -------->| AvaliacaoService.edit()
   |    { status: "concluida" }    |   ↓
   |                                 | Atualiza status
   |                                 | Seta data_conclusao
   |                                 | (nota_global já estava atualizada)
   |<-- Avaliacao --------------------|
```

### 5. Carregar Resultado
```
Frontend                          Backend
   |                                 |
   |-- GET /avaliacoes/{id} -------->|
   |<-- Avaliacao (com nota_global) --|
   |                                 |
   |-- GET /itens-avaliacao -------->|
   |    /avaliacao/{id}              |
   |<-- List<ItemAvaliacao> ----------|
   |                                 |
   |-- GET /usuario-competencias --->|
   |<-- List<Competencia> ------------|
   |                                 |
   [Agrupa por categoria localmente]
   [Calcula scores por categoria]
   [Renderiza resultado]
```

---

## 📈 Performance

### Otimizações Implementadas

**Backend:**
1. **Lazy Import:** Evita circular dependency (ItemAvaliacaoService ↔ AvaliacaoService)
2. **Single Query:** `calcular_nota_global()` usa 1 query para buscar itens
3. **Transactional:** Updates atômicos no banco

**Frontend:**
1. **Debounce:** Auto-save com 2s de delay (reduz requests)
2. **Optimistic UI:** Estado local atualiza imediatamente
3. **Cache:** Competências carregadas 1x, usadas em todas as seções

### Benchmarks Esperados

| Operação | Tempo Esperado | Queries |
|----------|----------------|---------|
| GET /itens-avaliacao/avaliacao/{id} | < 100ms | 1 |
| POST /itens-avaliacao | < 200ms | 4-5 |
| PUT /itens-avaliacao/{id} | < 150ms | 3-4 |
| calcular_nota_global() | < 50ms | 2 |

---

## 🔄 Compatibilidade

### Backward Compatibility
✅ **Mantida:** Todos os endpoints existentes continuam funcionando

### Breaking Changes
❌ **Nenhuma:** Apenas adições e melhorias internas

### Deprecations
❌ **Nenhuma**

---

## 🧪 Exemplos de Teste

### Testar Recálculo Automático

**1. Criar item com nota:**
```bash
curl -X POST "http://localhost:8000/itens-avaliacao" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "avaliacao_id": "uuid-avaliacao",
    "competencia_id": "uuid-competencia",
    "nota": 4.5,
    "comentario": "Teste"
  }'
```

**2. Verificar nota_global atualizada:**
```bash
curl -X GET "http://localhost:8000/avaliacoes/{avaliacao_id}" \
  -H "Authorization: Bearer {token}"

# Response deve incluir:
# "nota_global": 4.5  (se for o único item)
```

**3. Adicionar mais itens:**
```bash
# Item 2: nota 3.0
# Item 3: nota 5.0
# Verificar nota_global = (4.5 + 3.0 + 5.0) / 3 = 4.17
```

---

## 📚 Documentação Relacionada

- **OpenAPI Spec:** `http://localhost:8000/docs`
- **Schemas:** `backend/schemas/item_avaliacao.py`
- **Models:** `backend/models/item_avaliacao_model.py`
- **Services:** `backend/services/item_avaliacao_service.py`
- **Frontend Service:** `frontend/src/services/itemAvaliacaoService.js`

---

*Documentação atualizada em 4 de dezembro de 2025*
