import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst, Range, TableName, Role } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';
import { ITableConfig } from '../../widgets/datatable/datatable.model';

declare var $: any;

@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['heatmap.component.css']
})
export class HeatMapComponent implements OnInit, AfterViewInit, OnDestroy {

    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    tabTableConfig:ITableConfig = { table: null, columns: [], rows: [] };
    tabTableName: string = TableName.heatmap;
    totalRecords: any;
    commentList: string[] = [];
    comment1List: string[] = [];
    comment2List: string[] = [];

    empDetails: any;
    selectedRole: any;

    colorCodeRange: any[] = [];
    cycleOption: any[] = [];
    rankOption: any[] = [];
    orderOption: any[] = [];
    
    selectedCycle: any;
    selectedRank: any;
    selectedOrder: any;
    isUser: boolean = false;
    
    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        this.empDetails = AppSession.getSessionStorage('EmpDetails');
        this.selectedRole = AppSession.getSessionStorage('SelectedRole');
        let objRole: any = this.empDetails.roles.filter(x=>x.roleID == this.selectedRole)[0];
        this.isUser = objRole.roleShortName == Role.individual ? true : false;

        this.loadJQScript();
        this.setDefault();
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    setDefault(){
        this.loading = true;
        this.getCycleOption();
        this.getRankOption();
        this.getOrderOption();

        setTimeout(() => {
            this.getData();
        }, 1000);
    }

    getData(): void {
        this.loading = true;
        this.tabTableConfig = { table: null, columns: [], rows: [] };
        //let api: any = environment.jsonFilePath + 'heat-map.json';
        let api: any = ApiConfig.getDashboard1Api;
        let objRole: any = this.empDetails.roles.filter(x=>x.roleID == this.selectedRole)[0];
        
        let model: any = {
            EMPID: this.empDetails.empID,
            CycleID: this.selectedCycle,
            Role: objRole.roleShortName,
            DisplayName: this.selectedRank,
            OrderBy: this.selectedOrder
        };
        this.service.post(api,model).subscribe(res => {
            if (res.result) {
                this.colorCodeRange = res.colorCode;
                this.tabTableConfig.table = this.mapTableConfig(res.data);
                this.tabTableConfig.columns = this.mapColumnConfig(res.fields);
                this.tabTableConfig.rows = res.data;
                this.totalRecords = res.data.length;
                this.commentList = res.commentsList ? res.commentsList : [];
                if(this.commentList && this.commentList.length > 0){
                    this.comment1List = this.commentList[0]['comments'].split(',');
                    this.comment2List = this.commentList[1]['comments'].split(',');
                }
            }
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log(error);
        });
    }

    onFilter():void{
        let error: number = 0;
        if(error == 0){
            this.getData();
        }
    }

    mapTableConfig(rows: any[]): any{
        let tabConfig: any = {
            "paginator": rows.length > 10 ? true : false,
            "rows": 10,
            "rowsPerPageOptions": [5,10,20],
            "reorderableColumns": true,
            "responsive": false,
            "globalsearch": this.isUser ? false : true,
            "resizableColumns": false,
            "scrollable": true,
            "scrollHeight": "600px",
            "first":0,
            "selectionMode":"",
            "globalFilterFields":["empName"]
        };
        return tabConfig;
    }

    mapColumnConfig(columns: any[]): any{
        let hideColumns: any[] = ["empID"]; 
        let columnsConfig: any[] = [];
        if(columns){
            for(let item of columns){
                let column: any = {
                    "field": item.name,
                    "header": item.displayName,
                    "sortable": false,
                    "filter": false,
                    "filterMatchMode": "contains",
                    "styleClass": (item.name == 'empName') ? 'width110': 'width80',
                    "hidden": hideColumns.indexOf(item.name) > -1 ? true : false,
                    "type": (item.name == 'empName') ? "text" : "score",
                    "valueField": "",
                    "routerLink": ""
                };
                columnsConfig.push(column);
            }
        }
        return columnsConfig;
    }

    onAction(event: any){
    }

    getCycleOption(): void{
        this.service.get(ApiConfig.ddlCycleApi).subscribe(res=>{
            if(res){
                let response: any[] = res;
                this.cycleOption = [];
                response.forEach(x=>{
                    let row: any = { "value": x.cycleID, "label": x.displayName + ' (' + x.periods + ')' };
                    this.cycleOption.push(row);
                });
                this.selectedCycle = this.cycleOption.length > 0 ? this.cycleOption[0].value : '';
            }
        },error=>{
            console.log(error);
        });
    }

    getRankOption(): void {
        this.service.get(ApiConfig.ddlCompetenciesApi).subscribe(res=>{
            if(res){
                let response: any[] = res;
                this.rankOption = [];
                response.forEach(x=>{
                    let row: any = { "value": x.shortName, "label": x.displayName };
                    this.rankOption.push(row);
                });
                this.selectedRank = this.rankOption.length > 0 ? this.rankOption[0].value : '';
            }
        },error=>{
            console.log(error);
        });
    }

    getOrderOption(): void{
        this.orderOption = [
            {
                "label": "Low to High",
                "value": "Asc"
            },
            {
                "label": "High to Low",
                "value": "Desc"
            }
        ];
        this.selectedOrder = this.orderOption[0].value;
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
        $('#sandbox-container input').datepicker({
            format: "dd/mm/yyyy"
        });

        $('#floating-container').on("click", function () {
            $(window).scrollTop(0);
        });
    }

}
