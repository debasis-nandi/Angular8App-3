export interface Role {
    roleID?: number;
    roleName?: string;
    roleShortName?: string;
}

export interface EmpDetails {
    empID?: number;
    empName?: string;
    empEMail?: string;
    empCode?: string;
    loBID?: number;
    loBName?: string;
    subLobID?: number;
    subLobName?: string;
    rmid?: number;
    rmName?: string;
    empDesignation?: string;
    empDesignationLevel?: string;
    roles?: Role[];
}