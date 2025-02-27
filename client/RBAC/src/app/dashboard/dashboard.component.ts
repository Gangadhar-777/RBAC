import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { StudentSidebarComponent } from '../Sidebar/student-sidebar/student-sidebar.component';
import { HRSidebarComponent } from '../Sidebar/hr-sidebar/hr-sidebar.component';
import { CollegeSidebarComponent } from '../Sidebar/college-sidebar/college-sidebar.component';
import { AdminSidebarComponent } from '../Sidebar/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    StudentSidebarComponent,
    HRSidebarComponent,
    CollegeSidebarComponent,
    AdminSidebarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user = computed(() => this.authService.userDetails());

  ngOnInit() {
    let targetRoute = '/dashboard';
    switch (this.user()?.roles) {
      case 'ROLE_ADMIN':
        targetRoute = '/dashboard/admin';
        break;
      case 'ROLE_HR':
        targetRoute = '/dashboard/hr';
        break;
      case 'ROLE_COLLEGE':
        targetRoute = '/dashboard/college';
        break;
      case 'ROLE_STUDENT':
        targetRoute = '/dashboard/student';
        break;
      default:
        targetRoute = '/dashboard';
    }
    this.router.navigate([targetRoute]);
  }
}
