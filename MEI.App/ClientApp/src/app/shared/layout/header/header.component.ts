import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../core/services/http.service';
import { ApiConfig } from '../../../core/config/api-config';
import { AppSession } from '../../../core/config/app-session';
import { Role } from '../../../core/config/app-enum';
import { environment } from '../../../../environments/environment';
import { EmpDetails } from '../../../modules/authentication/authentication.model';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  imgPath: any = environment.imaPath;
  empDetails: EmpDetails = {};
  empSelectedRole: any;
  isAdmin: boolean = false;
  
  constructor(private router: Router, private service: HttpService) {
  }

  ngOnInit() {
    this.empDetails = AppSession.getSessionStorage("EmpDetails") ? AppSession.getSessionStorage("EmpDetails") : null;
    this.empSelectedRole = AppSession.getSessionStorage("SelectedRole") ? AppSession.getSessionStorage("SelectedRole") : null;
    this.isAdmin = (this.empDetails.roles.filter(x=>x.roleID == this.empSelectedRole)[0].roleShortName == Role.management) ? true : false; 
  }

  onChangedRole(e: any, roleID: any): any {
    if (confirm('Are you sure you want to go with different role?')) {
      this.empSelectedRole = roleID;
      this.router.navigate(['bridge2home/bridge', this.empSelectedRole]);
    }
    else {
      e.preventDefault();
    }
  }

  onLogout(): void {
    AppSession.clearSessionStorage("EmpDetails");
    AppSession.clearSessionStorage("SelectedRole");
    AppSession.clearSessionStorage("RequestUrl");
    this.router.navigateByUrl('logout');
  }

  onPublishResult(): void{
    this.router.navigateByUrl('publishresult');
  }

}