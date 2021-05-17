import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/main-layout/main-layout.component';
import { SurveyLayoutComponent } from '../../shared/layout/main-layout/survey-layout.component';
import { LogoutComponent } from './logout.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyLayoutComponent,
    children: [
      { path: '', component: LogoutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutRoutingModule { }
