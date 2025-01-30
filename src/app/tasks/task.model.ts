export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  creationDate: Date;
  deadline: Date;
}
