import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';
import { ChartModule } from 'primeng/chart';

import { SurveyTrendRoutingModule } from './surveytrend-routing.module';
import { SurveyTrendComponent } from './surveytrend.component';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { CustomLoaderModule } from '../../widgets/customspinner/custom-spinner.module';
import { DataTableModule } from '../../widgets/datatable/datatable.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurveyTrendRoutingModule,
    SharedModule,
    CustomLoaderModule,
    CoreModule,
    GrowlModule,
    DialogModule,
    ButtonModule,
    DataTableModule,
    ChartModule
  ],
  declarations: [
    SurveyTrendComponent
  ]
})
export class SurveyTrendModule { }
