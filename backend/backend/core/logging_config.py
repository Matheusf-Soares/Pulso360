import logging
import sys
from logging.handlers import RotatingFileHandler
from logging import Handler, Formatter
from utils.contact.email_log_handler import EmailLogHandler

def _configure_console_handler(formatter: Formatter) -> Handler:
    console_handler: Handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)

    return console_handler


def _configure_file_handler(formatter: Formatter) -> Handler:
    file_handler: RotatingFileHandler = RotatingFileHandler("logs/wave_app.log",
                                                            maxBytes=10*1024*1024,  # 10MB
                                                            backupCount=5,
                                                            encoding="utf-8")
    file_handler.setFormatter(formatter)
    return file_handler


def _configure_email_handler(formatter: Formatter) -> Handler:
    email_handler = EmailLogHandler()
    email_handler.setFormatter(formatter)
    return email_handler


def configure_logging():
    logger = logging.getLogger("wave")  # nome da sua aplicação/projeto
    logger.setLevel(logging.INFO)

    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(name)s | %(message)s")

    logger.addHandler(_configure_console_handler(formatter))
    logger.addHandler(_configure_file_handler(formatter))
    logger.addHandler(_configure_email_handler(formatter))

    return logger