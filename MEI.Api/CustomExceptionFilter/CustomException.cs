using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MEI.Api.CustomExceptionFilter
{
    public class CustomException : Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CustomException"/> class.
        /// </summary>
        public CustomException()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomException"/> class.
        /// </summary>
        /// <param name="message">The message<see cref="string"/></param>
        public CustomException(string message) : base(message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomException"/> class.
        /// </summary>
        /// <param name="message">The message<see cref="string"/></param>
        /// <param name="responseModel">The responseModel<see cref="string"/></param>
        public CustomException(string message, string responseModel) : base(message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomException"/> class.
        /// </summary>
        /// <param name="message">The message<see cref="string"/></param>
        /// <param name="innerException">The innerException<see cref="Exception"/></param>
        public CustomException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
