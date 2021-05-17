using Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface IDashboard1Services
    {
         List<DashboardHeaderName> GetDashboardHeaderName();
        Desboard1Response GetMEIScores(Meiscore meiscore);

         List<GetCycles> GetShowCycles();
         List<GetCompetency> GetCompetenciesList();
        
        }
}
