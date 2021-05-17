
export class ApiConfig{

    //authentication api
    public static empDetailsApi: string = 'api/Employee/GetEmpByEmail/{email}';

    //survey api
    public static getSurveyStatusApi: string = 'api/Survey/GetSurveyStatus/{empId}';
    public static getSurveyQuestionApi: string = 'api/Survey/GetSurveyQList/{cycleId}';
    public static saveSurveyApi: string = 'api/Survey/SaveSurvey';

    //faq api
    public static faqApi: string = 'api/faq/GetFaqs';

    //dashboard-1 api
    public static getDashboard1Api: string = 'api/Dashboard1/GetMEIScores';
    public static ddlCycleApi: string = 'api/Dashboard1/GetCycles';
    public static ddlCompetenciesApi: string = 'api/Dashboard1/GetCompetencies';

    //dashboard-2 api
    public static getDashboard2Api: string = 'api/Dashboard_2/GetCyclewisepercentage';
    public static getDashboard2ChartApi: string = 'api/Dashboard_2/GetCompentencyScore';

    //Publish result
    public static publishResultApi: string = 'api/Survey/PublishResult/{cycleId}';

}