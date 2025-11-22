from fastapi import APIRouter

from api.endpoints.usuarios import router as usuarios_router
from api.endpoints.perfil_usuarios import router as perfil_usuarios_router
from api.endpoints.equipes import router as equipes_router
from api.endpoints.membros_equipe import router as membros_equipe_router
from api.endpoints.papeis import router as papeis_router
from api.endpoints.usuario_papeis import router as usuario_papeis_router
from api.endpoints.usuario_competencias import router as usuario_competencias_router
from api.endpoints.ciclos_avaliacao import router as ciclos_avaliacao_router

api_router = APIRouter()

api_router.include_router(usuarios_router)
api_router.include_router(perfil_usuarios_router)
api_router.include_router(equipes_router)
api_router.include_router(membros_equipe_router)
api_router.include_router(papeis_router)
api_router.include_router(usuario_papeis_router)
api_router.include_router(usuario_competencias_router)
api_router.include_router(ciclos_avaliacao_router)
