from typing import List, TypeVar, Generic, Dict, Any
from math import ceil

T = TypeVar('T')

class DataSource(Generic[T]):
    def __init__(self, itens, total, currentPage, pageSize, pageCount=None):
        self.itens = itens
        self.total = total
        self.currentPage = currentPage
        self.pageSize = pageSize
        self.pageCount = pageCount if pageCount is not None else ceil(total / pageSize)
        
    @classmethod
    def vazio(cls, currentPage: int, pageSize: int):
        return cls([], 0, currentPage, pageSize)

    def to_dict(self, serialize_fn) -> Dict[str, Any]:
        return {
            'itens': [serialize_fn(item) for item in self.itens],
            'total': self.total,
            'currentPage': self.currentPage,
            'pageCount': self.pageCount,
            'pageSize': self.pageSize
        }
