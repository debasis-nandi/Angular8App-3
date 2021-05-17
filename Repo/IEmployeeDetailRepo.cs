using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Data.Model;

namespace Repo
{
  public  interface IEmployeeDetailRepo
    { 
      EmpDetails GetEmpByEmail(string email);
    }
}
