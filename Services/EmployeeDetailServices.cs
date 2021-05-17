using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Data.Model;
using Repo;

namespace Services
{
    public class EmployeeDetailServices : IEmployeeDetailServices
    {
        public IEmployeeDetailRepo _IEmployeeDetailRepo;
        public EmployeeDetailServices(IEmployeeDetailRepo iEmployeeDetailRepo)
        {
            this._IEmployeeDetailRepo = iEmployeeDetailRepo;
        }

        public EmpDetails GetEmpByEmail(string email)
        {
            try
            {
                return this._IEmployeeDetailRepo.GetEmpByEmail(email);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
