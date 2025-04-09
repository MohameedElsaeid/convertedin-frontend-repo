import { Injectable } from '@angular/core';
import { NotificationList } from '../api/models/interfaces';

@Injectable()
export class PaginationService {
  data: NotificationList | undefined;
  currentPage: number = 0;
  readonly perPage: number = 10;
  reachedTotal: boolean = false;

  processData(
    data: NotificationList,
    validateOnActionCount: boolean = false
  ): void {
    this.data = this.data
      ? {
          ...this.data,
          data: [...this.data.data, ...data.data],
        }
      : { ...data };
    this.reachedTotal =
      this.data.data.length >=
      (validateOnActionCount
        ? data.meta.requiredActionsCount
        : data.meta.total);
  }

  resetPagination(): void {
    this.data = undefined;
    this.reachedTotal = false;
    this.currentPage = 0;
  }
}
