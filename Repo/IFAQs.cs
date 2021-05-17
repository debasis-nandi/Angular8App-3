using Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repo
{
    public interface IFAQs
    {
        List<FAQsSection> GetFAQs();
    }
}
