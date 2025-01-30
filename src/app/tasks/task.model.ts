export interface Task {
  id: number | string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  creationDate: Date;
  deadline: Date;
}
