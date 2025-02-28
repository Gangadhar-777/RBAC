import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private BASE_URL = 'http://localhost:8081/students';
  private httpClient = inject(HttpClient);

  getAllJobs() {
    return this.httpClient.get(`${this.BASE_URL}/jobs`);
  }
}
