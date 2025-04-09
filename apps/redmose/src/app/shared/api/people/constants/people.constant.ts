export class PeopleEndpoints {
  // All customers list endpoint
  static readonly GET_ALL_CUSTOMERS = '/api/customers';
  // Upload csv
  static readonly UPLOAD_CUSTOMERS_CSV = '/api/customers/upload';
  // Get all segments
  static readonly GET_ALL_SEGMENTS_GROUPS = 'api/segments/groups';
  // Customer details
  static readonly CUSTOMER_DETAILS = (id: number) => `/api/customers/${id}`;
  // Get all sources
  static readonly GET_ALL_SOURCES = '/api/customer-sources';
}
