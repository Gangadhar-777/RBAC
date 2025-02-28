import { Component, inject, signal } from '@angular/core';
import { StudentService } from '../../../services/Student.service';
import { Job } from '../../../models/Job.model';

@Component({
  selector: 'app-av-jobs',
  imports: [],
  templateUrl: './av-jobs.component.html',
  styleUrl: './av-jobs.component.css',
})
export class AvJobsComponent {
  // AV = Available Jobs
  private stuService = inject(StudentService);
  jobs = signal<Job[]>([]);

  ngOnInit() {
    this.stuService.getAllJobs().subscribe({
      next: (data: any) => {
        console.log(data);
        this.jobs.set(data);
      },
    });
  }
}
