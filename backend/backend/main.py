from fastapi import FastAPI
from fastapi_pagination import add_pagination

from api.api import api_router
from core.configs import settings

# Creating FastAPI app
app = FastAPI(title="Pulso360",
              version="1.0.0")

# Adding routes
app.include_router(api_router,
                   prefix=settings.API_V1_STR)

add_pagination(app)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app',
                host='127.0.0.1',
                port=8000,
                log_level='info',
                reload=True)