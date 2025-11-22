from abc import ABC, abstractmethod


# Removidos imports de 'utils' e 'verifier_service' inexistentes no projeto atual.
class BaseService(ABC):
    @abstractmethod
    async def add(): ...

    @abstractmethod
    async def get_by_id(): ...

    @abstractmethod
    async def filter(): ...

    @abstractmethod
    async def edit(): ...

    @abstractmethod
    async def remove(): ...
