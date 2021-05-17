using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Data.Model;
using Repo;

namespace Services
{
    public class Dashboard2Services : IDashboard2Services
    {
        public readonly IDashboard2Repo _dashboard2Repo;

        public Dashboard2Services(IDashboard2Repo dashboard2Repo)
        {
            this._dashboard2Repo = dashboard2Repo;
        }
        public Dashboard2Response GetCyclewisepercentage(SurveyScore surveyScore)
        {
           return this._dashboard2Repo.GetCyclewisepercentage(surveyScore);
        }

        public SurveyTrend GetCompentencyScore(int CompetencyID, int EMPID, string EmpRole)
        {
            try
            {
                return this._dashboard2Repo.GetCompentencyScore(CompetencyID, EMPID, EmpRole);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
