export interface WorkflowMetaData {
  id?: number;
  name?: string;
  language?: string;
  status?: string;
  published?: 0 | 1;
  is_draft?: 0 | 1;
  created_at?: string;
}
