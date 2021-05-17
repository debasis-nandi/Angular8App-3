using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace CustomExceptionLogger.Utilities
{
  public  class CommonUtitlies
    {
        public static string CustomErrorMessage = "There was error processing your request. Please contact admin  ";
        public static HttpStatusCode GetErrorCode(Type exceptionType)
        {
            Exceptions tryParseResult;
            if (Enum.TryParse(exceptionType.Name, out tryParseResult))
            {
                switch (tryParseResult)
                {
                    case Exceptions.NullReferenceException:
                        return HttpStatusCode.LengthRequired;

                    case Exceptions.FileNotFoundException:
                        return HttpStatusCode.NotFound;

                    case Exceptions.OverflowException:
                        return HttpStatusCode.RequestedRangeNotSatisfiable;

                    case Exceptions.OutOfMemoryException:
                        return HttpStatusCode.ExpectationFailed;

                    case Exceptions.InvalidCastException:
                        return HttpStatusCode.PreconditionFailed;

                    case Exceptions.ObjectDisposedException:
                        return HttpStatusCode.Gone;

                    case Exceptions.UnauthorizedAccessException:
                        return HttpStatusCode.Unauthorized;

                    case Exceptions.NotImplementedException:
                        return HttpStatusCode.NotImplemented;

                    case Exceptions.NotSupportedException:
                        return HttpStatusCode.NotAcceptable;

                    case Exceptions.InvalidOperationException:
                        return HttpStatusCode.MethodNotAllowed;

                    case Exceptions.TimeoutException:
                        return HttpStatusCode.RequestTimeout;

                    case Exceptions.ArgumentException:
                        return HttpStatusCode.BadRequest;

                    case Exceptions.StackOverflowException:
                        return HttpStatusCode.RequestedRangeNotSatisfiable;

                    case Exceptions.FormatException:
                        return HttpStatusCode.UnsupportedMediaType;

                    case Exceptions.IOException:
                        return HttpStatusCode.NotFound;

                    case Exceptions.IndexOutOfRangeException:
                        return HttpStatusCode.ExpectationFailed;

                    default:
                        return HttpStatusCode.InternalServerError;
                }
            }
            else
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }

    public enum Exceptions
    {
        /// <summary>
        /// Defines the NullReferenceException
        /// </summary>
        NullReferenceException = 1,
        /// <summary>
        /// Defines the FileNotFoundException
        /// </summary>
        FileNotFoundException = 2,
        /// <summary>
        /// Defines the OverflowException
        /// </summary>
        OverflowException = 3,
        /// <summary>
        /// Defines the OutOfMemoryException
        /// </summary>
        OutOfMemoryException = 4,
        /// <summary>
        /// Defines the InvalidCastException
        /// </summary>
        InvalidCastException = 5,
        /// <summary>
        /// Defines the ObjectDisposedException
        /// </summary>
        ObjectDisposedException = 6,
        /// <summary>
        /// Defines the UnauthorizedAccessException
        /// </summary>
        UnauthorizedAccessException = 7,
        /// <summary>
        /// Defines the NotImplementedException
        /// </summary>
        NotImplementedException = 8,
        /// <summary>
        /// Defines the NotSupportedException
        /// </summary>
        NotSupportedException = 9,
        /// <summary>
        /// Defines the InvalidOperationException
        /// </summary>
        InvalidOperationException = 10,
        /// <summary>
        /// Defines the TimeoutException
        /// </summary>
        TimeoutException = 11,
        /// <summary>
        /// Defines the ArgumentException
        /// </summary>
        ArgumentException = 12,
        /// <summary>
        /// Defines the FormatException
        /// </summary>
        FormatException = 13,
        /// <summary>
        /// Defines the StackOverflowException
        /// </summary>
        StackOverflowException = 14,
        /// <summary>
        /// Defines the SqlException
        /// </summary>
        SqlException = 15,
        /// <summary>
        /// Defines the IndexOutOfRangeException
        /// </summary>
        IndexOutOfRangeException = 16,
        /// <summary>
        /// Defines the IOException
        /// </summary>
        IOException = 17
    }

   
  
}


