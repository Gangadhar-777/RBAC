import { NgClass, NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HRService } from '../../../services/HR.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-job',
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css',
})
export class CreateJobComponent {
  private hrService = inject(HRService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  isLoading: boolean = false;
  id = input.required<number>();

  jobData = {
    title: '',
    description: '',
    companyName: '',
    location: '',
    employmentType: '',
    salary: null,
    deadline: '',
  };

  ngOnInit() {
    console.log(this.id());
    this.hrService.getJob(this.id()).subscribe({
      next: (data: any) => {
        this.jobData = data;
      },
    });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    if (this.id()) {
      this.hrService.updateJob(this.id(), form.value).subscribe({
        next: (data) => {
          this.router.navigate(['/dashboard/hr/jobs']);
        },
      });
    } else {
      this.hrService.postJob(form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard/hr/jobs']);
        },
      });
    }
  }
}
