from collections import namedtuple


ContentEncoding = namedtuple("ContentEncoding", ["code", "ext"])


BROTLI = ContentEncoding("br", "br")
