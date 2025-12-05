"""Aplicação FastAPI principal do Pulso360.

Inclui configuração de CORS e registro de rotas da API.
"""

import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

# Ajuste de path para permitir imports diretos (api, models, repositories) devido à estrutura backend/backend
CURRENT_DIR = os.path.dirname(__file__)
if CURRENT_DIR not in sys.path:
    sys.path.append(CURRENT_DIR)

from backend.api.api import api_router  # noqa: E402
from core.configs import settings  # noqa: E402
import models.__all__models  # noqa: F401,E402  # garante registro de todos os modelos no metadata

# Creating FastAPI app
app = FastAPI(
    title="Pulso360 API",
    version="1.0.0",
    description=(
        "API do sistema Pulso360 para gestão de pessoas, desempenho e desenvolvimento.\n\n"
        "Principais módulos: Usuários, Perfis, Equipes, Papéis, Competências e ciclo de avaliação (metas, ações e feedback).\n"
        "Utilize os filtros de cada listagem para paginação eficiente e pesquisa dinâmica."
    ),
    contact={
        "name": "Equipe Pulso360",
        "email": "suporte@pulso360.example",
    },
    license_info={
        "name": "Proprietary",
        "url": "https://pulso360.example/licenca",
    },
    terms_of_service="https://pulso360.example/termos",
)

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://127.0.0.1:3000",
        "http://localhost:3001",  # Porta alternativa
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos HTTP
    allow_headers=["*"],  # Permitir todos os headers
)
# Adding routes
app.include_router(api_router, prefix=settings.API_V1_STR)

add_pagination(app)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)
