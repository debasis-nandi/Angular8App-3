import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlModule } from 'primeng/growl';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { CustomLoaderModule } from '../../widgets/customspinner/custom-spinner.module';
import { PublishResultRoutingModule } from './publishresult-routing.module';
import { PublishResultComponent } from './publishresult.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    CustomLoaderModule,
    GrowlModule,
    PublishResultRoutingModule
  ],
  declarations: [
    PublishResultComponent
  ]
})
export class PublishResultModule { }
