using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Services;
using Repo;
using Data.Interfaces;
using MEI.Api.CustomExceptionFilter;

namespace MEI.Api
{
    public class Startup
    {
        internal readonly string MyAllowSpecificOrigins = "_MEIAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddConnections();
            services.AddTransient<IEmployeeDetailServices, EmployeeDetailServices>();
            services.AddTransient<IEmployeeDetailRepo, EmployeeDetailRepo>();
            services.AddTransient<ISurveyRepo,SurveyRepo>();
            services.AddTransient<ISurveyServices, SurveyServices>();
            services.AddTransient<IDashboard1Repo, Dashboard1Repo>();
            services.AddTransient<IDashboard2Repo, Dashboard2Repo>();
            services.AddTransient<IDashboard1Services, Dashboard1Services>();
            services.AddTransient<IDashboard2Services, Dashboard2Services>();
            services.AddTransient<IFAQs, FAQs>();
            services.AddTransient<IFAQsService, FAQsService>();
            services.AddTransient<ILoggerBL, LoggerBL>();
            services.AddTransient<ILoggerDA, LoggerDA>();

            services.AddMvc(config =>
            {
                 config.Filters.Add(typeof(CustomExceptionHandler));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyOrigin()
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
           
            app.UseCors(MyAllowSpecificOrigins);
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
