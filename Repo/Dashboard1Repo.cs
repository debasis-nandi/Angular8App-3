using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Dapper;
using Data;
using Microsoft.Extensions.Configuration;

namespace Repo
{    
    public class Dashboard1Repo : IDashboard1Repo
    {
        IConfiguration _configuration;

        public Dashboard1Repo(IConfiguration configuration)
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
        public List<DashboardHeaderName> GetDashboardHeaderName()
        {
            DbConnection c = new DbConnection(_configuration);
            using (IDbConnection con = c.Connection)
            {
                con.Open();               
                List<DashboardHeaderName> castResults;
                castResults = con.Query<DashboardHeaderName>("usp_GetDashboard1HeaderName", commandType: CommandType.StoredProcedure).ToList();
                return castResults;
            }           
        }



      public Desboard1Response GetMEIScores(Meiscore meiscore)
        {
            DbConnection c = new DbConnection(_configuration);
            using (IDbConnection con = c.Connection)
            {
                con.Open();
                var param = new DynamicParameters();
                param.Add("@EMPID", meiscore.EMPID);
                param.Add("@CycleID", meiscore.CycleID);
                param.Add("@Role", meiscore.Role);
                param.Add("@DisplayName", meiscore.DisplayName);
                param.Add("@OrderBy", meiscore.OrderBy);
                Desboard1Response desboard1Response = new Desboard1Response();
                List<DashboardData> castDeshboardData;
                List<colorCode> colorCode = new List<colorCode>();
                List<Fields> fields = new List<Fields>();
                List<commentsList> commentsLists = new List<commentsList>();

                using (var qList = con.QueryMultiple("dbo.usp_Dashboard1Data", param, commandType: CommandType.StoredProcedure))
                {
                    castDeshboardData = qList.Read<DashboardData>().AsList();
                    colorCode = qList.Read<colorCode>().AsList();
                    fields = qList.Read<Fields>().AsList();
                    commentsLists = qList.Read<commentsList>().AsList();
                    desboard1Response.Data = castDeshboardData;
                    desboard1Response.colorCode = colorCode;
                    desboard1Response.fields = fields;
                    desboard1Response.commentsList = commentsLists;
                    //for(int i=0;i<fields.Count;i++)
                    //{
                    //    DashboardData dashboardData = new DashboardData()
                    //    {
                    //        dashboardData.Competative1 = fields[i].DisplayName;
                    //};                        
                    //}
                }

                return desboard1Response;
            }
        }
        
        public List<GetCycles> GetShowCycles()
        {
            DbConnection c = new DbConnection(_configuration);
            using (IDbConnection con = c.Connection)
            {
                con.Open();
                List<GetCycles> cycles = new List<GetCycles>();
                using (var qList = con.QueryMultiple("dbo.usp_ShowCycles", null, commandType: CommandType.StoredProcedure))
                {
                    cycles = qList.Read<GetCycles>().AsList();
                }
                return cycles;
            }
        }

        public List<GetCompetency> GetCompetenciesList()
        {
            DbConnection c = new DbConnection(_configuration);
            using (IDbConnection con = c.Connection)
            {
                con.Open();

                List<GetCompetency> GetCompetency = new List<GetCompetency>();
                using (var qList = con.QueryMultiple("dbo.usp_ShowCompetencies", null, commandType: CommandType.StoredProcedure))
                {
                    GetCompetency = qList.Read<GetCompetency>().AsList();
                }
              return  GetCompetency;
            }

         }

        }

}
