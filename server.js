const express = require('express');
const path = require('path');
const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');
const axios = require('axios');

/*
 * Configure the format of the logs and the channels to publish the logs in.
 * In this case, each message will be written to the console and a file in
 * the '/logs' directory. Logs will append to the file until it exceeds the
 * specified file size. After that point, a new file with an incremented
 * index in the name will be created. After a max amount of files is reached,
 * the oldest file will be removed whilst creating a new one.
 */
const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            level: 'info',
            filename: './logs/server-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

// create a stream object with a 'write' function that will be used by 'morgan'
logger.stream = {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

// stream http traffic to winston log channels
const httpLogger = morgan(':method :url :status :response-time ms - :res[content-length]', {
    stream: logger.stream
});

const app = express();
app.use(httpLogger);
app.use(express.json()); // used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/todos', async (req, res) => {
    const todos = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/todos');
    res.send(todos.data);
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/**
 * Express default error handling - this middleware function must be added at
 * the end of the middleware function stack.
 */
app.use((err, req, res, next) => {
    const status = err.status || 500;

    // add this line to include winston logging
    logger.error(`${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // render the error page
    res.status(status);
});

const port = process.env.PORT || '3001';
app.listen(port, () => {
    logger.info(`Express server is running on port ${port}`);
});
