using Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface IFAQsService
    {
        List<FAQsSection> GetFAQs();
    }
}
