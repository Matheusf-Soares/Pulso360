from abc import ABC, abstractmethod

from utils.exceptions.exceptions import ADMIN_CREDENTIAL_EXCEPTION
from services.base.verifier_service import VerifierService

class BaseService(VerifierService, ABC):
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