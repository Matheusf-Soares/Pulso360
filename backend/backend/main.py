"""Aplicação FastAPI principal do Pulso360."""
from fastapi import FastAPI
from fastapi_pagination import add_pagination
from api.api import api_router
from core.configs import settings
import models.__all__models  # noqa: F401  # garante registro de todos os modelos no metadata

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

# Adding routes
app.include_router(api_router, prefix=settings.API_V1_STR)

add_pagination(app)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)
