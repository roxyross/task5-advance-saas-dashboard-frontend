export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface AnalyticsData {
  label: string;
  value: number;
  timestamp: string;
}

export interface DashboardMetrics {
  total_users: number;
  active_sessions: number;
  revenue: number;
  growth_rate: number;
  chart_data: AnalyticsData[];
}

export interface ActivityLog {
  id: number;
  action: string;
  details: Record<string, any>;
  status: string;
  timestamp: string;
  user_id: number;
}
