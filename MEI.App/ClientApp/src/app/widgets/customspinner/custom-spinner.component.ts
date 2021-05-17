import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

declare var $: any;

@Component({
    selector: 'my-custom-spinner',
    templateUrl: './custom-spinner.component.html',
    styleUrls: ['custom-spinner.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomSpinnerComponent implements OnInit {

    @Input() loading: boolean = false;
    
    constructor(){
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.loading) {
            $('#cover-spin').show(0);
        }
        else {
            $('#cover-spin').hide(0);
        }
    }

}