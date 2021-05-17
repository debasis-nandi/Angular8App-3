import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-bridge2home',
    templateUrl: './bridge2home.component.html'
})
export class Bridge2HomeComponent implements OnInit, AfterViewInit, OnDestroy {

    loading: boolean = false;
    
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: HttpService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let selectedRole = params['id'] || null;
            AppSession.setSessionStorage('SelectedRole', selectedRole);
            if(AppSession.getSessionStorage('RequestUrl')){
                let url: any = AppSession.getSessionStorage('RequestUrl');
                this.router.navigateByUrl(url);
            }
            else{
                this.router.navigateByUrl('home');
            }
        });
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

}
