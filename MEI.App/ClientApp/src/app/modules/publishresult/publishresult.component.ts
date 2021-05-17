import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { AppSession } from '../../core/config/app-session';
import { ApiConfig } from '../../core/config/api-config';
import { GlobalConst, Role } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-publishresult',
    templateUrl: './publishresult.component.html',
    styleUrls: ['publishresult.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PublishResultComponent implements OnInit {

    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    
    empDetails: any;
    selectedRole: any;
    cycleList: any[] = [];
    objActiveCycle: any;

    constructor(private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        this.empDetails = AppSession.getSessionStorage('EmpDetails');
        this.selectedRole = AppSession.getSessionStorage('SelectedRole');
        let objRole: any = this.empDetails.roles.filter(x=>x.roleID == this.selectedRole)[0];
        this.getCycleList()
    }

    getCycleList(): void{
        this.loading = true;
        this.service.get(ApiConfig.ddlCycleApi).subscribe(res=>{
            if(res){
                this.cycleList = res;
                this.objActiveCycle = this.cycleList.filter(x=>x.isActive == 1).length > 0 ? this.cycleList.filter(x=>x.isActive == 1)[0] : null;
            }
            this.loading = false;
        },error=>{
            this.loading = false;
            console.log(error);
        });
    }

    onSubmit(): void {
        if (confirm('Are you sure you want to publish the result?')) {
            this.loading = true;
            let api: any = ApiConfig.publishResultApi.replace("{cycleId}", this.objActiveCycle['cycleID']);
            this.service.get(api).subscribe(res => {
                if (res.result) {
                    this.showSuccess('Result has been published successfully.');
                    setTimeout(() => {
                        this.getCycleList();
                    }, GlobalConst.growlLife);
                }
                else {
                    this.showError('Fails to publish result.');
                }
                this.loading = false;
            }, error => {
                this.loading = false;
                console.log(error);
            });
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

}
