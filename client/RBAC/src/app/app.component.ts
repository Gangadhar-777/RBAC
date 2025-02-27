import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from './services/Auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RBAC';
  private authService = inject(AuthService);
  user = computed(() => this.authService.userDetails());

  ngOnInit(){
    if(this.user()) {
      this.authService.startLogoutTimer();
    }  
  }
}
