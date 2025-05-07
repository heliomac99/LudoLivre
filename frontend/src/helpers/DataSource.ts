export interface DataSource<T> {
    itens: T[]
    total: number
    currentPage: number
    pageCount: number
    pageSize: number   
  }
  