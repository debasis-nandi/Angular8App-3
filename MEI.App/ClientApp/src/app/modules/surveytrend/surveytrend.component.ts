import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UIChart } from 'primeng/chart';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst, TableName, Role } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';
import { ITableConfig } from '../../widgets/datatable/datatable.model';
import { ICompetencyScore } from './surveytrend.model';

declare var $: any;

@Component({
    selector: 'app-surveytrend',
    templateUrl: './surveytrend.component.html',
    styleUrls: ['surveytrend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SurveyTrendComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild("chart", {static: false}) chart: UIChart;

    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;

    tabTableConfig:ITableConfig = { table: null, columns: [], rows: [] };
    tabTableName: string = TableName.surveytrend;
    totalRecords: any;

    empDetails: any;
    selectedRole: any;

    rankOption: any[] = [];
    orderOption: any[] = [];

    selectedRank: any;
    selectedOrder: any;

    isChart: boolean = false;
    isUser: boolean = false;
    
    lineChartData: any;
    lineChartOptions: any;
    competencyScore: ICompetencyScore;

    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        this.empDetails = AppSession.getSessionStorage('EmpDetails');
        this.selectedRole = AppSession.getSessionStorage('SelectedRole');
        let objRole: any = this.empDetails.roles.filter(x=>x.roleID == this.selectedRole)[0];
        this.isUser = objRole.roleShortName == Role.individual ? true : false;
        
        this.loadJsScript();
        this.setDefault();
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    setDefault(){
        this.loading = true;
        this.getRankOption();
        this.getOrderOption();

        setTimeout(() => {
            this.onSwitch('data');
        }, 1000);
    }

    onSwitch(type: string){
        this.isChart = (type == 'chart') ? true : false;
        if(type == 'data'){
            this.getData();
        }
        if(type == 'chart'){
            this.getChart();
        }
    }

    onApplyFilters() {
        if (this.isChart) {
            this.getChart();
        }
        else {
            this.getData();
        }
    }

    getData(): void {
        this.loading = true;
        this.tabTableConfig = { table: null, columns: [], rows: [] };
        //let api: any = environment.jsonFilePath + 'survey-trend.json';
        let api: any = ApiConfig.getDashboard2Api;
        let objRole: any = this.empDetails.roles.filter(x=>x.roleID == this.selectedRole)[0];
        let model: any = {
            EmpID: this.empDetails.empID,
            Role: objRole.roleShortName,
            CompetencyID: this.selectedRank,
            OrderBy: this.selectedOrder
        };
        this.service.post(api, model).subscribe(res => {
            if (res.result) {
                this.tabTableConfig.table = this.mapTableConfig(res.data);
                this.tabTableConfig.columns = this.mapColumnConfig(res.fields);
                this.tabTableConfig.rows = res.data;
                this.totalRecords = res.data.length;
            }
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log(error);
        });
    }

    getChart(): void{
        this.loading = true;
        let api: any = ApiConfig.getDashboard2ChartApi;
        let objRole: any = this.empDetails.roles.filter(x=>x.roleID == this.selectedRole)[0];
        let model: any = {
            EmpID: objRole.roleShortName == Role.management ? 0 : this.empDetails.empID,
            Role: objRole.roleShortName,
            CompetencyID: this.selectedRank,
            OrderBy: null
        };
        this.service.post(api, model).subscribe(res=>{
            if(res.result){
                this.setChart(res.data);
            }
            this.loading = false;
        },error=>{
            console.log(error);
            this.loading = false;
        });
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
                    "styleClass": (item.name == 'empName') ? 'width150': 'width80',
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

    setChart(dataSet:ICompetencyScore): void{
        
        /*let arrayLabel: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        let arrayData1: any[] = [65, 59, 80, 81, 56, 55, 40];
        let arrayData2: any[] = [28, 48, 40, 19, 86, 27, 90];*/

        let arrayLabel: any[] = [];
        let arrayData1: any[] = [];
        let arrayData2: any[] = [];

        let objDataSet: any[] = [];

        if (dataSet.globalScore && dataSet.globalScore.length > 0) {
            dataSet.globalScore.forEach(item => {
                arrayLabel.push(item.displayName);
                arrayData1.push(item.score);
            });
            let objdata: any = {
                label: 'Global',
                data: arrayData1,
                borderWidth: 1,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            };
            objDataSet.push(objdata);
        }

        if (dataSet.employeeScore && dataSet.employeeScore.length > 0) {
            dataSet.employeeScore.forEach(item => {
                arrayData2.push(item.score);
            });
            let objdata: any = {
                label: 'Individual',
                data: arrayData2,
                borderWidth: 1,
                backgroundColor: '#f7b9b7',
                borderColor: '#f7b9b7',
                fill: false
            };
            objDataSet.push(objdata);
        }

        this.lineChartData = {
            labels: arrayLabel,
            datasets: objDataSet
        };

        this.lineChartOptions = {
            title: {
                display: true,
                text: 'MEI Score',
                fontSize: 16,
                fontFamily: "'FSAlbert Bold'"
            },
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: '#495057',
                    fontFamily: "'FSAlbert Bold'",
                    fontSize: 14,
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057',
                        fontSize: 14,
                        fontFamily: "'FSAlbert Bold'"
                    },
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057',
                        fontSize: 14,
                        fontFamily: "'FSAlbert Bold'",
                        min: 0, 
                        max:100
                    },
                    gridLines: {
                        display:true
                    }
                }]
            }
        };

        /*setTimeout(() => {
            this.chart.refresh();
        }, 100);*/
    }

    getRankOption(): void {
        this.service.get(ApiConfig.ddlCompetenciesApi).subscribe(res=>{
            if(res){
                let response: any[] = res;
                this.rankOption = [];
                response.forEach(x=>{
                    let row: any = { "value": x.competencyID, "label": x.displayName };
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
                "value": "asc"
            },
            {
                "label": "High to Low",
                "value": "desc"
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

    loadJsScript(): void {
        $('#floating-container').on("click", function () {
            $(window).scrollTop(0);
        });
    }

}
