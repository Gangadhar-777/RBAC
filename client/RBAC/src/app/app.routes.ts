import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HRComponent } from './dashboard/hr/hr.component';
import { CollegeComponent } from './dashboard/college/college.component';
import { StudentComponent } from './dashboard/student/student.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { authChildGuard, authGuard } from './guards/auth.guard';
import { StuFormComponent } from './dashboard/student/stu-form/stu-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    component: DashboardComponent,
    children: [
      //Redirect based upon role (Implement it! -> Pending)
      {
        path: 'hr',
        component: HRComponent,
        children: [],
      },
      {
        path: 'college',
        component: CollegeComponent,
        children: [],
      },
      {
        path: 'student',
        component: StudentComponent,
        children: [
          {
            path: '',
            redirectTo: 'form',
            pathMatch: 'full',
          },
          {
            path: 'form',
            component: StuFormComponent,
          },
        ],
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
    ],
  },
];
