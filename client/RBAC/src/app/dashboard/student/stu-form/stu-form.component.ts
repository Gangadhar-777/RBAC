import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/Auth.service';

@Component({
  selector: 'app-stu-form',
  imports: [FormsModule],
  templateUrl: './stu-form.component.html',
  styleUrl: './stu-form.component.css',
})
export class StuFormComponent {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  onSubmitForm(form: NgForm) {
    console.log(form.value);

    this.httpClient
      .post('http://localhost:8081/students', form.value)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }
}
