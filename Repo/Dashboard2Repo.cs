using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Dapper;
using Data;
using Data.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.CSharp;
using CustomExceptionLogger.Utilities;

namespace Repo
{
    public class Dashboard2Repo : IDashboard2Repo
    {
      
           IConfiguration _configuration;

        public Dashboard2Repo(IConfiguration configuration)
        {
            this._configuration = configuration;
        }
      
        //public IDbConnection Connection
        //{
        //    get
        //    {
        //        return new SqlConnection(_configuration.GetConnectionString("dbConn"));
        //    }
        //}
      
        
        public Dashboard2Response GetCyclewisepercentage(SurveyScore surveyScore)
        {            
            DbConnection c = new DbConnection(_configuration);
            using (IDbConnection con = c.Connection)
            {
                con.Open();
                var param = new DynamicParameters();
                param.Add("@EMPID", surveyScore.EMPID);               
                param.Add("@Role", surveyScore.Role);
                param.Add("@CompetencyID", surveyScore.CompetencyID);
                param.Add("@OrderBy", surveyScore.OrderBy);
                Dashboard2Response desboard2Response = new Dashboard2Response();
                List<Dashboard2Modal> castDeshboardData;
                List<Fields> fields = new List<Fields>();
                

                using (var qList = con.QueryMultiple("dbo.usp_Dashboard2SurveyData", param, commandType: CommandType.StoredProcedure))
                {
                    castDeshboardData = qList.Read<Dashboard2Modal>().AsList();
                    fields = qList.Read<Fields>().AsList();

                    desboard2Response.data = castDeshboardData;

                    desboard2Response.Fields = fields;
                }


                return desboard2Response;
            }
        }

        public SurveyTrend GetCompentencyScore(int CompetencyID, int EMPID, string EmpRole)
        {
            try
            {
                DbConnection c = new DbConnection(_configuration);
                //var dataLst = new List<dynamic>();
                using (IDbConnection con = c.Connection)
                {
                    con.Open();
                    var param = new DynamicParameters();
                    param.Add("@CompetencyID", CompetencyID);
                    param.Add("@EMPID", EMPID);

                    SurveyTrend surveyTrend = new SurveyTrend();
                    using (var multi = con.QueryMultiple("dbo.usp_Get_Chart_Data", param, commandType: CommandType.StoredProcedure))
                    {
                        /*while (multi.IsConsumed == false)
                        {
                            dataLst.Add(multi.Read());
                        }*/

                        if (EmpRole == Role.Management.ToString())
                        {
                            surveyTrend.GlobalScore = multi.Read<CompentencyScore>().ToList();
                        }
                        else
                        {
                            surveyTrend.GlobalScore = multi.Read<CompentencyScore>().ToList();
                            surveyTrend.EmployeeScore = multi.Read<CompentencyScore>().ToList();
                        }
                    }

                    return surveyTrend;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

    }
}
