using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
  public  class FAQs
    {
        public int FAQID { get; set; }

        public string FAQuestion { get; set; }
        public string FAQAnswer { get; set; }
        public int IsActive { get; set; }

        public DateTime CreatedOn { get; set; }

  
    }
}
