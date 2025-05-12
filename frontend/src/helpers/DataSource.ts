export class DataSource<T> {
  itens: T[]
  total: number
  currentPage: number
  pageCount: number
  pageSize: number
  filters: Filter[]

  constructor(
    itens: T[] = [],
    total: number = 0,
    currentPage: number = 1,
    pageSize: number = 10,
    filters: Filter[] = []
  ) {
    this.itens = itens;
    this.total = total;
    this.currentPage = currentPage;
    this.pageCount = Math.ceil(total / pageSize);
    this.pageSize = pageSize;
    this.filters = filters;
  }
}

export interface Filter {
  field: string
  operator: FilterOperator
  value: any
}

export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  CONTAINS = 'contains',
  GREATER_THAN = 'greaterThan',
  LESS_THAN = 'lessThan',
  GREATER_THAN_OR_EQUALS = 'greaterThanOrEquals',
  LESS_THAN_OR_EQUALS = 'lessThanOrEquals',
  IN = 'in',
  NOT_IN = 'notIn'
}