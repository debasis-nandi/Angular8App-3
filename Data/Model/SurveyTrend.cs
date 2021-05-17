using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
    public class SurveyTrendResponse
    {
        public bool Result { get; set; }

        public SurveyTrend Data { get; set; }

        public string Message { get; set; }

    }

    public class SurveyTrend
    {
        public List<CompentencyScore> GlobalScore { get; set; }

        public List<CompentencyScore> EmployeeScore { get; set; }
    }

    public class CompentencyScore
    {
        public int CycleID { get; set; }

        public string DisplayName { get; set; }

        public int Score { get; set; }
    }


}
