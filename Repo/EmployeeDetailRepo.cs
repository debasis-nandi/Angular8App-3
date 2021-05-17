using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Data;
using Data.Model;
using System.Data;
using Dapper;
using System.Linq;

namespace Repo
{
  public  class EmployeeDetailRepo : IEmployeeDetailRepo
    {
        IConfiguration _configuration;

      public  EmployeeDetailRepo(IConfiguration configuration)
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


        public EmpDetails GetEmpByEmail(string email)
        {
            try
            {
                using (IDbConnection con = Connection)
                {
                    con.Open();
                    var param = new DynamicParameters();
                    param.Add("@EmpEMail", email);
                    //return con.Query<UserDetails>("dbo.usp_EmployeeDetails", param, null, true, 0, CommandType.StoredProcedure).FirstOrDefault();
                    EmpDetails empDetails = new EmpDetails();
                    using (var multi = con.QueryMultiple("dbo.usp_EmployeeDetails", param, commandType: CommandType.StoredProcedure))
                    {
                        //empDetails = multi.Read<EmpDetails>().First();
                        //empDetails.Roles = multi.Read<EmpRoles>().ToList();
                        empDetails = multi.Read<EmpDetails>().SingleOrDefault();
                        if (empDetails != null)
                        {
                            empDetails.Roles = multi.Read<EmpRoles>().ToList();
                        }
                    }

                    return empDetails;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
