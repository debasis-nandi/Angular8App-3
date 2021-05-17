import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';

import { HeatMapRoutingModule } from './heatmap-routing.module';
import { HeatMapComponent } from './heatmap.component';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { CustomLoaderModule } from '../../widgets/customspinner/custom-spinner.module';
import { DataTableModule } from '../../widgets/datatable/datatable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeatMapRoutingModule,
    SharedModule,
    CustomLoaderModule,
    CoreModule,
    GrowlModule,
    DialogModule,
    ButtonModule,
    DataTableModule
  ],
  declarations: [
    HeatMapComponent
  ]
})
export class HeatMapModule { }
