# from pytz import timezone
# from typing import Optional
# from datetime import datetime, timedelta


# from fastapi import Depends
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError

# from pydantic import BaseModel, EmailStr

# from core.configs import settings
# from core.security import check_password
# from models.user_model import UserModel

# from utils.exceptions.exceptions import (
#     CREDENTIAL_EXCEPTION,
#     ADMIN_CREDENTIAL_EXCEPTION,
#     USER_NOT_VERIFIED,
# )
# from repositories.user_repository import UserRepository

# oauth2_schema = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/users/login")


# class TokenData(BaseModel):
#     email: Optional[str] = None


# class AuthenticationService:

#     def __init__(self, user_repository: UserRepository = Depends(UserRepository)):
#         self.user_repository: UserRepository = user_repository

#     async def check_authentication(
#         user_repository: UserRepository = Depends(UserRepository),
#         token: str = Depends(oauth2_schema),
#     ) -> UserModel:

#         try:
#             payload = jwt.decode(
#                 token,
#                 settings.JWT_SECRET,
#                 algorithms=[settings.ALGORITHM],
#                 options={"verify_aud": False},
#             )

#             email: EmailStr = payload.get("sub")

#             if email is None:
#                 raise CREDENTIAL_EXCEPTION

#             token_data: TokenData = TokenData(email=email)

#         except JWTError:
#             raise CREDENTIAL_EXCEPTION

#         user = await user_repository.get_user_by_email(email=token_data.email)
#         if user is None:
#             raise CREDENTIAL_EXCEPTION

#         return user

#     async def check_authorization(
#         user: UserModel = Depends(check_authentication),
#     ) -> UserModel:
#         if not user.is_admin:
#             raise ADMIN_CREDENTIAL_EXCEPTION
#         return user

#     async def authenticate(self, email: str, password: str) -> Optional[UserModel]:
#         # This function authenticates and return a user.
#         user: UserModel = await self.user_repository.get_user_by_email(email)

#         if not user:
#             return None

#         if not check_password(password, user.password):
#             return None

#         if not user.is_active:
#             raise USER_NOT_VERIFIED

#         return user

#     def _generate_token(self, type_token: str, lifetime: timedelta, sub: str) -> str:

#         payload = {}
#         sp_timezone = timezone("America/Sao_Paulo")
#         expires = datetime.now(tz=sp_timezone) + lifetime

#         payload["type"] = type_token

#         payload["exp"] = expires

#         payload["iat"] = datetime.now(tz=sp_timezone)

#         payload["sub"] = str(sub)

#         return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.ALGORITHM)

#     def generate_access_token(self, sub: str) -> str:
#         return self._generate_token(
#             type_token="access_token",
#             lifetime=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
#             sub=sub,
#         )
