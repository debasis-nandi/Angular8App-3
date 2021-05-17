using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace MEI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Dashboard_2Controller : ControllerBase
    {
        private readonly IDashboard2Services _dashboard2Services;
        public Dashboard_2Controller(IDashboard2Services dashboard2Services)
        {
            this._dashboard2Services = dashboard2Services;
        }

        [HttpPost("GetCyclewisepercentage")]
        public Dashboard2Response GetCyclewisepercentage([FromBody]SurveyScore surveyScore)
        {           
            Dashboard2Response dashboardData = new Dashboard2Response();
            try
            {
                Dashboard2Response desboard2 = this._dashboard2Services.GetCyclewisepercentage(surveyScore);

                if (desboard2 != null)
                {
                    dashboardData.Result = true;
                    dashboardData.data = desboard2.data;
                    dashboardData.Fields = desboard2.Fields;                   
                    dashboardData.Message = "Success";
                }
                else
                {
                    dashboardData.Result = false;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return dashboardData;
        }

        [HttpPost("GetCompentencyScore")]
        public SurveyTrendResponse GetCompentencyScore([FromBody]SurveyScore surveyScore)
        {
            try
            {
                SurveyTrendResponse response = new SurveyTrendResponse();
                response.Data = this._dashboard2Services.GetCompentencyScore(surveyScore.CompetencyID, surveyScore.EMPID, surveyScore.Role);
                response.Result = true;
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}