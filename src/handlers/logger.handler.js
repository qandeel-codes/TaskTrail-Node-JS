const { addColors, format, transports, createLogger } = require("winston");
const { isDevelopment } = require("../../config");

// Define your severity levels.
// Will be used to create log files and control show or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  return isDevelopment ? "debug" : "warn"; //set the log level to debug in development mode HERE
};

// Define different colors for each level.
// These Colors will make the log message more visible.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "blue",
  debug: "white",
};

// Link the colors to winston.
addColors(colors);

// Choose the aspect of your log customizing the log format.
const _format = format.combine(
  // Add the message timestamp with the preferred format
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Tell Winston that the logs must be colored
  format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Define which transports the logger must use to print out messages.
// We are using three different transports
const _transports = [
  // Allow the use the console to print the messages
  new transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  new transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  // Allow to print all the error messages inside the all.log file
  // (including the error logs that are also printed inside the error.log)
  new transports.File({ filename: "logs/all.log" }),
];

// Create the logger instance that has to be exported
// and used to log messages.
module.exports = createLogger({
  level: level(),
  levels,
  format: _format,
  transports: _transports,
});
