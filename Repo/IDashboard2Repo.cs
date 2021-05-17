using Data;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repo
{
  public  interface IDashboard2Repo
    {
        Dashboard2Response GetCyclewisepercentage(SurveyScore surveyScore);

        SurveyTrend GetCompentencyScore(int CompetencyID, int EMPID, string EmpRole);
    }
}
