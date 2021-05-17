import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';

import { Bridge2HomeRoutingModule } from './bridge2home-routing.module';
import { Bridge2HomeComponent } from './bridge2home.component';

import { SharedModule } from '../../shared/shared.module';
import { CustomLoaderModule } from '../../widgets/customspinner/custom-spinner.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Bridge2HomeRoutingModule,
    SharedModule,
    CustomLoaderModule,
    CoreModule,
    GrowlModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    Bridge2HomeComponent
  ]
})
export class Bridge2HomeModule { }
