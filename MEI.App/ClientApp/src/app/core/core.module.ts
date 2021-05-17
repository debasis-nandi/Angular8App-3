import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpService } from './services/http.service';
import { HttpInterceptorService } from './services/api-interceptor.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { CustomValidationService } from '../core/services/customvalidation.service';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule
    ],
    declarations: [],
    providers: [
      HttpService,
      AuthGuard,
      CustomValidationService,
      { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    ],
    exports: []
  })
  export class CoreModule {}
