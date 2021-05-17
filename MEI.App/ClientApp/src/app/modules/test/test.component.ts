import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst } from '../../core/config/app-enum';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
import { LazyLoadEvent } from 'primeng/api';

import * as Chart from 'chart.js'

declare var $: any;

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['test.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit, AfterViewInit {
    
    overlay: boolean = false;
    date: any;
    
    chartData: any;
    options: any;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: HttpService, private spinner: NgxSpinnerService, private _cdr: ChangeDetectorRef) {
        
    }

    ngOnInit() {
        /*this.overlay = true;
        setTimeout(() => {
            this.overlay = false;
        }, 5000);*/
    }

    ngAfterViewInit() {
    }
    
}
