import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Action, TableName, Range } from '../../core/config/app-enum';
import { AppUtil} from '../../core/config/app-util';
import { ITableConfig, Table, Column } from './datatable.model';
import { environment } from '../../../environments/environment';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'my-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['datatable.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {

    @Output() valueChange = new EventEmitter();
    @Output() onLazyLoading = new EventEmitter();

    @Input() table: Table;
    @Input() columns: Column[];
    @Input() rows: any;
    @Input() tableName: any;
    @Input() totalRecords: any;
    @Input() loading: boolean = false;
    @Input() colorCodeRange: any[];

    imgPath: any = environment.imaPath;
    isRequiredCaption: boolean = false;
    isRequiredColorBar: boolean = false;

    constructor(private router: Router){
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.table) {
            //this.table.paginator = this.rows.length > this.table.rows ? true : false;
            this.isRequiredCaption = (this.tableName == TableName.surveytrend && this.table.globalsearch == false) ? false : true;
            this.isRequiredColorBar = (this.tableName == TableName.heatmap) ? true : false;
        }
    }

    loadLazy(event: LazyLoadEvent) {
        let isValidEmit: boolean = true;
        isValidEmit = (event.globalFilter && event.globalFilter.trim().length < 4) ? false : true;
        if (isValidEmit) {
            this.onLazyLoading.emit(event);
        }
    }

    getScore(value: any): any{
        return value ? value : 0;
    }

    getScoreCss(score: any): string {
        let css: string = '';
        if (this.tableName == TableName.heatmap) {
            let range: string = this.getRange(score);
            if (range == Range.range1) {
                css = 'met met1';
            }
            if (range == Range.range2) {
                css = 'met met2';
            }
            if (range == Range.range3) {
                css = 'met met3';
            }
            if (range == Range.range4) {
                css = 'met met6';
            }
            if (range == Range.range5) {
                css = 'met met8';
            }
        }
        return css;
    }

    getRange(score: any): string{
        let range: string = '';
        if(this.colorCodeRange && this.colorCodeRange.length > 0){
            for(let item of this.colorCodeRange){
                if(score <= item.value){
                    range = item.field;
                    break;
                }
            }
            range = range ? range : Range.range5;
        }
        return range;
    }

    getStatusCss(status: any): string {
        return (status == 'Active') ? 'status-inProcess' : 'status-Inactive';
    }

    getRowCssClass(cssClass: any, rowData: any): any {
        return cssClass;
    }

    onSearch() {
        let emited: any = { action: Action.search, data: '' };
        this.valueChange.emit(emited);
    }

    getCssClass(rowData: any): any {
        let cssClass: any = '';
        return cssClass;
    }

    onAction(actionType: any, index?: any, row?: any) {
        let emited: any = { action: actionType, data: row };
        if (actionType == Action.delete) {
            if (confirm("Do you really want to delete the record?")) {
                this.valueChange.emit(emited);
            }
        }
        else {
            this.valueChange.emit(emited);
        }
    }

    onLinkClick(routeLink: any, field: any, rowIndex?: any, row?: any){
        this.router.navigate([routeLink, field]);
    }

    onEdit(routeLink: any, id: any) {
        this.router.navigate([routeLink, id]);
    }

    onDelete(id: any) {
        this.valueChange.emit(id);
    }

    onDownloadAll(): void{
        this.valueChange.emit(true);
    }

    onAddNew(): void {
        let emited: any = { action: Action.add, data: null };
        this.valueChange.emit(emited);
    }

    isDelete(actionList: any[] = []): Boolean {
        return (actionList && actionList.filter(x => x == Action.delete).length > 0) ? true : false;
    }

    isDownload(actionList: any[] = []): Boolean {
        return (actionList && actionList.filter(x => x == Action.download).length > 0) ? true : false;
    }

    isShare(actionList: any[] = []): Boolean {
        return (actionList && actionList.filter(x => x == Action.share).length > 0) ? true : false;
    }

    isCopy(actionList: any[] = []): boolean {
        return (actionList && actionList.filter(x => x == Action.copy).length > 0) ? true : false;
    }

    isEdit(actionList: any[] = []): boolean {
        return (actionList && actionList.filter(x => x == Action.edit).length > 0) ? true : false;
    }

    isDisable(actionList: any[] = []): boolean {
        return (actionList && actionList.filter(x => x == Action.disable).length > 0) ? true : false;
    }

    isEnable(actionList: any[] = []): boolean {
        return (actionList && actionList.filter(x => x == Action.enable).length > 0) ? true : false;
    }

    isPreview(actionList: any[] = []): boolean {
        return (actionList && actionList.filter(x => x == Action.preview).length > 0) ? true : false;
    }

}