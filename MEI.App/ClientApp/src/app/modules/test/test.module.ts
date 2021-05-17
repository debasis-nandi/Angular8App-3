import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

import { CustomLoaderModule } from '../../widgets/customspinner/custom-spinner.module';
import { DataTableModule } from '../../widgets/datatable/datatable.module';

import { NgxSpinnerModule } from "ngx-spinner";
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestRoutingModule,
    SharedModule,
    CoreModule,
    CustomLoaderModule,
    DataTableModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    NgxSpinnerModule,
    TableModule,
    ChartModule
  ],
  declarations: [
    TestComponent
  ],
  providers:[
  ]
})
export class TestModule { }
