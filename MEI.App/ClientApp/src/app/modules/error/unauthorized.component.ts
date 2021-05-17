import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { AppSession } from '../../core/config/app-session';
import { ApiConfig } from '../../core/config/api-config';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['error.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UnAuthorizedComponent implements OnInit {

    overlay: boolean = false;
    
    constructor(private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        AppSession.clearSessionStorage('');
    }

    takeMeLogin(): void{
        this.router.navigateByUrl('login');
    }

}
