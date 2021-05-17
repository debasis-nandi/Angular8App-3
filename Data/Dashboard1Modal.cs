using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
    public class DashboardHeaderName
    {
        public string DisplayName { get; set; }
    }

    public class DashboardData
    {
        public string EmpName { get; set; }
        public string EmpID { get; set; }
        public int MEIScore { get; set; }

        private string[] DisplayName;
        public string this[int i]
        {
            get { return this.DisplayName[i]; }
            set { this.DisplayName[i] = value; }
        }
        
        public int competative1 { get; set; }
        public int competative2 { get; set; }
        public int competative3 { get; set; }
        public int competative4 { get; set; }
        public int competative5 { get; set; }
        public int competative6 { get; set; }
        public int competative7 { get; set; }
        public int competative8 { get; set; }
        public int competative9 { get; set; }
        public int competative10 { get; set; }      

    }
    public class Desboard1Response
    {
        public bool Result { get; set; }
        public List<DashboardData> Data { get; set; }
        public string Message { get; set; }
        public List<colorCode> colorCode { get; set; }
        public List<Fields> fields { get; set; }
        public List<commentsList> commentsList { get; set; }

    }

    public class Fields
    {
        public string Name {get; set;}
        public string DisplayName { get; set; }
    }

    public class colorCode
    {
      public string  Field {get; set;}
      public string Value { get; set; }

    }

    public class commentsList
    {
        public string QuestionText { get; set; }
        public string Comments { get; set; }

    }
    public class Meiscore
    {
        public int EMPID { get; set; }
        public int CycleID { get; set; }
        public string Role { get; set; }
        public string DisplayName { get; set; }
        public string OrderBy { get; set; }
    }
}
