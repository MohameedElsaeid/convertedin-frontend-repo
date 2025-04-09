export class BillingEndpoints {
  // Get all plans endpoint
  static readonly GET_ALL_PLANS = '/api/v1/plans';
  // Get active plan endpoint
  static readonly GET_ACTIVE_PLAN = '/api/v1/plans/active';
  // Upgrade Plan
  static readonly CHANGE_PLAN = '/api/plans/upgrade';
  // Get invoice endpoint
  static readonly GET_ALL_INVOICES = '/api/invoices';
  // Get quotas endpoint
  static readonly GET_ALL_QUOTAS = '/api/quotas';
  // Buy quotas endpoint
  static readonly BUY_QUOTAS = '/api/quotas/buy';
  // Get all Active Quotas
  static readonly GET_ACTIVE_QUOTAS = '/api/quotas/current';
}
