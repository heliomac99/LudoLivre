from typing import List, TypeVar, Generic, Dict, Any, Union
from math import ceil
from enum import Enum


T = TypeVar('T')


class FilterOperator(str, Enum):
    EQUALS = 'equals'
    NOT_EQUALS = 'notEquals'
    CONTAINS = 'contains'
    GREATER_THAN = 'greaterThan'
    LESS_THAN = 'lessThan'
    GREATER_THAN_OR_EQUALS = 'greaterThanOrEquals'
    LESS_THAN_OR_EQUALS = 'lessThanOrEquals'
    IN = 'in'
    NOT_IN = 'notIn'


class Filter:
    def __init__(self, field: str, operator: FilterOperator, value: Any):
        self.field = field
        self.operator = operator
        self.value = value
        
    def to_dict(self) -> Dict[str, Any]:
        return {
            'field': self.field,
            'operator': self.operator,
            'value': self.value
        }


class DataSource(Generic[T]):
    def __init__(self, itens: List[T], total: int, currentPage: int, pageSize: int, 
                 pageCount: int = None, filters: List[Filter] = None):
        self.itens = itens
        self.total = total
        self.currentPage = currentPage
        self.pageSize = pageSize
        self.pageCount = pageCount if pageCount is not None else ceil(total / pageSize) if pageSize > 0 else 0
        self.filters = filters or []
    
    @classmethod
    def vazio(cls, currentPage: int, pageSize: int, filters: List[Filter] = None):
        return cls([], 0, currentPage, pageSize, filters=filters)
    
    def toDict(self, serialize_fn) -> Dict[str, Any]:
        return {
            'itens': [serialize_fn(item) for item in self.itens],
            'total': self.total,
            'currentPage': self.currentPage,
            'pageCount': self.pageCount,
            'pageSize': self.pageSize,
            'filters': [filter.to_dict() for filter in self.filters]
        }