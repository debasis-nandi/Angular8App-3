import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {

    imgPath: any = environment.imaPath;
    write2us: string = environment.write2us;
    
    constructor() {
    }

    ngOnInit() {
    }

    getCurrentYear(): string {
        return (new Date()).getFullYear().toString();
    }

    onWriteUs(): void {
        let mail2: string = 'mailto:' + this.write2us;
        window.location.href = mail2;
    }
}