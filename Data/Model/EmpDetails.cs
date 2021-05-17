using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
    public class EmpDetails
    {
        public int EmpID { get; set; }

        public string EmpName { get; set; }

        public string EmpEMail { get; set; }

        public string EmpCode { get; set; }

        public int LoBID { get; set; }

        public string LoBName { get; set; }

        public int SubLobID { get; set; }

        public string SubLobName { get; set; }

        public int RMID { get; set; }

        public string RMName { get; set; }

        public string EmpDesignation { get; set; }

        public string EmpDesignationLevel { get; set; }

        public List<EmpRoles> Roles { get; set; }

    }

    public class EmpRoles
    {
        public int RoleID { get; set; }

        public string RoleName { get; set; }

        public string RoleShortName { get; set; }
    }

    public class EmpResponse
    {
        public bool Result { get; set; }

        public EmpDetails Data { get; set; }
        public string Message { get; set; }
    }
}
