export interface Question {
    questionID?: number;
    questionText?: string;
    questionType?: string;
    competencyID?: number;
    cycleID?: number;
    isActive?: number;
    createdOn?: any;
    orderID?: number;
    answer?: any;
    isValid?: boolean;
}

export interface Competency {
    competencyID?: number;
    orderID?: number;
    competencyName?: string;
    isActive?: number;
    createdOn?: any;
    questionID?: number;
    questionMaster?: Question[];
    completionPercent?: any;
}

export interface SurveyQuestion{
    ratingQuestions?: Competency[];
    commentQuestions?: Question[];
}

export interface SaveSurvey{
    CycleID?: number;
    EmpID?: number;
    CompetencyID?: number;
    QuestionID?: number;
    QuestionType?: string;
    Rating?:number;
    Comment?: string;
    RMID?: number;
}

export interface ISurveyStatus{
    cycleID?: number;
    statusCode?: string;
    statusMessage?: string;
}
