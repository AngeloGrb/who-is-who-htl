import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'profile-student',
    loadComponent: () => import('./profile-student/profile-student.page').then( m => m.ProfileStudentPage)
  },
  {
    path: 'profile-teacher',
    loadComponent: () => import('./profile-teacher/profile-teacher.page').then( m => m.ProfileTeacherPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'detail-student/:id',
    loadComponent: () => import('./detail-student/detail-student.page').then( m => m.DetailStudentPage)
  },
  {
    path: 'detail-teacher/:id',
    loadComponent: () => import('./detail-teacher/detail-teacher.page').then( m => m.DetailTeacherPage)
  }
];
