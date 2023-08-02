from typing import NamedTuple


class ContentEncoding(NamedTuple):
    code: str
    ext: str


BROTLI = ContentEncoding("br", "br")
