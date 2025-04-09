export interface OptimizationLogResponse{
    logs: OptimizationLog[];
    current_page:number;
    pages_number:number;

}

export interface OptimizationLog {
  request: string;
  content: string;
  status: string;
  created_at: string;
  action_by: string;
}
