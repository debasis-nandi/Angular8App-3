using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MEI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Dashboard1Controller : ControllerBase
    {
        private readonly IDashboard1Services _iDashboard1Services;

        public  Dashboard1Controller(IDashboard1Services iDashboard1Services)
        {
            this._iDashboard1Services = iDashboard1Services;
        }

        [HttpGet("GetDashboardHeaderName")]
        public List<DashboardHeaderName> GetDashboardHeaderName()
        {
            return this._iDashboard1Services.GetDashboardHeaderName();
        }

        [HttpPost("GetMEIScores")]
        public Desboard1Response GetMEIScores([FromBody]Meiscore meiscore)
        {
            Desboard1Response dashboardData = new Desboard1Response();
            try
            {                
                Desboard1Response desboard1 = this._iDashboard1Services.GetMEIScores(meiscore);

                if (desboard1 != null)
                {
                    dashboardData.Result = true;
                    dashboardData.Data = desboard1.Data;
                    dashboardData.fields = desboard1.fields;
                    dashboardData.colorCode = desboard1.colorCode;
                    dashboardData.commentsList = desboard1.commentsList;
                    dashboardData.Message = "Success";
                }
                else {
                    dashboardData.Result = false;
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            return dashboardData;
        }

        [HttpGet("GetCycles")]
        public List<GetCycles> GetShowCycles()
        {
            List<GetCycles> CycleList = new List<GetCycles>();
            try
            {
                 CycleList = this._iDashboard1Services.GetShowCycles();
                
            }
            catch(Exception ex)
            {
                throw;
            }
            return CycleList;
        }

        [HttpGet("GetCompetencies")]
        public List<GetCompetency> GetCompetenciesList()
        {
            List<GetCompetency> GetCompetencyList = new List<GetCompetency>();
            try
            {
                GetCompetencyList = this._iDashboard1Services.GetCompetenciesList();

            }
            catch (Exception ex)
            {
                throw;
            }
            return GetCompetencyList;
        }
    }
}