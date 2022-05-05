const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');

const { Client } = require('yapople');
const client = new Client({
  host: 'pop.gmail.com',
  port:  995,
  tls: false,
  mailparser: true,
  username: 'manueldrag99@gmail.com',
  password: '483.Champ',
  options: {
    secureContext: {
      passphrase: "passphrase"
    }
  }
});

(async () => {
    await client.connect();
    const messages = await client.retrieveAll();
    messages.forEach((message) => {
      console.log(message.subject);
    });
    await client.quit();
})().catch(console.error);