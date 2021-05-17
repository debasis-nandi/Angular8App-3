import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLayoutComponent } from '../../shared/layout/login-layout/login-layout.component';
import { Bridge2HomeComponent } from './bridge2home.component';

const routes: Routes = [
  {
    path: '',
    component: null,
    children: [
      { path: '', component: Bridge2HomeComponent }
    ]
  },
  {
    path: 'bridge/:id',
    component: null,
    children: [
      { path: '', component: Bridge2HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Bridge2HomeRoutingModule { }
