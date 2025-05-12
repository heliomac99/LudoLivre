from typing import List, Type, Any, Callable
from sqlalchemy.orm import Query
from helpers.dataSource import Filter, FilterOperator
from helpers.dataSource import DataSource

class FiltroService:

    @staticmethod
    def aplicarFiltros(query: Query, modelo: Type[Any], filtros: List[Filter]) -> Query:
        if not filtros:
            return query

        for f in filtros:
            filtro = f if isinstance(f, Filter) else Filter(**f)

            if not hasattr(modelo, filtro.field):
                continue

            campo = getattr(modelo, filtro.field)

            if filtro.operator == FilterOperator.EQUALS:
                query = query.filter(campo == filtro.value)

            elif filtro.operator == FilterOperator.NOT_EQUALS:
                query = query.filter(campo != filtro.value)

            elif filtro.operator == FilterOperator.CONTAINS:
                query = query.filter(campo.ilike(f"%{filtro.value}%"))

            elif filtro.operator == FilterOperator.GREATER_THAN:
                query = query.filter(campo > filtro.value)

            elif filtro.operator == FilterOperator.LESS_THAN:
                query = query.filter(campo < filtro.value)

            elif filtro.operator == FilterOperator.GREATER_THAN_OR_EQUALS:
                query = query.filter(campo >= filtro.value)

            elif filtro.operator == FilterOperator.LESS_THAN_OR_EQUALS:
                query = query.filter(campo <= filtro.value)

            elif filtro.operator == FilterOperator.IN and isinstance(filtro.value, list):
                query = query.filter(campo.in_(filtro.value))

            elif filtro.operator == FilterOperator.NOT_IN and isinstance(filtro.value, list):
                query = query.filter(~campo.in_(filtro.value))

        return query

    @staticmethod
    def criarQueryPaginadoFiltros(
        modelo: Type[Any],
        ds: DataSource,
        where: Callable[[Query], Query] = None
    ) -> Query:
        query = modelo.query
        if where:
            query = where(query)
        return FiltroService.aplicarFiltros(query, modelo, ds.filters)
