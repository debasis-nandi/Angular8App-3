import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LazyLoadEvent } from 'primeng/api';
import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { AppUtil } from '../../core/config/app-util';
import { GlobalConst, DocType, TableName, Action, validatorPattern } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';

import { ITableConfig } from '../../widgets/datatable/datatable.model';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    
    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    onFaq(): void{
        this.router.navigateByUrl('surveyobjectives');
    }

    onHeatMap(): void{
        this.router.navigateByUrl('heatmap');
    }

    onSurveyTrend(): void{
        this.router.navigateByUrl('surveytrend');
    }

}
