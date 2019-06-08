from decouple import config

class AppConfig(object):
    BASE_URL = config('BASE_URL', default=None)
    DEBUG = config('DEBUG', default=False, cast=bool)
    GA = config('GA', default=None)
    TEMPLATE_TAG = config('TEMPLATE_TAG', default=None)
