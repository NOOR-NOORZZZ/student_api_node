const fs = require('fs');
const path = require('path');

// Function to get today's date in YYYY-MM-DD format
const getCurrentDate = () => new Date().toISOString().split('T')[0];

// Function to get API name from the URL
const getApiName = (req) => {
    const segments = req.originalUrl.split('/').filter(Boolean);
    return segments.length ? segments.join('_') : 'general_log';
};

// Function to format log message
const formatLog = ({ timestamp, method, url, status, request, response, isError }) => {
    // Convert response to a single-line string
    const responseString = typeof response === 'string' ? response : JSON.stringify(response);

    return `===================================================================
LOG TYPE  : ${isError ? 'Error' : 'Success'}
Timestamp : ${timestamp}
Method    : ${method}
URL       : ${url}
Status    : ${status}
Request   : ${JSON.stringify(request)}
${isError ? 'Error Details:' : 'Response  :'} ${responseString}
===================================================================\n`;
};

// Function to write logs asynchronously
const logRequest = async (req, status, requestData, responseData) => {
    try {
        const today = getCurrentDate();
        const logDir = path.join(__dirname, `../logs/${today}`);

        // Ensure log directory exists
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const apiName = getApiName(req);
        const logFilePath = path.join(logDir, `${apiName}.log`);

        // Convert response to a single-line string
        const responseString = typeof responseData === 'string' ? responseData : JSON.stringify(responseData);

        const logEntry = formatLog({
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status,
            request: requestData,
            response: responseString,
            isError: status >= 400,
        });

        // Append log entry to the corresponding API file asynchronously
        await fs.promises.appendFile(logFilePath, logEntry);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
};

module.exports = { logRequest };
