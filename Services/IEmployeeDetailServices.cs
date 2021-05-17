using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Data.Model;

namespace Services
{
  public  interface IEmployeeDetailServices
    {
        EmpDetails GetEmpByEmail(string email);
    }
}
