# Backend Service

FastAPI asynchronous backend for Pulso360. Provides CRUD for usuarios, perfil_usuarios, equipes, membros de equipe e papeis.

Run:

```
poetry install
poetry run alembic upgrade head
poetry run uvicorn backend.main:app --reload
```
