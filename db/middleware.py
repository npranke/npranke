from tinydb import TinyDB
from tinydb.middlewares import Middleware


class ReadOnlyMiddleware(Middleware):
    def __init__(self, storage_cls=TinyDB.default_storage_class):
        super(ReadOnlyMiddleware, self).__init__(storage_cls)

    def write(self, data):
        raise RuntimeError('ReadOnlyMiddleware write not allowed')
