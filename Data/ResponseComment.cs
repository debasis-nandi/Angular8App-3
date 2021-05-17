using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class ResponseComment
    {

        public int CommentID { get; set; }

        public string Comment { get; set; }

        public int QuestionID { get; set; }

        public int CompetencyID { get; set; }

        public int CycleID { get; set; }

        public int EmpID { get; set; }

        public int IsActive { get; set; }

        public DateTime SubmitDateTime { get; set; }
 
    }
}
