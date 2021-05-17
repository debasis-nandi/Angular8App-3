import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { ErrorRoutingModule } from './error-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { UnAuthorizedComponent } from './unauthorized.component';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ErrorRoutingModule
  ],
  declarations: [
      PageNotFoundComponent,
      UnAuthorizedComponent,
      ErrorComponent
    ]
})
export class ErrorModule { }
