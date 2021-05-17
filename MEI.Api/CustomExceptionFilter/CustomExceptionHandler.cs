using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;
using System.Threading.Tasks;
using CustomExceptionLogger.Utilities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Data.Interfaces;
using Data;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;

namespace MEI.Api.CustomExceptionFilter
{
    public class CustomExceptionHandler : IExceptionFilter
    {       
        private IHostingEnvironment _currentEnvironment { get; set; }

        private readonly ILoggerBL _loggerBL;

      public  CustomExceptionHandler(IHostingEnvironment currentEnvironment,  ILoggerBL loggerBL)
        {
            this._currentEnvironment = currentEnvironment;
            this._loggerBL = loggerBL;
        }
        public void OnException(ExceptionContext context)
        {
            HttpStatusCode statusCode = (context.Exception as WebException != null &&
              (HttpWebResponse)(context.Exception as WebException).Response != null) ?
              ((HttpWebResponse)(context.Exception as WebException).Response).StatusCode
              : CommonUtitlies.GetErrorCode(context.Exception.GetType());

            string errorMessage = context.Exception.Message;
            Guid traceId = Guid.NewGuid();
            string customErrorMessage = ($"{CommonUtitlies.CustomErrorMessage} {traceId}");
            string stackTrace = context.Exception.StackTrace;
            string source = context.HttpContext.Request.Path;
            string host = context.HttpContext.Request.Host.HasValue ? context.HttpContext.Request.Host.Value : string.Empty;
            string requestMethod = context.HttpContext.Request.Method;
            string userAgent = ((Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.HttpRequestHeaders)((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)context.HttpContext.Request).Headers).HeaderUserAgent.ToString();
            string remoteAddress = context.HttpContext.Request.Host.Value.Contains("localhost") ? "127.0.0.1" : context.HttpContext.Connection.RemoteIpAddress.ToString();
            bool isProd = !_currentEnvironment.IsDevelopment();                       

            ErrorLogViewModel errorLogViewModel = new ErrorLogViewModel()
            {
                ErrorMsg = errorMessage,
                Source = source,
                StackTrace = stackTrace,
                StatusCode = (int)statusCode,
                Host = host,
                RequestMethod = requestMethod,
                UserAgent = userAgent,
                RemoteAddress = remoteAddress               
            };
            
            Task<string> data = LogAsync(errorLogViewModel);
            bool isLogged = _loggerBL.Log(errorLogViewModel);
            HttpResponse response = context.HttpContext.Response;
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            response.ContentType = "application/json";
            string result = JsonConvert.SerializeObject(
                new ResponseWrapper<string>()
                {
                    Code = (int)errorLogViewModel.StatusCode,
                    Message = errorLogViewModel.ErrorMsg,
                    Status = Status.Error,
                    Data = null
                });
            response.ContentLength = result.Length;
            response.WriteAsync(result);
        }

        public async Task<string> LogAsync(ErrorLogViewModel errorLogDataModel)
        {
            string resultContent = string.Empty;
            using (HttpClient client = new HttpClient())
            {
               // client.BaseAddress = new Uri(_apiUrl.Value.logging);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string jsonString = JsonConvert.SerializeObject(errorLogDataModel, Formatting.Indented);
                StringContent httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("api/Errorlog/LogError", httpContent);
                HttpResponseMessage response1 = await client.PostAsync("Errorlog/LogError", httpContent);
                resultContent = await response1.Content.ReadAsStringAsync();
            }
            return resultContent;
        }
    }
}
