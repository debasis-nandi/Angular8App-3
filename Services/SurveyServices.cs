using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Data.Model;
using Repo;

namespace Services
{
    public class SurveyServices : ISurveyServices
    {
        public readonly ISurveyRepo _surveyRepo;
        public SurveyServices(ISurveyRepo surveyRepo)
        {
            this._surveyRepo = surveyRepo;
        }
        public SurveyQuestion GetSurveyQuestionList(int CycleID)
        {
           return this._surveyRepo.GetSurveyQuestionList(CycleID);
        }

        public int saveSurveyresult(SaveResponse responseRating)
        {
           return this._surveyRepo.saveSurveyresult(responseRating);
        }

        public int SaveSurvey(List<SaveSurvey> surveyList)
        {
            try
            {
                return this._surveyRepo.SaveSurvey(surveyList);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public SurveyStatus GetSurveyStatus(int EmpID)
        {
            try
            {
                return this._surveyRepo.GetSurveyStatus(EmpID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int PublishResult(int CycleID)
        {
            try
            {
                return this._surveyRepo.PublishResult(CycleID);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
