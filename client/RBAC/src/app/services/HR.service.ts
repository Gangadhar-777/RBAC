import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HRService {
  private BASE_URL = 'http://localhost:8081/hr';
  private http = inject(HttpClient);

  postJob(job: any) {
    return this.http.post(`${this.BASE_URL}/job`, job);
  }

  getJobs() {
    return this.http.get(`${this.BASE_URL}/jobs`);
  }

  getJob(id: number) {
    return this.http.get(`${this.BASE_URL}/jobs/${id}`);
  }

  updateJob(id: number, job: any) {
    job.jobId = id;
    return this.http.put(`${this.BASE_URL}/job`, job);
  }
}
