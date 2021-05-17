import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppSession } from '../../../core/config/app-session';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
    selector: 'app-survey-layout',
    templateUrl: './survey-layout.component.html'
})
export class SurveyLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

    imgPath: any = environment.imaPath;
    write2us: string = environment.write2us;
    empDetails: any = {};

    constructor() {
    }

    ngOnInit() {
        this.empDetails = AppSession.getSessionStorage("EmpDetails") ? AppSession.getSessionStorage("EmpDetails") : null;
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }

    getCurrentYear(): string {
        return (new Date()).getFullYear().toString();
    }

    onWriteUs(): void {
        let mail2: string = 'mailto:' + this.write2us;
        window.location.href = mail2;
    }

}