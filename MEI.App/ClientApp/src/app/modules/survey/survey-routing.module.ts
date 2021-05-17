import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/main-layout/main-layout.component';
import { SurveyLayoutComponent } from '../../shared/layout/main-layout/survey-layout.component';
import { SurveyComponent } from './survey.component';
import { SurveyCompletingComponent } from './survey-completing.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyLayoutComponent,
    children: [
      { path: '', component: SurveyComponent }
    ]
  },
  {
    path: 'status/:code',
    component: SurveyLayoutComponent,
    children: [
      { path: '', component: SurveyCompletingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
