interface PaginationAtributes {
  count: number
  rows: any[]
}

export class Pagination {
  readonly limit: number = 10
  readonly offset: number = 0
  readonly page: number = 0

  constructor (page: number, size: number) {
    this.page = page
    this.limit = size ?? 10
    this.offset = page !== 0 ? page * this.limit : 0
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  data (data: PaginationAtributes) {
    return {
      total_item: data.count,
      item: data.rows,
      total_page: Math.ceil(data.count / this.limit),
      current_page: this.page !== 0 ? this.page : 0
    }
  }
}
