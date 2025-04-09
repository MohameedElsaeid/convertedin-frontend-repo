import { Injectable } from '@angular/core';
import { Pagination } from '../models/interfaces';

@Injectable()
export class PaginationService<T> {
  //#region Declerations
  private __pagination!: Pagination<T>;
  private readonly __limit = 10;

  get pagination() {
    return this.__pagination;
  }
  //#endregion

  //#region Methods
  /**
   * Initiaties pagination
   * @param sort Default sort value
   * @param query Initial query value
   */
  init(sort?: any, query?: string): void {
    this.__pagination = this.createPagination();
    this.__pagination.sort = sort;
    this.__pagination.query = query;
  }

  /**
   * Updates pagination with new data
   * @param data New data array to be added
   */
  processData(data: T[]): void {
    this.pagination.reachedTotalCount = data.length === 0;
    this.pagination.offset = this.pagination.offset + this.__limit;
    this.pagination.data = this.pagination.data
      ? [...this.pagination.data, ...data]
      : [...data];
  }

  /**
   * Updates pagination with new data based on next value
   * @param data New data array to be added
   * @param next Next pagination value
   */
  processDataWithNext(data: T[], next?: string): void {
    this.pagination.data = this.pagination.data
      ? [...this.pagination.data, ...data]
      : [...data];
    this.pagination.next = next;
    this.pagination.reachedTotalCount = !next;
  }

  /**
   * Resets pagination to it's default state
   */
  resetPagination(): void {
    this.pagination.data = undefined;
    this.pagination.offset = 0;
    this.pagination.reachedTotalCount = false;
  }

  // Creates a new pagination object
  private createPagination(): Pagination<T> {
    return {
      offset: 0,
      limit: this.__limit,
      reachedTotalCount: false,
    };
  }
  //#endregion
}
