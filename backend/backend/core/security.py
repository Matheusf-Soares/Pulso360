from passlib.context import CryptContext

# Compatibilidade entre passlib 1.7.x e bcrypt >=4.1.x:
# Versões recentes de bcrypt removeram o atributo __about__.__version__, que passlib tenta ler.
# Caso a versão instalada ainda seja 4.1.x (ou outra sem __about__), criamos um shim para evitar AttributeError.
try:
    import bcrypt as _bcrypt  # type: ignore

    if not hasattr(_bcrypt, "__about__") and hasattr(_bcrypt, "__version__"):

        class _About:
            __version__ = _bcrypt.__version__  # simplifica para passlib

        _bcrypt.__about__ = _About()  # type: ignore[attr-defined]
except Exception:  # pragma: no cover
    # Se algo falhar aqui, deixamos passar; passlib cairá em outro backend ou registrará erro.
    pass

CRIPTO = CryptContext(schemes=["bcrypt"], deprecated="auto")


def check_password(password: str, hash_password: str) -> bool:
    return CRIPTO.verify(password, hash_password)


def generate_hash_password(password: str) -> str:
    return CRIPTO.hash(password)
