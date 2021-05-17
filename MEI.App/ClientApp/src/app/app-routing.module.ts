import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./modules/logout/logout.module').then(m => m.LogoutModule)
  },
  {
    path: 'bridge2home',
    loadChildren: () => import('./modules/bridge2home/bridge2home.module').then(m => m.Bridge2HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'surveyobjectives',
    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'heatmap',
    loadChildren: () => import('./modules/heatmap/heatmap.module').then(m => m.HeatMapModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'surveytrend',
    loadChildren: () => import('./modules/surveytrend/surveytrend.module').then(m => m.SurveyTrendModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'survey',
    loadChildren: () => import('./modules/survey/survey.module').then(m => m.SurveyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'publishresult',
    loadChildren: () => import('./modules/publishresult/publishresult.module').then(m => m.PublishResultModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
