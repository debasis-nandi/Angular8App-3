using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace MEI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FAQController : ControllerBase
    {
        public IFAQsService _faqService;
        public FAQController(IFAQsService faqService)
        {
            this._faqService = faqService;
        }

        [HttpGet("GetFaqs")]
        public FAQsResponse GetFAQs()
        {
            try
            {
                FAQsResponse response = new FAQsResponse();
                var faqList = this._faqService.GetFAQs();
                if (faqList != null)
                {
                    response.Result = true;
                    response.Data = faqList;
                }
                else
                {
                    response.Result = false;
                }

                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}