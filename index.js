const http = require('http');
const readline = require('readline'); 

let mins, minsToMs;
const pingUrl = 'http://nasa-direct-stem.azurewebsites.net/webservice/v1/math/nfibonacci?n=4';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the ping interval in minutes:', (answer) => {
    mins = answer;
    minsToMs = mins * 60 * 1000;
    console.log('You have entered ' + mins + ' minutes, or ' +  minsToMs + ' ms.');
    rl.close();
    startPinging();
});

function pingTask() {
    console.log('Pinging url: ' + pingUrl);
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