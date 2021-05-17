using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Data.Model;

namespace Repo
{
   public interface ISurveyRepo
    {
        SurveyQuestion GetSurveyQuestionList(int CycleID);

        int saveSurveyresult(SaveResponse responseRating);

        int SaveSurvey(List<SaveSurvey> surveyList);

        SurveyStatus GetSurveyStatus(int EmpID);

        int PublishResult(int CycleID);
    }
}
