using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text;


namespace Data
{
    
    public class Dashboard2Modal
    {
        public int EmpID { get; set; }
        public string EmpName { get; set; }       
           
        public string cycle1 { get; set; }
        public string cycle2 { get; set; }
        public string cycle3 { get; set; }
        public string cycle4 { get; set; }
        public string cycle5 { get; set; }
        public string cycle6 { get; set; }
        public string cycle7 { get; set; }
        public string cycle8 { get; set; }       
        public string cycle9 { get; set; }      
        public string cycle10 { get; set; }

    }

    

    public class Dashboard2Response
    {
        public  List<Dashboard2Modal> data { get; set; }
        public bool Result { get; set; }
        public List<Fields> Fields { get; set; }
        public string Message { get; set; }
    }

    public class SurveyScore
    {
       public int EMPID { get; set; }
       public string Role { get; set; }
        public int CompetencyID { get; set; }
        public string OrderBy { get; set; }
    }

    }
