using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
    public class SurveyResponse
    {
        public bool Result { get; set; }

        public SurveyQuestion Data { get; set; }

        public string Message { get; set; }
    }

    public class SurveyQuestion
    {
        public List<CompetencyMaster1> RatingQuestions { get; set; }

        public List<QuestionMaster> CommentQuestions { get; set; }
    }

    public class SaveSurvey
    {
        public int CycleID { get; set; }

        public int EmpID { get; set; }

        public int CompetencyID { get; set; }

        public int QuestionID { get; set; }

        public string QuestionType { get; set; }

        public Nullable<int> Rating { get; set; }

        public string Comment { get; set; }

        public Nullable<int> RMID { get; set; }
    }

    public class SurveyStatus
    {
        public int CycleID { get; set; }

        public string StatusCode { get; set; }

        public string StatusMessage { get; set; }
    }
}
