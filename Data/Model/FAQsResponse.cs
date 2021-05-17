using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
    public class FAQsResponse
    {
        public bool Result { get; set; }

        public List<FAQsSection> Data { get; set; }

        public string Message { get; set; }
    }

    public class FAQsModel
    {
        public int FAQID { get; set; }

        public int FAQSectionID { get; set; }

        public string FAQuestion { get; set; }

        public string FAQAnswer { get; set; }

    }

    public class FAQsSection
    {
        public int ID { get; set; }

        public string DisplayName { get; set; }

        public string DisplayHeader { get; set; }

        public List<FAQsModel> FAQs { get; set; }
    }
}
