import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppSession } from '../../core/config/app-session';
import { GlobalConst, QuestionType, SurveyStatus } from '../../core/config/app-enum';
import { environment } from '../../../environments/environment';
import { EmpDetails } from '../../modules/authentication/authentication.model';
import { Competency, Question, SurveyQuestion, SaveSurvey, ISurveyStatus } from './survey.model';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['survey.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SurveyComponent implements OnInit, AfterViewInit, OnDestroy {
    
    imgPath: any = environment.imaPath;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    empDetails: EmpDetails = {};
    competencyList:Competency[] = [];
    commentQuestionList:Question[] = [];
    competencyIndex: number = 0;
    progressbarCss: any = {};
    surveyStatus: ISurveyStatus = {};

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: HttpService) {
    }

    ngOnInit() {
        this.empDetails = AppSession.getSessionStorage("EmpDetails") ? AppSession.getSessionStorage("EmpDetails") : null;
        this.getSurveyStatus(this.empDetails.empID);
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    getSurveyStatus(empID: any) {
        this.loading = true;
        let api: any = ApiConfig.getSurveyStatusApi.replace("{empId}", empID);
        this.service.get(api).subscribe(res => {
            if (res) {
                this.surveyStatus = res;
                if (this.surveyStatus.statusCode == SurveyStatus.open) {
                    this.getQuestionList(this.surveyStatus.cycleID);
                }
                else {
                    this.loading = false;
                    this.router.navigate(['survey/status', this.surveyStatus.statusCode]);
                }
            }
        }, error => {
            this.loading = false;
            console.log(error);
        });
    }

    getQuestionList(cycleId: number) {
        this.loading = true;
        let api: any = ApiConfig.getSurveyQuestionApi.replace('{cycleId}', cycleId.toString());
        this.service.get(api).subscribe(res => {
            if (res.result) {
                let surveyQuestion: SurveyQuestion = res.data;
                this.commentQuestionList = this.mapCommentQuestionList(surveyQuestion.commentQuestions);
                this.competencyList = this.mapCompetencyList(surveyQuestion.ratingQuestions);
                this.progressbarCss = { 'width': this.competencyList[this.competencyIndex].completionPercent + '%' };
            }
            this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    mapCommentQuestionList(itemList: Question[]): any {
        let objCommentQuestionList: Question[] = [];
        itemList.forEach(item => {
            let objQuestion: Question = {
                questionID: item.questionID,
                questionText: item.questionText ? item.questionText : '',
                questionType: item.questionType,
                competencyID: item.competencyID,
                cycleID: item.cycleID,
                isActive: item.isActive,
                createdOn: item.createdOn,
                orderID: item.orderID,
                answer: null,
                isValid: true
            };
            objCommentQuestionList.push(objQuestion);
        });
        return objCommentQuestionList;
    }

    mapCompetencyList(itemList: Competency[]): any{
        let competencyCount: number = (itemList.length);
        let objCompetencyList:Competency[] = [];
        itemList.forEach((item, index)=>{
            let objCompetency:Competency = {
                competencyID: item.competencyID,
                orderID:item.orderID,
                competencyName:item.competencyName ? item.competencyName : '',
                isActive:item.isActive,
                createdOn:item.createdOn,
                questionID:item.questionID,
                completionPercent: (index/competencyCount*100).toFixed()
            };
            let objQuestionList: Question[] = [];
            item.questionMaster.forEach(item=>{
                let objQuestion: Question = {
                    questionID:item.questionID,
                    questionText:item.questionText ? item.questionText : '',
                    questionType:item.questionType,
                    competencyID:item.competencyID,
                    cycleID:item.cycleID,
                    isActive:item.isActive,
                    createdOn:item.createdOn,
                    orderID:item.orderID,
                    answer:null,
                    isValid: true
                };
                objQuestionList.push(objQuestion);
            });
            objCompetency.questionMaster = objQuestionList;
            objCompetencyList.push(objCompetency);
        });

        return objCompetencyList;
    }

    saveSurveyReport(data: any) {
        this.service.post('api/Survey/SaveCompetencySurveyResult', data).subscribe(d => { }, error => { }, () => { console.log('complete') })
    }

    onChangeRating(event: any, index: any){
        this.competencyList[this.competencyIndex].questionMaster[index].isValid = true;
    }

    onCommentChange(value: any, index: any){
        this.commentQuestionList[index].isValid = value ? true : false;
    }

    onSurveySubmit(): void{
        let qList: Question[] = this.competencyList[this.competencyIndex].questionMaster;
        qList.forEach(x=>{ x.isValid = x.answer ? true: false; });
        this.commentQuestionList.forEach(x=>{x.isValid = x.answer ? true : false});
        
        let isValidPage: boolean = false;
        let isValidRating: boolean = qList.filter(x=>x.isValid == false).length > 0 ? false : true;
        let isValidComment: boolean = this.commentQuestionList.filter(x=>x.isValid == false).length > 0 ? false : true;
        isValidPage = (isValidRating && isValidComment) ? true : false;

        if(isValidPage){
            this.competencyList[this.competencyIndex].completionPercent = 100;
            this.progressbarCss = { 'width': this.competencyList[this.competencyIndex].completionPercent + '%' };

            let postModel: SaveSurvey[] = this.mapSaveSurvey(this.competencyList,this.commentQuestionList);
            //console.log(postModel);
            if (postModel) {
                this.loading = true;
                this.service.post(ApiConfig.saveSurveyApi, postModel).subscribe(res => {
                    if (res.result) {
                        this.router.navigate(['survey/status', SurveyStatus.complete]);
                    }
                    this.loading = false;
                }, error => {
                    console.log(error);
                    this.loading = false;
                    this.showError('Internal Server Error!');
                });
            }
        }
    }

    mapSaveSurvey(ratingList: Competency[], commentList:Question[]): any{
        let saveSurveyList: SaveSurvey[] = [];

        //set for rating
        if(ratingList && ratingList.length > 0){
            for(let item of ratingList){
                item.questionMaster.forEach(res=>{
                    let objRating: SaveSurvey = {
                        CycleID: this.surveyStatus.cycleID,
                        EmpID: this.empDetails.empID,
                        CompetencyID: res.competencyID,
                        QuestionID: res.questionID,
                        QuestionType: QuestionType.rating,
                        Rating: res.answer,
                        Comment: null,
                        RMID: this.empDetails.rmid
                    }
                    saveSurveyList.push(objRating);
                });
            }
        }

        //set for comment
        if(commentList && commentList.length > 0){
            commentList.forEach(res=>{
                let objRating: SaveSurvey = {
                    CycleID: this.surveyStatus.cycleID,
                    EmpID: this.empDetails.empID,
                    CompetencyID: res.competencyID,
                    QuestionID: res.questionID,
                    QuestionType: QuestionType.comment,
                    Rating: null,
                    Comment: res.answer,
                    RMID: this.empDetails.rmid
                };
                saveSurveyList.push(objRating);
            });
        }

        return saveSurveyList;
    }

    onPrev(): void{
        this.competencyIndex = (this.competencyIndex > 0) ? (this.competencyIndex - 1) : this.competencyIndex;
        this.progressbarCss = { 'width': this.competencyList[this.competencyIndex].completionPercent + '%' };
    }

    onNext(): void{
        let qList: Question[] = this.competencyList[this.competencyIndex].questionMaster;
        qList.forEach(x=>{ x.isValid = x.answer ? true: false; });
        let isValidPage: boolean = qList.filter(x=>x.isValid == false).length > 0 ? false : true;
        if(isValidPage){
            this.competencyIndex = (this.competencyIndex < this.competencyList.length) ? (this.competencyIndex + 1) : this.competencyIndex;
            this.progressbarCss = { 'width': this.competencyList[this.competencyIndex].completionPercent + '%' };
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
