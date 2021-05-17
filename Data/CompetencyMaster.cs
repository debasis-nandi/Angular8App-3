using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class CompetencyMaster
    {
      public  int CompetencyID { get; set; }
        public string CompetencyName { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public string DisplayName { get; set; }

    }

    public class GetCompetency
    {
        public int CompetencyID { get; set; }
        public string DisplayName { get; set; }
        public string ShortName { get; set; }
        

    }

    public class CompetencyMaster1
    {
        public int CompetencyID { get; set; }
        public int OrderID { get; set; }
        public string CompetencyName { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int QuestionID { get; set; }
        
        public List<QuestionMaster> QuestionMaster { get; set; }

    }
}
