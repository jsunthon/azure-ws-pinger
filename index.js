const http = require('http');
const mins = 15;
const minsToMs = mins * 60 * 1000;
const pingUrl = 'http://nasa-direct-stem.azurewebsites.net/webservice/v1/math/nfibonacci?n=4';

startPinging();

function pingTask() {
    console.log('Pinging url: ' + pingUrl + '\n every ' + mins + ' mins, or ' + minsToMs + ' ms.');
    http.get(pingUrl, (response) => {
        const statusCode = response.statusCode;
        if (statusCode !== 200) {
            console.log('A bad response was received.');
        }
        let body = '';
        response.on('data', (chunk) => {
            body += chunk;
        });
        response.on('end', () => {
            console.log("Received response:\n " + body);
        });
    });
}

function startPinging() {
    pingTask();
    setInterval(pingTask, minsToMs);
}