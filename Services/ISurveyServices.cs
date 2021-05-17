using Data;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
  public  interface ISurveyServices
    {
        SurveyQuestion GetSurveyQuestionList(int CycleID);

        int saveSurveyresult(SaveResponse responseRating);

        int SaveSurvey(List<SaveSurvey> surveyList);

        SurveyStatus GetSurveyStatus(int EmpID);

        int PublishResult(int CycleID);
    }
}
