using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Interfaces
{
   
    public interface ILoggerBL
    {
        bool Log(ErrorLogViewModel errorLogViewModel);
    }
    public interface ILoggerDA
    {
        bool Log(ErrorLogViewModel errorLogViewModel);
    }
    public class LoggerBL : ILoggerBL
    {
        private readonly ILoggerDA _loggerDA;

        public LoggerBL(ILoggerDA loggerDA)
        {
            _loggerDA = loggerDA;
        }

        public bool Log(ErrorLogViewModel errorLogViewModel)
        {
            return _loggerDA.Log(errorLogViewModel);
        }
    }

    public class LoggerDA : ILoggerDA
    {
     
        public LoggerDA()
        {
            
        }

        
        public bool Log(ErrorLogViewModel errorLogViewModel)
        {
              
          
            return true;
           
        }
    }

  
}
