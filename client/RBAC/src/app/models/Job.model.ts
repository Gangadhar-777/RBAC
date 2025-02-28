import { User } from './User.model';

export interface Job {
  companyName: string;
  deadline: string;
  description: string;
  employmentType: string;
  jobId?: number;
  location: string;
  salary: string;
  title: string;
  user?: User;
}
