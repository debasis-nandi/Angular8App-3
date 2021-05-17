
export enum GlobalConst {
    growlLife = 3000,
    maxTextAreaLength = 1000,
    maxUploadedFileSize = 10485760
}

export enum Action {
    delete = "Delete",
    download = "Download",
    share = "Share",
    copy = "Copy",
    edit = "Edit",
    search = "Search",
    downloadTemplate = "DownloadTemplate",
    add = "Add",
    view = "View",
    disable = "Disable",
    enable = "Enable",
    preview = "Preview"
}

export enum DocType{
    doc = "doc",
    docx = "docx",
    pdf = "pdf",
    csv = "csv",
    xls = "xls",
    xlsx = "xlsx",
    ppt = "ppt",
    pptx = "pptx",
    png = "png",
    jpg = "jpg",
    jpeg = "jpeg",
    gif = "gif",
    txt = "txt"
}

export enum TableName {
    heatmap = 'HeatMap',
    surveytrend = 'surveytrend'
}

export enum validatorPattern{
    pattern1 = "^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$", // Allow letters and numbers only
    pattern2 = "^[0-9]*$", // Allow numbers only
    pattern3 = "^(?=.*[a-zA-Z])[A-Za-z0-9 !@#$%&*,._();-]+$", 
    pattern4 = "/[^<>]+/g", //match everything but '<' and '>'
    pattern5 = "/[^<>,\s]+/g", //match anything but '<', '>', ',' and '\s' (\s=any whitespace)
    pattern6 = "^[A-Za-z_-][A-Za-z0-9_-]*$"
}

export enum Role{
    management = "Management",
    rm = "RM",
    individual = "Individual"
}

export enum Environment {
    Prod = 'prod',
    Stage = 'stage',
    Uat = 'uat',
    Dev = 'dev'
}

export enum QuestionType{
    rating = 'Rating',
    comment = 'Comment'
}

export enum SurveyStatus{
    open = 'open',
    close = 'close',
    complete = 'complete'
}

export enum Range {
    range1 = 'Range1',
    range2 = 'Range2',
    range3 = 'Range3',
    range4 = 'Range4',
    range5 = 'Range5'
}