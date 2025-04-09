import { Pagination } from '@redmose/shared/models/interfaces';

export const createPagination = <T extends Pagination>(
  data: T
): Pagination => ({ ...data });
