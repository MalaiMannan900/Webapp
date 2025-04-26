import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', // Redirect to login initially
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login-master/login-master.module').then(m => m.LoginMasterModule),
  },
  {
    path: 'register-master',
    loadChildren: () => import('./register-master/register-master.module').then(m => m.RegisterMasterModule),
  },
  {
    path: '**',
    redirectTo: '/login', // Wildcard route, redirect to login if path doesn't match
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
