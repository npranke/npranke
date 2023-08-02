from typing import Any, Dict

from tinydb.middlewares import Middleware
from tinydb.storages import JSONStorage, Storage


class ReadOnlyMiddleware(Middleware):
    def __init__(self, storage_cls: Middleware | type[Storage]=JSONStorage):
        super(ReadOnlyMiddleware, self).__init__(storage_cls)

    def write(self, data: Dict[str, Dict[str, Any]]):
        raise RuntimeError("ReadOnlyMiddleware write not allowed")
