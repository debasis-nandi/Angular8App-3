export interface IScore{
    cycleID?: number;
    displayName?: string;
    score?: number;
}

export interface ICompetencyScore{
    globalScore?: IScore[];
    employeeScore?: IScore[];
}