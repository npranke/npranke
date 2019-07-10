from decouple import config

class AppConfig(object):
    BASE_URL = config("BASE_URL", default=None)
    FLASK_ENV = config("FLASK_ENV", default=None)
    GA = config("GA", default=None)
    TEMPLATE_TAG = config("TEMPLATE_TAG", default=None)
