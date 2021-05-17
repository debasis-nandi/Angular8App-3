using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Data;
using Services;
using Data.Model;

namespace MEI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        public ISurveyServices _surveyser;
        public SurveyController(ISurveyServices surveyser)
        {
            this._surveyser = surveyser;
        }
       
        [HttpGet("GetSurveyQList/{CycleID?}")]
        public SurveyResponse GetSurveyQList(int CycleID)
        {
            SurveyResponse response = new SurveyResponse();
            var questionList = this._surveyser.GetSurveyQuestionList(CycleID);
            if(questionList != null)
            {
                response.Result = true;
                response.Data = questionList;
            }
            else
            {
                response.Result = false;
            }

            return response;
        }

        [HttpPost("SaveCompetencySurveyResult")]
        public int SaveCompetencySurveyResult([FromBody]SaveResponse responseRating)
        {
            return this._surveyser.saveSurveyresult(responseRating);
        }

        [HttpPost("SaveSurvey")]
        public SurveyResponse SaveSurvey([FromBody]List<SaveSurvey> surveyList)
        {
            try
            {
                SurveyResponse response = new SurveyResponse();
                if (surveyList != null && surveyList.Count > 0)
                {   
                    var result = this._surveyser.SaveSurvey(surveyList);
                    if (result == -1)
                    {
                        response.Result = true;
                    }
                    else
                    {
                        response.Result = false;
                    }
                }
                else
                {
                    response.Result = false;
                }
                
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetSurveyStatus/{EmpID?}")]
        public SurveyStatus GetSurveyStatus(int EmpID)
        {
            try
            {
                SurveyStatus response = new SurveyStatus();
                response = this._surveyser.GetSurveyStatus(EmpID);
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("PublishResult/{CycleID?}")]
        public SurveyResponse PublishResult(int CycleID)
        {
            try
            {
                SurveyResponse response = new SurveyResponse();
                var result = this._surveyser.PublishResult(CycleID);
                if (result > 0)
                {
                    response.Result = true;
                }
                else
                {
                    response.Result = false;
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}