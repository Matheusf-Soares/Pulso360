from fastapi import HTTPException, status


def not_found(message: str, code: str = "NOT_FOUND"):
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail={"detail": message, "code": code},
    )


def bad_request(message: str, code: str = "BAD_REQUEST"):
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail={"detail": message, "code": code},
    )


def conflict(message: str, code: str = "CONFLICT"):
    raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail={"detail": message, "code": code},
    )


def unauthorized(message: str = "Não autorizado", code: str = "UNAUTHORIZED"):
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={"detail": message, "code": code},
    )


def forbidden(message: str = "Proibido", code: str = "FORBIDDEN"):
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail={"detail": message, "code": code},
    )
