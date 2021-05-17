using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class ResponseRating
    {
        public int ResponseID { get; set; }

        public int Response { get; set; }

        public int QuestionID { get; set; }

        public int CompetencyID { get; set; }

        public int CycleID { get; set; }

        public int EmpID { get; set; }

        public int IsActive { get; set; }

        public DateTime SubmitDateTime { get; set; }

    }


    public class SaveResponse
    {
        public string Comment { get; set; }
        public int ResponseID { get; set; }

        public int Response { get; set; }

        public int QuestionID { get; set; }

        public int CompetencyID { get; set; }

        public int CycleID { get; set; }

        public int EmpID { get; set; }

        public int IsActive { get; set; }

        public DateTime SubmitDateTime { get; set; }

    }
}
