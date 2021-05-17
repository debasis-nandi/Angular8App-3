import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst, SurveyStatus } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';

declare var $: any;

@Component({
    selector: 'app-survey-completing',
    templateUrl: './survey-completing.component.html',
    styleUrls: ['survey.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SurveyCompletingComponent implements OnInit, AfterViewInit, OnDestroy {
    
    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    isComplete: boolean = false;
    isClose: boolean = false;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: HttpService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let statusCode: string = params['code'] || null;
            this.isComplete = (statusCode == SurveyStatus.complete) ? true : false;
            this.isClose = (statusCode == SurveyStatus.close) ? true : false;
        });

        //AppSession.clearSessionStorage("EmpDetails");
        //AppSession.clearSessionStorage("SelectedRole");
        AppSession.clearSessionStorage("RequestUrl");
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    showSuccess(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: message });
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: message });
    }

}
