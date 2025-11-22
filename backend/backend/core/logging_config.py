import logging
import sys
import os
from logging.handlers import RotatingFileHandler
from logging import Handler, Formatter

# from utils.contact.email_log_handler import EmailLogHandler


def _configure_console_handler(formatter: Formatter) -> Handler:
    console_handler: Handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)

    return console_handler


def _configure_file_handler(formatter: Formatter) -> Handler:
    # Garante que diretório de logs exista para evitar FileNotFoundError durante import (ex: Alembic env)
    log_dir = os.path.join(os.path.dirname(__file__), "logs")
    # Usa diretório ao lado deste arquivo (core/) => core/logs
    os.makedirs(log_dir, exist_ok=True)
    log_path = os.path.join(log_dir, "pulso360.log")

    file_handler: RotatingFileHandler = RotatingFileHandler(
        log_path, maxBytes=10 * 1024 * 1024, backupCount=5, encoding="utf-8"  # 10MB
    )
    file_handler.setFormatter(formatter)
    return file_handler


# def _configure_email_handler(formatter: Formatter) -> Handler:
#     email_handler = EmailLogHandler()
#     email_handler.setFormatter(formatter)
#     return email_handler


def configure_logging():
    logger = logging.getLogger("pulso360")  # nome da aplicação
    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    logger.addHandler(_configure_console_handler(formatter))
    logger.addHandler(_configure_file_handler(formatter))
    # logger.addHandler(_configure_email_handler(formatter))

    return logger
