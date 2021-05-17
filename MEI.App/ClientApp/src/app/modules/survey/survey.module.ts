import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { SurveyCompletingComponent } from './survey-completing.component';

import { SharedModule } from '../../shared/shared.module';
import { CustomLoaderModule } from '../../widgets/customspinner/custom-spinner.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurveyRoutingModule,
    SharedModule,
    CustomLoaderModule,
    CoreModule,
    GrowlModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    SurveyComponent,
    SurveyCompletingComponent
  ]
})
export class SurveyModule { }
