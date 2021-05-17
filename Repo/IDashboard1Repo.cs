using Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repo
{
   public interface IDashboard1Repo
    {
        List<DashboardHeaderName> GetDashboardHeaderName();

        Desboard1Response GetMEIScores(Meiscore meiscore);

         List<GetCycles> GetShowCycles();

        List<GetCompetency> GetCompetenciesList();
        
        }
}
