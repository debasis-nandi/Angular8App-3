using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
   public class ManagementUsers
    {
        public int ID { get; set; }
        public int EmpID { get; set; }
        public int IsActive { get; set; }
        public int UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

    }
}
