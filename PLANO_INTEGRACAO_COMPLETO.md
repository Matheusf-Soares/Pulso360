# 📋 PLANO DE INTEGRAÇÃO E MELHORIA COMPLETO
## Sistema Pulso360 - Análise e Desenvolvimento

**Data:** 05/12/2025  
**Status:** Em Execução  
**Objetivo:** Mapear, integrar e melhorar todos os fluxos frontend-backend

---

## 🎯 FASE 1: MAPEAMENTO DE ENDPOINTS BACKEND

### Endpoints Existentes por Módulo:

#### 1. **Autenticação (`/auth`)**
- ✅ `POST /auth/register` - Registro de usuário
- ✅ `POST /auth/login` - Login
- ✅ `POST /auth/refresh` - Refresh token
- ✅ `GET /auth/me` - Usuário atual

#### 2. **Usuários (`/usuarios`)**
- ✅ `POST /usuarios/` - Criar usuário
- ✅ `GET /usuarios/` - Listar usuários (com filtros)
- ✅ `GET /usuarios/{id}` - Buscar usuário por ID
- ✅ `PUT /usuarios/{id}` - Atualizar usuário
- ✅ `DELETE /usuarios/{id}` - Remover usuário

#### 3. **Perfis de Usuário (`/perfil-usuarios`)**
- ✅ `POST /perfil-usuarios/` - Criar perfil
- ✅ `GET /perfil-usuarios/` - Listar perfis
- ✅ `GET /perfil-usuarios/{id}` - Buscar perfil
- ✅ `PUT /perfil-usuarios/{id}` - Atualizar perfil
- ✅ `DELETE /perfil-usuarios/{id}` - Remover perfil

#### 4. **Equipes (`/equipes`)**
- ✅ `POST /equipes/` - Criar equipe
- ✅ `GET /equipes/` - Listar equipes
- ✅ `GET /equipes/{id}` - Buscar equipe
- ✅ `PUT /equipes/{id}` - Atualizar equipe
- ✅ `DELETE /equipes/{id}` - Remover equipe

#### 5. **Membros de Equipe (`/membros-equipe`)**
- ✅ `POST /membros-equipe/` - Adicionar membro
- ✅ `GET /membros-equipe/` - Listar membros
- ✅ `GET /membros-equipe/{id}` - Buscar membro
- ✅ `PUT /membros-equipe/{id}` - Atualizar membro
- ✅ `DELETE /membros-equipe/{id}` - Remover membro

#### 6. **Papéis (`/papeis`)**
- ✅ `POST /papeis/` - Criar papel
- ✅ `GET /papeis/` - Listar papéis
- ✅ `GET /papeis/{id}` - Buscar papel
- ✅ `PUT /papeis/{id}` - Atualizar papel
- ✅ `DELETE /papeis/{id}` - Remover papel

#### 7. **Usuário-Papéis (`/usuario-papeis`)**
- ✅ `POST /usuario-papeis/` - Atribuir papel
- ✅ `GET /usuario-papeis/` - Listar atribuições
- ✅ `GET /usuario-papeis/{id}` - Buscar atribuição
- ✅ `DELETE /usuario-papeis/{id}` - Remover papel

#### 8. **Competências de Usuário (`/usuario-competencias`)**
- ✅ `POST /usuario-competencias/` - Criar competência
- ✅ `GET /usuario-competencias/` - Listar competências
- ✅ `GET /usuario-competencias/{id}` - Buscar competência
- ✅ `PUT /usuario-competencias/{id}` - Atualizar competência
- ✅ `DELETE /usuario-competencias/{id}` - Remover competência

#### 9. **Ciclos de Avaliação (`/ciclos-avaliacao`)**
- ✅ `POST /ciclos-avaliacao/` - Criar ciclo
- ✅ `GET /ciclos-avaliacao/` - Listar ciclos
- ✅ `GET /ciclos-avaliacao/{id}` - Buscar ciclo
- ✅ `PUT /ciclos-avaliacao/{id}` - Atualizar ciclo
- ✅ `DELETE /ciclos-avaliacao/{id}` - Remover ciclo

#### 10. **Avaliações (`/avaliacoes`)**
- ✅ `POST /avaliacoes/` - Criar avaliação
- ✅ `GET /avaliacoes/` - Listar avaliações
- ✅ `GET /avaliacoes/{id}` - Buscar avaliação
- ✅ `PUT /avaliacoes/{id}` - Atualizar avaliação
- ✅ `DELETE /avaliacoes/{id}` - Remover avaliação
- ✅ `GET /avaliacoes/stats` - Estatísticas
- ✅ `GET /avaliacoes/export` - Exportar CSV
- ✅ `POST /avaliacoes/{id}/concluir` - Concluir avaliação

#### 11. **Itens de Avaliação (`/itens-avaliacao`)**
- ✅ `POST /itens-avaliacao/` - Criar item
- ✅ `GET /itens-avaliacao/` - Listar itens
- ✅ `GET /itens-avaliacao/{id}` - Buscar item
- ✅ `PUT /itens-avaliacao/{id}` - Atualizar item
- ✅ `DELETE /itens-avaliacao/{id}` - Remover item
- ✅ `GET /itens-avaliacao/avaliacao/{id}` - Itens por avaliação

#### 12. **PDI (`/pdis`)**
- ✅ `POST /pdis/` - Criar PDI
- ✅ `GET /pdis/` - Listar PDIs
- ✅ `GET /pdis/{id}` - Buscar PDI
- ✅ `PUT /pdis/{id}` - Atualizar PDI
- ✅ `DELETE /pdis/{id}` - Remover PDI

#### 13. **Metas (`/metas`)**
- ✅ `POST /metas/` - Criar meta
- ✅ `GET /metas/` - Listar metas
- ✅ `GET /metas/{id}` - Buscar meta
- ✅ `PUT /metas/{id}` - Atualizar meta
- ✅ `DELETE /metas/{id}` - Remover meta

#### 14. **Ações de Meta (`/acoes-meta`)**
- ✅ `POST /acoes-meta/` - Criar ação
- ✅ `GET /acoes-meta/` - Listar ações
- ✅ `GET /acoes-meta/{id}` - Buscar ação
- ✅ `PUT /acoes-meta/{id}` - Atualizar ação
- ✅ `DELETE /acoes-meta/{id}` - Remover ação

#### 15. **Feedbacks (`/feedbacks`)**
- ✅ `POST /feedbacks/` - Criar feedback
- ✅ `GET /feedbacks/` - Listar feedbacks
- ✅ `GET /feedbacks/{id}` - Buscar feedback
- ✅ `PUT /feedbacks/{id}` - Atualizar feedback
- ✅ `DELETE /feedbacks/{id}` - Remover feedback

#### 16. **Tarefas (`/tarefas`)**
- ✅ `POST /tarefas/` - Criar tarefa
- ✅ `GET /tarefas/` - Listar tarefas
- ✅ `GET /tarefas/{id}` - Buscar tarefa
- ✅ `PUT /tarefas/{id}` - Atualizar tarefa
- ✅ `DELETE /tarefas/{id}` - Remover tarefa

#### 17. **Dashboard (`/dashboard`)**
- ✅ `GET /dashboard/summary` - Resumo
- ✅ `GET /dashboard/activity` - Atividades
- ✅ `GET /dashboard/team-performance` - Performance da equipe
- ✅ `GET /dashboard/pdi` - PDI summary

---

## 🔍 FASE 2: MAPEAMENTO FRONTEND

### Serviços Existentes:
1. ✅ `authService.js` - Autenticação
2. ✅ `usuarioService.js` - Usuários
3. ✅ `avaliacoesService.js` - Avaliações (RECÉM CORRIGIDO)
4. ✅ `itemAvaliacaoService.js` - Itens de avaliação
5. ✅ `cicloAvaliacaoService.js` - Ciclos
6. ✅ `equipeService.js` - Equipes
7. ✅ `pdiService.js` - PDI
8. ✅ `tasksService.js` - Tarefas
9. ✅ `dashboardService.js` - Dashboard

### Serviços FALTANTES (Não implementados):
1. ❌ `perfilUsuarioService.js` - Perfis de usuário
2. ❌ `membroEquipeService.js` - Membros de equipe
3. ❌ `papelService.js` - Papéis
4. ❌ `usuarioPapelService.js` - Atribuição de papéis
5. ❌ `usuarioCompetenciaService.js` - Competências (PARCIAL - existe getCompetencias no usuarioService)
6. ❌ `metaService.js` - Metas
7. ❌ `acaoMetaService.js` - Ações de meta
8. ❌ `feedbackService.js` - Feedbacks

### Páginas Existentes:
1. ✅ `Login.js` - Login
2. ✅ `Cadastro.js` - Registro
3. ✅ `RecuperarSenha.js` - Recuperação de senha
4. ✅ `Home.js` - Dashboard principal
5. ✅ `Perfil.js` - Perfil do usuário
6. ✅ `Equipe.js` - Gestão de equipe
7. ✅ `MembroPerfil.js` - Perfil de membro
8. ✅ `Avaliacoes.js` - Lista de avaliações
9. ✅ `ContinuarAvaliacao.js` - Responder avaliação
10. ✅ `ResultadoAvaliacao.js` - Ver resultado
11. ✅ `PDI.js` - Plano de Desenvolvimento Individual
12. ✅ `NovaTarefa.js` - Criar tarefa
13. ✅ `Notificacoes.js` - Notificações
14. ✅ `Relatorios.js` - Relatórios
15. ✅ `Administracao.js` - Administração
16. ✅ `Ajuda.js` - Ajuda

---

## ⚠️ FASE 3: INTEGRAÇÕES FALTANTES IDENTIFICADAS

### 🔴 CRÍTICAS (Impactam funcionalidades principais):

#### 1. **PDI (Plano de Desenvolvimento Individual)**
- **Status:** Página existe mas não está integrada
- **Backend:** ✅ Endpoints completos (`/pdis`, `/metas`, `/acoes-meta`)
- **Frontend:** ❌ Service incompleto, página não conectada
- **Impacto:** Funcionalidade principal não utilizável
- **Prioridade:** ALTA

#### 2. **Feedbacks**
- **Status:** Backend pronto, frontend ausente
- **Backend:** ✅ Endpoints completos (`/feedbacks`)
- **Frontend:** ❌ Nenhum service, nenhuma página
- **Impacto:** Funcionalidade de feedback não disponível
- **Prioridade:** ALTA

#### 3. **Gestão de Papéis e Permissões**
- **Status:** Backend pronto, frontend ausente
- **Backend:** ✅ Endpoints (`/papeis`, `/usuario-papeis`)
- **Frontend:** ❌ Sem integração
- **Impacto:** Controle de acesso limitado
- **Prioridade:** MÉDIA

### 🟡 IMPORTANTES (Melhorariam experiência):

#### 4. **Gestão Completa de Equipes**
- **Status:** Parcialmente integrado
- **Backend:** ✅ Endpoints membros (`/membros-equipe`)
- **Frontend:** ⚠️ Página `Equipe.js` existe mas usa dados mock
- **Impacto:** Gestão de equipe limitada
- **Prioridade:** MÉDIA

#### 5. **Perfis de Usuário**
- **Status:** Backend pronto, frontend mínimo
- **Backend:** ✅ Endpoints (`/perfil-usuarios`)
- **Frontend:** ⚠️ Página `Perfil.js` existe mas limitada
- **Impacto:** Personalização de perfil incompleta
- **Prioridade:** BAIXA

#### 6. **Competências de Usuário**
- **Status:** Parcialmente integrado
- **Backend:** ✅ Endpoints completos
- **Frontend:** ⚠️ Apenas `getCompetencias` em usuarioService
- **Impacto:** Gestão de competências limitada
- **Prioridade:** MÉDIA

### 🟢 OPCIONAIS (Funcionalidades extras):

#### 7. **Ciclos de Avaliação (Gestão)**
- **Status:** Service existe mas sem página de gestão
- **Backend:** ✅ Endpoints CRUD completo
- **Frontend:** ⚠️ Service existe, falta página admin
- **Impacto:** Configuração de ciclos via código/DB
- **Prioridade:** BAIXA

#### 8. **Relatórios Avançados**
- **Status:** Página existe mas dados limitados
- **Backend:** ✅ Endpoints de stats parciais
- **Frontend:** ⚠️ Página básica
- **Impacto:** Análises limitadas
- **Prioridade:** BAIXA

---

## 📝 FASE 4: MELHORIAS NAS REGRAS DE NEGÓCIO

### Identificadas:

#### 1. **Validações de Ciclo de Avaliação**
- **Problema:** Permitir múltiplas avaliações no mesmo ciclo
- **Solução:** Validar unicidade de (avaliado_id, avaliador_id, ciclo_id, tipo)
- **Local:** `AvaliacaoService`

#### 2. **Cálculo Automático de Notas**
- **Status:** ✅ JÁ IMPLEMENTADO
- **Descrição:** `calcular_nota_global()` chamado automaticamente

#### 3. **Status de PDI**
- **Problema:** Não há controle de progresso das metas
- **Solução:** Calcular progresso baseado em ações concluídas
- **Local:** `PDIService`

#### 4. **Notificações**
- **Problema:** Sistema de notificações não conectado a eventos
- **Solução:** Criar triggers para:
  - Nova avaliação atribuída
  - Prazo de avaliação próximo
  - Meta do PDI vencendo
  - Feedback recebido

#### 5. **Histórico de Alterações**
- **Problema:** Sem auditoria de mudanças
- **Solução:** Implementar campos `updated_at`, `updated_by`

#### 6. **Soft Delete**
- **Problema:** Deleção permanente de dados
- **Solução:** Implementar campo `deleted_at` (soft delete)

---

## 🛠️ FASE 5: PLANO DE IMPLEMENTAÇÃO

### Sprint 1: PDI e Metas (CRÍTICO)
**Tempo estimado:** 2-3 dias

1. **Criar Services Frontend:**
   ```javascript
   // metaService.js
   - list(params)
   - getById(id)
   - create(data)
   - update(id, data)
   - delete(id)
   
   // acaoMetaService.js
   - list(params)
   - getById(id)
   - create(data)
   - update(id, data)
   - delete(id)
   ```

2. **Integrar PDI.js:**
   - Buscar PDIs do usuário
   - Exibir metas e progresso
   - Permitir criar/editar metas
   - Gerenciar ações de cada meta
   - Calcular percentual de conclusão

3. **Melhorias Backend:**
   - Adicionar cálculo de progresso em `PDIService`
   - Endpoint `GET /pdis/{id}/progress`

### Sprint 2: Feedbacks (CRÍTICO)
**Tempo estimado:** 1-2 dias

1. **Criar feedbackService.js:**
   ```javascript
   - list(params)
   - getById(id)  
   - create(data)
   - update(id, data)
   - delete(id)
   - getByUsuario(usuario_id)
   ```

2. **Criar Página de Feedbacks:**
   - Lista de feedbacks recebidos
   - Lista de feedbacks enviados
   - Formulário para dar feedback
   - Visualização de feedback

3. **Integração com Avaliações:**
   - Permitir criar feedback após avaliação
   - Exibir feedbacks na ResultadoAvaliacao.js

### Sprint 3: Gestão de Equipes Completa (IMPORTANTE)
**Tempo estimado:** 2 dias

1. **Criar membroEquipeService.js**

2. **Melhorar Equipe.js:**
   - Listar membros reais da equipe
   - Adicionar/remover membros
   - Atribuir papéis
   - Ver perfil de membro

3. **Melhorar MembroPerfil.js:**
   - Dados reais do backend
   - Histórico de avaliações
   - Competências do membro
   - PDI do membro

### Sprint 4: Papéis e Permissões (IMPORTANTE)
**Tempo estimado:** 2 dias

1. **Criar Services:**
   - papelService.js
   - usuarioPapelService.js

2. **Criar Páginas Admin:**
   - GerenciarPapeis.js (em admin/)
   - Atribuir papéis a usuários

3. **Implementar Controle de Acesso:**
   - HOC `withRole(roles)`
   - Verificação de permissões nas rotas

### Sprint 5: Competências Completas (IMPORTANTE)
**Tempo estimado:** 1-2 dias

1. **Criar usuarioCompetenciaService.js completo**

2. **Página de Gestão de Competências:**
   - Listar competências do usuário
   - Adicionar novas competências
   - Editar níveis
   - Histórico de evolução

### Sprint 6: Melhorias de UI/UX (CONTÍNUO)
**Tempo estimado:** 2-3 dias

1. **Padronizar Estilos:**
   - Revisar todas as páginas
   - Aplicar design system consistente
   - Responsividade

2. **Estados de Loading:**
   - Spinners consistentes
   - Skeleton loaders

3. **Mensagens de Erro:**
   - Toasts padronizados
   - Tratamento de erros global

### Sprint 7: Testes Automatizados (ESSENCIAL)
**Tempo estimado:** 3-4 dias

1. **Testes Backend:**
   - Criar testes para cada endpoint
   - Testes de regras de negócio
   - Testes de integração

2. **Testes Frontend:**
   - Testes de componentes
   - Testes de integração
   - Testes E2E (Cypress/Playwright)

---

## ✅ FASE 6: CHECKLIST DE EXECUÇÃO

### Preparação:
- [ ] Revisar este documento com equipe
- [ ] Priorizar sprints
- [ ] Configurar ambiente de desenvolvimento
- [ ] Criar branch de desenvolvimento

### Sprint 1 - PDI:
- [ ] Criar metaService.js
- [ ] Criar acaoMetaService.js
- [ ] Atualizar pdiService.js
- [ ] Integrar PDI.js com backend
- [ ] Adicionar cálculo de progresso no backend
- [ ] Testar fluxo completo
- [ ] Code review

### Sprint 2 - Feedbacks:
- [ ] Criar feedbackService.js
- [ ] Criar página Feedbacks.js
- [ ] Integrar com ResultadoAvaliacao.js
- [ ] Testar fluxo completo
- [ ] Code review

### Sprint 3 - Equipes:
- [ ] Criar membroEquipeService.js
- [ ] Atualizar Equipe.js
- [ ] Atualizar MembroPerfil.js
- [ ] Testar fluxo completo
- [ ] Code review

### Sprint 4 - Papéis:
- [ ] Criar papelService.js
- [ ] Criar usuarioPapelService.js
- [ ] Criar página admin de papéis
- [ ] Implementar controle de acesso
- [ ] Testar permissões
- [ ] Code review

### Sprint 5 - Competências:
- [ ] Criar usuarioCompetenciaService.js
- [ ] Criar página de gestão
- [ ] Integrar com Perfil.js
- [ ] Testar fluxo completo
- [ ] Code review

### Sprint 6 - UI/UX:
- [ ] Auditar todas as páginas
- [ ] Aplicar estilos consistentes
- [ ] Testar responsividade
- [ ] Validar acessibilidade
- [ ] Code review

### Sprint 7 - Testes:
- [ ] Criar testes backend (pytest)
- [ ] Criar testes frontend (Jest/RTL)
- [ ] Configurar CI/CD
- [ ] Atingir >80% cobertura
- [ ] Documentar testes

---

## 📊 MÉTRICAS DE SUCESSO

### Cobertura de Integração:
- **Atual:** ~60% (6/10 módulos principais integrados)
- **Meta:** 100% (todos os módulos integrados)

### Cobertura de Testes:
- **Atual:** ~20%
- **Meta:** >80%

### Funcionalidades Implementadas:
- **Atual:** 65%
- **Meta:** 100%

### Qualidade do Código:
- **Consistência de estilo:** Aplicar ESLint/Prettier
- **Documentação:** JSDoc em todos os services
- **Type safety:** Considerar migração para TypeScript (futuro)

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. ✅ **CONCLUÍDO:** Corrigir avaliacoesService.js
2. 🔄 **EM ANDAMENTO:** Análise completa do sistema
3. ⏭️ **PRÓXIMO:** Iniciar Sprint 1 - PDI e Metas
4. ⏭️ **DEPOIS:** Implementar Feedbacks
5. ⏭️ **DEPOIS:** Melhorar gestão de equipes

---

## 📝 NOTAS FINAIS

Este plano é um documento vivo e deve ser atualizado conforme o progresso. Cada sprint deve ter:
- Reunião de planejamento
- Daily standups
- Code reviews
- Retrospectiva

**Responsável pela execução:** Equipe de Desenvolvimento  
**Deadline:** A definir conforme capacidade da equipe  
**Status:** 📋 PLANEJAMENTO COMPLETO - PRONTO PARA EXECUÇÃO
