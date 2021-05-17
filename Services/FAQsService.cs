using Data.Model;
using Repo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class FAQsService : IFAQsService
    {
        public readonly IFAQs _faqRepo;
        public FAQsService(IFAQs faqRepo)
        {
            this._faqRepo = faqRepo;
        }

        public List<FAQsSection> GetFAQs()
        {
            try
            {
                return this._faqRepo.GetFAQs();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
