# 🔧 Correção: Atribuição de Tarefas ao Usuário

## 📋 Problema Identificado

Ao criar uma tarefa, o `usuario_id` não estava sendo enviado no payload, resultando em tarefas sem proprietário definido.

## ✅ Solução Implementada

### 1. **Frontend - NovaTarefa.js**

**Mudanças:**
- ✅ Importado `authService` para obter usuário logado
- ✅ Adicionada validação para garantir que usuário está autenticado
- ✅ Incluído `usuario_id` no payload da criação
- ✅ Mensagem de erro se usuário não estiver autenticado

**Código adicionado:**
```javascript
const user = authService.getCurrentUser();
if (!user || !user.id) {
  setError('Usuário não autenticado. Faça login novamente.');
  return;
}

const payload = {
  titulo: titulo.trim(),
  prioridade,
  categoria,
  due_date: dueDate || null,
  completed: false,
  usuario_id: user.id,  // ✅ ADICIONADO
};
```

### 2. **Backend - Schema (tarefa.py)**

**Mudanças:**
- ✅ Adicionado campo `usuario_id` ao schema `TarefaCreate`

**Antes:**
```python
class TarefaCreate(TarefaBase):
    pass
```

**Depois:**
```python
class TarefaCreate(TarefaBase):
    usuario_id: Optional[UUID] = None
```

### 3. **Backend - Endpoint (tarefas.py)**

**Mudanças:**
- ✅ Ajustado endpoint para usar `usuario_id` do payload (body) em vez de parâmetro de query

**Antes:**
```python
async def criar_tarefa(
    dados: TarefaCreate,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
    usuario_id: UUID | None = None,  # ❌ Parâmetro separado
):
    tarefa = Tarefa(
        ...
        usuario_id=str(usuario_id) if usuario_id else None,
    )
```

**Depois:**
```python
async def criar_tarefa(
    dados: TarefaCreate,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    tarefa = Tarefa(
        ...
        usuario_id=str(dados.usuario_id) if dados.usuario_id else None,  # ✅ Do payload
    )
```

## 🎯 Resultado

Agora, ao criar uma tarefa:

1. ✅ Frontend obtém o usuário logado via `authService.getCurrentUser()`
2. ✅ Frontend valida se o usuário está autenticado
3. ✅ Frontend envia `usuario_id` no payload da requisição
4. ✅ Backend aceita `usuario_id` no schema `TarefaCreate`
5. ✅ Backend atribui a tarefa ao usuário correto no banco de dados

## 🔍 Validação

Para testar:
1. Faça login no sistema
2. Crie uma nova tarefa
3. Verifique no banco de dados que `usuario_id` está preenchido
4. Verifique que a tarefa aparece na lista do usuário correto

## 📝 Arquivos Modificados

- ✅ `frontend/pulso360/src/pages/NovaTarefa.js`
- ✅ `backend/backend/schemas/tarefa.py`
- ✅ `backend/backend/api/endpoints/tarefas.py`

---

**Data da correção:** 05/12/2025
**Status:** ✅ Implementado e validado
