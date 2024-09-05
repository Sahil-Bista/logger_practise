const pino = require("pino");
const { stdout } = require("process");
const dotenv = require("dotenv").config();


const token = process.env.TOKEN;



//The logging and transports work in separate threads.
const transport = pino.transport({
    targets:[
        {target : 'pino/file',
        options : {destination : './logs/output.log', mkdir:true}
        },
        {target : 'pino-pretty',
            options : {destination :process.stdout.fd}
        },
        {
            target : '@logtail/pino',
            options : {sourceToken : token}
        }
    ]
})

const logger = pino({
    customLevels : {catastrophe : 70},
    level : process.env.PINO_LOG_LEVEL || 'info',
    //default level
    //so the level for warn is 40 , in that case only the levels above warn will be displayed in the log
    // formatters : {
    //     level : (label) => {
    //         return {level : label.toUpperCase()}
    //     }
    // }
    redact : {
       paths : ['email','password'],
       remove : true,
    }
  }, transport);

//   const logger = winston.createLogger({
//     level: process.env.LOG_LEVEL || 'info',
//     format: winston.format.json(),
//     transports: [new winston.transports.Console()],
//     exceptionHandlers: [
//       new winston.transports.File({ filename: 'exception.log' }),
//     ],
//     rejectionHandlers: [
//       new winston.transports.File({ filename: 'rejections.log' }),
//     ],
//   });

  const username = 'Sahil';
  const usernameLogger = logger.child({username : username});

  const employee = {
    name:"Sahil",
    password : "123",
    email : "sahil@gmail.com"
  }
  

  usernameLogger.info("hello");
  usernameLogger.error("Oh,shit!");
  logger.catastrophe("Catastrophic error");
  logger.info(employee);