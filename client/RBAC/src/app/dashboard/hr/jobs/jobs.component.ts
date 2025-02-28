import { Component, inject, signal } from '@angular/core';
import { HRService } from '../../../services/HR.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  private hrService = inject(HRService);
  jobs = signal<any>([]);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.hrService.getJobs().subscribe({
      next: (data) => {
        this.jobs.set(data);
        console.log(this.jobs());
      },
    });
  }

  onEdit(id: number) {
    this.router.navigate([`/dashboard/hr/update/${id}`]);
  }
}
