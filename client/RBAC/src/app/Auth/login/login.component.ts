import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  user = computed(() => this.authService.userDetails());

  onSubmitLogin(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe();
  }
}
