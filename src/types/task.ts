export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
  // updatedAt?: Date;
}

export type TaskProgressColors =
  | 'primary'
  | 'yellow'
  | 'warning'
  | 'error'
  | 'gray';

export type SortOption = 'name' | 'dateCreated' | 'dateModified' | 'alertTime';

export type SortOrder = 'asc' | 'desc';
