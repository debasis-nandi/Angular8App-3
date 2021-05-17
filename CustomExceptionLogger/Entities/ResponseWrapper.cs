using System;
using System.Collections.Generic;
using System.Text;

namespace CustomExceptionLogger.Entities
{
   public class ResponseWrapper<T>
    {
        public int Code { get; set; }

        /// <summary>
        /// Gets or sets the Message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets the Status
        /// </summary>
        public Status Status { get; set; }

        /// <summary>
        /// Gets or sets the Data
        /// </summary>
        public T Data { get; set; }
    }
    public enum Status
    {
        /// <summary>
        /// Defines the Error
        /// </summary>
        Error = 0,
        /// <summary>
        /// Defines the Success
        /// </summary>
        Success = 1
    }
}
