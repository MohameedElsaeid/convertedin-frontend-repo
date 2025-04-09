import { Injectable } from '@angular/core';
import { Pagination } from '@redmose/shared/models/interfaces';
import { createPagination } from '@redmose/shared/utilities/factories';
import { TableLazyLoadEvent } from 'primeng/table';

@Injectable()
export class PaginationService {
  //#region Declerations
  private _first: number = 1;
  private _pagination: Pagination = this.createPagination();

  get first() {
    return this._first;
  }
  get pagination() {
    return this._pagination;
  }
  //#endregion

  //#region Methods
  /**
   * Called on pagination change, updates current pagination state with new values
   * @param event New pagination data
   * @param action Action to be executed after data is updated
   */
  paginationChange(event: TableLazyLoadEvent, action: () => void): void {
    this._pagination.meta.current_page =
      event.first === 1
        ? 1
        : event.first / parseInt(this._pagination.meta.per_page) + 1;
    this._pagination.meta.per_page = event.rows.toString();
    this._first = event.first;
    action();
  }

  /**
   * Convertes per_page to number format
   * @returns Number format
   */
  getPerPageNumber(): number {
    return parseInt(this._pagination.meta.per_page);
  }

  /**
   * Updates pagination object with new values
   * @param data Data to update pagination with
   */
  updatePagination<T extends Pagination>(data: T): void {
    this._pagination = createPagination<T>(data);
  }

  /**
   * Resets pagination to default values
   */
  resetPaginations(): void {
    this._first = 1;
    this.pagination.meta.current_page = 1;
    this.pagination.meta.per_page = '10';
  }

  private createPagination(): Pagination {
    return {
      links: {
        first: null,
        last: null,
        next: null,
        prev: null,
      },
      meta: {
        current_page: 1,
        from: 0,
        last_page: 0,
        links: [],
        path: '',
        per_page: '10',
        to: 0,
        total: 0,
      },
    };
  }
  //#endregion
}
