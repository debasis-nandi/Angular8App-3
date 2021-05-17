


namespace CustomExceptionLogger.Entities
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Defines the <see cref="ErrorLogViewModel" />.
    /// </summary>
    public class ErrorLogViewModel
    {
        /// <summary>
        /// Gets or sets the TraceId.
        /// </summary>
        [Required]
        public string TraceId { get; set; }

        /// <summary>
        /// Gets or sets the ErrorMsg.
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string ErrorMsg { get; set; }

        /// <summary>
        /// Gets or sets the StackTrace.
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string StackTrace { get; set; }

        /// <summary>
        /// Gets or sets the Source.
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string Source { get; set; }

        /// <summary>
        /// Gets or sets the StatusCode.
        /// </summary>
        [Required]
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether IsProd.
        /// </summary>
        [Required]
        public bool IsProd { get; set; }

        /// <summary>
        /// Gets or sets the Host.
        /// </summary>
        public string Host { get; set; }

        /// <summary>
        /// Gets or sets the RequestMethod.
        /// </summary>
        public string RequestMethod { get; set; }

        /// <summary>
        /// Gets or sets the UserAgent.
        /// </summary>
        public string UserAgent { get; set; }

        /// <summary>
        /// Gets or sets the RemoteAddress.
        /// </summary>
        public string RemoteAddress { get; set; }

        /// <summary>
        /// Gets or sets the UserDetails.
        /// </summary>
        public string UserDetails { get; set; }
    }
}
