from decouple import config

class AppConfig(object):
    DEBUG = config('DEBUG', default=False, cast=bool)
    TEMPLATE_TAG = config('TEMPLATE_TAG', default=None)
