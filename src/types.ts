export interface AuthResponse {
  token: string
}

export interface Project {
  id: number
  name: string
  description?: string
  ownerId: number
  createdAt: string
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MED' | 'HIGH'

export interface Task {
  id: number
  title: string
  description?:string
  status: TaskStatus
  priority: TaskPriority
  projectId: number
  assigneeId: number
  dueDate: string
}

export interface NewTask {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId?: number
  projectId: number
  dueDate: string
}

export interface NewProject {
  name: string
  description?: string
}

// PUT /projects/{id} recibe los mismos campos editables que POST /projects.
export type UpdateProject = NewProject

export type UpdateTask = NewTask

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://d3ujwk09smrk9z.cloudfront.net')

export const TOKEN_KEY = 'proyecto-final-token'
