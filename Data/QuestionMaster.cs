using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class QuestionMaster
    {

        public int QuestionID { get; set; }

        public string QuestionText { get; set; }
        public string QuestionType { get; set; }

        public int CompetencyID { get; set; }

        public int CycleID { get; set; }       

        public int IsActive { get; set; }

        public DateTime CreatedOn { get; set; }

        public int OrderID { get; set; }
    }
}
