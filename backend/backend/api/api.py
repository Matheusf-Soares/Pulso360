from fastapi import APIRouter
from backend.api.endpoints.auth import router as auth_router
from backend.api.endpoints.usuarios import router as usuarios_router
from backend.api.endpoints.perfil_usuarios import router as perfil_usuarios_router
from backend.api.endpoints.equipes import router as equipes_router
from backend.api.endpoints.membros_equipe import router as membros_equipe_router
from backend.api.endpoints.papeis import router as papeis_router
from backend.api.endpoints.usuario_papeis import router as usuario_papeis_router
from backend.api.endpoints.usuario_competencias import router as usuario_competencias_router
from backend.api.endpoints.ciclos_avaliacao import router as ciclos_avaliacao_router
from backend.api.endpoints.avaliacoes import router as avaliacoes_router
from backend.api.endpoints.itens_avaliacao import router as itens_avaliacao_router
from backend.api.endpoints.pdis import router as pdis_router
from backend.api.endpoints.metas import router as metas_router
from backend.api.endpoints.acoes_meta import router as acoes_meta_router
from backend.api.endpoints.feedbacks import router as feedbacks_router
from backend.api.endpoints.tarefas import router as tarefas_router
from backend.api.endpoints.dashboard import router as dashboard_router

api_router = APIRouter()

# Autenticação (sem prefixo adicional, já tem /auth)
api_router.include_router(auth_router)

# Usuários e perfis
api_router.include_router(usuarios_router)
api_router.include_router(perfil_usuarios_router)

# Equipes e membros
api_router.include_router(equipes_router)
api_router.include_router(membros_equipe_router)

# Papéis e competências
api_router.include_router(papeis_router)
api_router.include_router(usuario_papeis_router)
api_router.include_router(usuario_competencias_router)

# Ciclo de avaliação
api_router.include_router(ciclos_avaliacao_router)
api_router.include_router(avaliacoes_router)
api_router.include_router(itens_avaliacao_router)

# PDI e metas
api_router.include_router(pdis_router)
api_router.include_router(metas_router)
api_router.include_router(acoes_meta_router)

# Feedbacks
api_router.include_router(feedbacks_router)

# Tarefas (Home dashboard)
api_router.include_router(tarefas_router)
api_router.include_router(dashboard_router)
