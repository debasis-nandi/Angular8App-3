using global::CustomExceptionLogger.Entities;
using global::CustomExceptionLogger.Utilities;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using System.Threading.Tasks;
using System.Net;
using Newtonsoft.Json;


namespace CustomExceptionLogger.Logger
{
   public class CustomExceptionLogger
    {
        private readonly RequestDelegate _next;
        private static IHostingEnvironment _currentEnvironment { get; set; }
        private string customErrorMessage { get; set; }

        public string _connectionString;

        public CustomExceptionLogger(RequestDelegate next, IHostingEnvironment currentEnvironment)
        {
            this._next = next;
            _currentEnvironment = currentEnvironment;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            } catch(Exception ex){
                await HandleExceptionAsync(context, ex);
            }
        }

        private  Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            ErrorLogViewModel data = ProcessErrorContext(ex, context);
            HttpResponse response = context.Response;
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            response.ContentType = "application/json";
            string result = JsonConvert.SerializeObject(
                new ResponseWrapper<string>()
                {
                    Code = (int)HttpStatusCode.InternalServerError,
                    Message = data.ErrorMsg,
                    Status = Status.Error,
                    Data = null
                });
            response.ContentLength = result.Length;
           
            return context.Response.WriteAsync(result);
        }        

        public ErrorLogViewModel ProcessErrorContext(Exception exception, HttpContext context)
        {
            HttpStatusCode statusCode = (exception as WebException != null &&
              (HttpWebResponse)(exception as WebException).Response != null) ?
              ((HttpWebResponse)(exception as WebException).Response).StatusCode
              : CommonUtitlies.GetErrorCode(exception.GetType());

            string errorMessage = exception.Message;
            //   Guid traceId = Guid.NewGuid();
            //customErrorMessage = ($"{CommonUtitlies.CustomErrorMessage} {traceId}");
            customErrorMessage = ($"{CommonUtitlies.CustomErrorMessage} ");
            string stackTrace = exception.StackTrace;
            string source = context.Request.Path;
            string host = context.Request.Host.HasValue ? context.Request.Host.Value : string.Empty;
            string requestMethod = context.Request.Method;
            string userAgent = ((Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.HttpRequestHeaders)((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)context.Request).Headers).HeaderUserAgent.ToString();
            string remoteAddress = context.Request.Host.Value.Contains("localhost") ? "127.0.0.1" : context.Connection.RemoteIpAddress.ToString();
             bool isProd = !_currentEnvironment.IsDevelopment();
            string userEmail = string.Empty;
            ErrorLogViewModel errorLogViewModel = new ErrorLogViewModel()
            {
                ErrorMsg = errorMessage,
                IsProd = false,
                Source = source,
                StackTrace = stackTrace,
               // TraceId = traceId.ToString(),
                StatusCode = (int)statusCode,
                Host = host,
                RequestMethod = requestMethod,
                UserAgent = userAgent,
                RemoteAddress = remoteAddress,
                UserDetails = userEmail
            };

            return errorLogViewModel;

        }
    }
    }
