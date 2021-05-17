using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MEI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public AuthenticationController(){ }

        [HttpGet("WinAuth")]
        public WinAuth WinAuth()
        {
            WinAuth result = new WinAuth();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://strategyreporting.evalueserve.com/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                var response = client.GetAsync("WinAuthApi/Auth/GetUser").Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseString = response.Content.ReadAsStringAsync().Result;
                    result = response.Content.ReadAsAsync<WinAuth>().Result;
                }
            }
            return result;
        }
    }
}