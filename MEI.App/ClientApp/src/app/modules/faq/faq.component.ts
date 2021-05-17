import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';
import { IFaq, IFaqSection } from './faq.model';

declare var $: any;

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['faq.component.css']
})
export class FaqComponent implements OnInit, AfterViewInit, OnDestroy {

    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    faqList: IFaqSection[] = [];
    faq:IFaqSection;

    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        this.loadJQScript();
        this.getFaqs();
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    getFaqs(): void {
        this.loading = true;
        this.service.get(ApiConfig.faqApi).subscribe(res => {
            if (res.result) {
                this.faqList = res.data;
                if(this.faqList && this.faqList.length > 0){
                    this.onSelectSection(this.faqList[0].id);
                }
            }
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log(error);
        });
    }

    onSelectSection(sectionId: any): void{
        if(sectionId){
            this.faq = this.faqList.filter(x=>x.id == sectionId).length > 0 ? this.faqList.filter(x=>x.id == sectionId)[0]:null;
        }
    }

    showSuccess(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: message });
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: message });
    }

    loadJQScript(): void {
        $('#floating-container').on("click", function () {
            $(window).scrollTop(0);
        });
    }

}
