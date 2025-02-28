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
import { JobsComponent } from './dashboard/hr/jobs/jobs.component';
import { CreateJobComponent } from './dashboard/hr/create-job/create-job.component';
import { AvJobsComponent } from './dashboard/student/av-jobs/av-jobs.component';

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
      {
        path: 'hr',
        component: HRComponent,
        children: [
          {
            path: '',
            redirectTo: 'jobs',
            pathMatch: 'full',
          },
          {
            path: 'jobs',
            component: JobsComponent,
          },
          {
            path: 'create',
            component: CreateJobComponent,
            data: {
              mode: 'create',
            },
          },
          {
            path: 'update/:id',
            component: CreateJobComponent,
            data: {
              mode: 'update',
            },
          },
        ],
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
            redirectTo: 'jobs',
            pathMatch: 'full',
          },
          {
            path: 'form',
            component: StuFormComponent,
          },
          {
            path: 'jobs',
            component: AvJobsComponent,
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
