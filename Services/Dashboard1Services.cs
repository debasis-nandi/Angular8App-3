using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Repo;

namespace Services
{
    public class Dashboard1Services : IDashboard1Services
    {
       
        private readonly IDashboard1Repo _dashboard1Repo;
        public Dashboard1Services(IDashboard1Repo dashboard1Repo)
        {
            this._dashboard1Repo=dashboard1Repo;
        }
        public List<DashboardHeaderName> GetDashboardHeaderName()
        {
          return  this._dashboard1Repo.GetDashboardHeaderName();
        }

       public Desboard1Response GetMEIScores(Meiscore meiscore)
        {
            return this._dashboard1Repo.GetMEIScores(meiscore);
        }

        public List<GetCycles> GetShowCycles()
        {
            return this._dashboard1Repo.GetShowCycles();
        }

        public List<GetCompetency> GetCompetenciesList()
        {
            return this._dashboard1Repo.GetCompetenciesList();
        }
        }
}
