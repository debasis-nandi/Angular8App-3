using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class RoleMaster
    {
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public string FAQAnswer { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedOn { get; set; }


       
    }
}
