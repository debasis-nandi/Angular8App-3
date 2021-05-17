using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using Repo;
using Data;
using Data.Model;

namespace MEI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        IEmployeeDetailServices _employeeDetailServices;
        public EmployeeController(IEmployeeDetailServices employeeDetailServices)
        {
            this._employeeDetailServices = employeeDetailServices;
        }

        [HttpGet("GetEmpByEmail/{email?}")]
        public EmpResponse GetEmpByEmail(string email)
        {
            EmpResponse response = new EmpResponse();
            try
            {
                EmpDetails empDetails = this._employeeDetailServices.GetEmpByEmail(email);
                if(empDetails != null)
                {
                    response.Result = true;
                    response.Data = empDetails;
                }
                else
                {
                    response.Result = false;
                }
                
            }
            catch (Exception)
            {
                throw;
            }

            return response;
        }

    }
}