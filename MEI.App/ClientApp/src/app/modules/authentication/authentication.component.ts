import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst, Role } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';
import { EmpDetails } from './authentication.model';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['authentication.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements OnInit, AfterViewInit, OnDestroy {

    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    isWinAuth: boolean = environment.isWindAuth;
    email: string = '';
    
    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        if (this.isWinAuth) {
            this.loading = true;
            this.service.WindowAuth(environment.windAuthApi).subscribe(res => {
                if(res.Result){
                    let objArray: any[] = res.UserName.split('\\');
                    let userName: string = objArray.length > 0 ? objArray[1] : null;
                    if(userName){
                        let email: string = environment.production ? userName.concat(environment.companyDomain) : 'xx'+ userName.concat(environment.companyDomain);
                        //console.log(email);
                        this.getEmpDetails(email);
                    }
                }
                else{
                    this.router.navigateByUrl('error/unauthorized');
                    this.loading = false;
                }
            }, error => {
                this.loading = false;
                console.log(error);
            });
        }

    }

    onLogin(): void{
        if(this.email.trim()){
            this.getEmpDetails(this.email);
        }
        else{
            this.showError('Please enter email.');
        }
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    getEmpDetails(email: string): void{
        this.loading = true;
        let api: string = ApiConfig.empDetailsApi.replace("{email}",email);
        this.service.get(api).subscribe(res=>{
            if(res.result){
                let empDetails: EmpDetails = res.data;
                AppSession.setSessionStorage('EmpDetails', empDetails);
                if(empDetails.roles && empDetails.roles.length > 0){
                    let selectedRole: number = empDetails.roles.filter(x=>x.roleShortName == Role.individual)[0].roleID;
                    this.router.navigate(['bridge2home/bridge', selectedRole]);
                }
                else{
                    let url: any = AppSession.getSessionStorage('RequestUrl');
                    if(url == 'survey'){
                        this.router.navigateByUrl(url);
                    }
                    else{
                        this.router.navigateByUrl('error/unauthorized');        
                    }
                }
            }
            else{
                this.router.navigateByUrl('error/unauthorized');
            }
            this.loading = false;
        },error=>{
            console.log(error);
            this.loading = false;
        });
    }

    getCurrentYear(): string {
        return (new Date()).getFullYear().toString();
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
