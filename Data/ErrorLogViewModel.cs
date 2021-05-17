using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Data
{
   public class ErrorLogViewModel
    {
        [Required]
        public string TraceId { get; set; }

        /// <summary>
        /// Gets or sets the ErrorMsg
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string ErrorMsg { get; set; }

        /// <summary>
        /// Gets or sets the StackTrace
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string StackTrace { get; set; }

        /// <summary>
        /// Gets or sets the Source
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string Source { get; set; }

        /// <summary>
        /// Gets or sets the StatusCode
        /// </summary>
        [Required]
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether IsProd
        /// </summary>
        [Required]
        public bool IsProd { get; set; }

        public string Host { get; set; }

        public string RequestMethod { get; set; }

        public string UserAgent { get; set; }

        public string RemoteAddress { get; set; }

        public string UserDetails { get; set; }
    }
}
