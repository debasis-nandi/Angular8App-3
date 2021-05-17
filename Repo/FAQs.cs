using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Data.Model;

namespace Repo
{
    public class FAQs: IFAQs
    {
        IConfiguration _configuration;

        public FAQs(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_configuration.GetConnectionString("dbConn"));
            }
        }

        public List<FAQsSection> GetFAQs()
        {
            try
            {
                using (IDbConnection con = Connection)
                {
                    var faqSectionList = new List<FAQsSection>();
                    var faqList = new List<FAQsModel>();
                    con.Open();
                    using (var qList = con.QueryMultiple("dbo.usp_getFAQs", null, commandType: CommandType.StoredProcedure))
                    {
                        faqSectionList = qList.Read<FAQsSection>().AsList();
                        faqList = qList.Read<FAQsModel>().AsList();

                        if(faqSectionList != null)
                        {
                            foreach(var item in faqSectionList)
                            {
                                item.FAQs = faqList.Where(x => x.FAQSectionID == item.ID).ToList();
                            }
                        }
                    }
                    return faqSectionList;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
