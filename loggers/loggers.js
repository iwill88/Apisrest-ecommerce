import log4js from 'log4js';


log4js.configure({

    appenders: {
      loggerConsole: { type: "console" },
      infoConsole: { type: "console"},
      loggerWarnFile: {type:"file", filename: "warn.log"},
      loggerErrFile:{type:"file", filename: "error.log"},

      loggerInfo: { appender: "infoConsole", type: "logLevelFilter", level: "info"},
      loggerWarns: {  appender: "loggerWarnFile", type: "logLevelFilter", level: "warn"},
      loggerErrors: { appender: "loggerErrFile", type: "logLevelFilter", level: "error"},
        
    },
    categories: {
      default: {
        appenders: ["infoConsole"],
        level:"trace",
      },
      info: {
        appenders: ["loggerInfo"],
        level:"all",
      },
      warn: {
        appenders: ["loggerWarns", "loggerConsole"],
        level:"all",
      },    
      error:{
        appenders:["loggerErrors", "loggerConsole"],
        level:"error"
      }
    }
  })
  
const logger = log4js.getLogger('info');
const loggerWarn = log4js.getLogger("warn");
const loggerError = log4js.getLogger("error");


export {logger,loggerWarn, loggerError};