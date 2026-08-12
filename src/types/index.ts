export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  project_id: string;
  assigned_to: string | null;
  created_by: string;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  content: string;
  task_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
