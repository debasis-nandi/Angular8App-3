using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Data.Model;
using CustomExceptionLogger.Utilities;

namespace Repo
{
    public class SurveyRepo : ISurveyRepo
    {
        IConfiguration _configuration;

        public SurveyRepo(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_configuration.GetConnectionString("dbConn"));
            }
        }
        public SurveyQuestion GetSurveyQuestionList(int CycleID)
        {           
            using (IDbConnection con = Connection)
            {
                List<CompetencyMaster> tr = new List<CompetencyMaster>();
                List<CompetencyMaster1> tr1 = new List<CompetencyMaster1>();
                List<CompetencyMaster1> tr3 = new List<CompetencyMaster1>();
                List<QuestionMaster> tr2 = new List<QuestionMaster>();

                SurveyQuestion question = new SurveyQuestion();

                con.Open();
                
                var param = new DynamicParameters();
                param.Add("@CycleID", CycleID);
                CompetencyMaster1 cm = new CompetencyMaster1();
                using (var qList = con.QueryMultiple("dbo.SurveyQuestionList", param, commandType: CommandType.StoredProcedure))
                {
                  
                    tr1 = qList.Read<CompetencyMaster1>().AsList();
                    tr2 = qList.Read<QuestionMaster>().AsList();
                    question.CommentQuestions = qList.Read<QuestionMaster>().AsList();


                    foreach (var r in tr1)
                    {
                        List<QuestionMaster> tr4 = new List<QuestionMaster>();
                        cm = r;                        
                        foreach (var q in tr2)
                        {                            
                            if (r.CompetencyID == q.CompetencyID)
                            {
                              tr4.Add(q);                               
                            }                            
                        }
                        cm.QuestionMaster = tr4;
                        tr3.Add(cm);
                    }

                    question.RatingQuestions = tr3;
                }

                return question;     
            }            
        }

        public int saveSurveyresult(SaveResponse responseRating)
        {

            using (IDbConnection con = Connection)
            {
                con.Open();
                using (IDbTransaction tran = con.BeginTransaction())
                {
                    var param = new DynamicParameters();
                    param.Add("@Comment", responseRating.Comment);
                    param.Add("@Response", responseRating.Response);
                    param.Add("@QuestionID", responseRating.QuestionID);
                    param.Add("@CompetencyID", responseRating.CompetencyID);
                    param.Add("@CycleID", responseRating.CycleID);
                    param.Add("@EmpID", responseRating.EmpID);
                    int temp = con.Execute("usp_SaveCompetencySurvey", param, tran, null, CommandType.StoredProcedure);
                    if (temp > 0)
                    {
                        tran.Commit();
                    }
                    else
                    {
                        tran.Rollback();
                    }

                    return temp;
                }
            }
        }

        public int SaveSurvey(List<SaveSurvey> surveyList)
        {
            try
            {
                var dt = Helper.ConvertToDataTable(surveyList);
                using (IDbConnection con = Connection)
                {
                    con.Open();
                    var para = new { SurveyQuestion = dt.AsTableValuedParameter("SurveyQuestions") };
                    var result = con.Execute("dbo.SaveSurvey", para, commandType: CommandType.StoredProcedure);
                    return result;
                }
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
                using (IDbConnection con = Connection)
                {
                    con.Open();
                    var param = new DynamicParameters();
                    param.Add("@EmpID", EmpID);
                    SurveyStatus surveyStatus = new SurveyStatus();
                    using (var qList = con.QueryMultiple("dbo.usp_CheckSurveyStatus", param, commandType: CommandType.StoredProcedure))
                    {
                        surveyStatus = qList.Read<SurveyStatus>().SingleOrDefault();
                    }

                    return surveyStatus;
                }
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
                using (IDbConnection con = Connection)
                {
                    con.Open();
                    var param = new DynamicParameters();
                    param.Add("@CycleID", CycleID);

                    int temp = con.Execute("usp_Update_Tables_For_Dashboard_Heatmap", param, commandType: CommandType.StoredProcedure);
                    return temp;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
