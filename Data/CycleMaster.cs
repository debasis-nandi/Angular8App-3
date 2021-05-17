using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class CycleMaster
    {
        public int CycleID { get; set; }
        public string CycleName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedOn { get; set; }

        public String Periods { get; set; }


    }

    public class GetCycles
    {
        public int CycleID { get; set; }
        public string CycleName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }     
        public String Periods { get; set; }
        public int IsActive { get; set; }
        public string DisplayName { get; set; }
    }
}
