const express = require('express')
const Imap = require('imap');
const cors = require('cors');
const { Client }=  require('yapople');
const https = require('https');
const fs = require('fs');
require('dotenv').config();
const simpleParser = require('mailparser').simpleParser;
const socketServer =require('socket.io')


const app = express();



const port = process.env.PORT || 4000;
const CORSHost = process.env.ALLOW_CORS_HOST || "http://localhost";
const CORSPort = process.env.ALLOW_CORS_PORT || 3000;
let corsOrigin = `${CORSHost}:${CORSPort}`;
const options = {
 key: fs.readFileSync("key.pem"),
 cert: fs.readFileSync("cert.pem"),
  requestCert: false,
  rejectUnauthorized: false
};


var server = https.createServer(options,app);
const io = socketServer(server,{
    allowEIO3: true,
    cors: {
      origin: corsOrigin,//"http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(express.json())
app.use(cors());

server.listen(port, () => {
    console.log(`Email app listening on port ${port}`)
  });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('GET_IMAP_MAIL', function(data) {
        
        try{
            console.log(data);
            
            let IsTLS = data.encryption == "Unencrypted" ? false: true;
            let STARTTLS = data.encryption == "STARTTLS" ? "required" : "never";
            let imap = new Imap({
                    user: data.username,
                    password: data.password,
                    host: data.server,
                    port: data.port,
                    tls: IsTLS,
                    autotls:STARTTLS,
                    tlsOptions : {
                      port:data.port,
                      host:data.server,
                      servername: data.server
                    }
                });
                function openInbox(cb) {
                  imap.openBox('INBOX', true, cb);
                }
               imap.connect();
            var mes = {};
            imap.once('ready', function() {
                openInbox(function(err, box) {
                  if (err) throw err;
                imap.search([ 'UNSEEN' ], function(err, results) {
                  if (err || !results.length) return imap.end();
                  var f = imap.fetch(results, {
                    bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                    struct: true
                  });
                  f.on('message', function(msg, seqno) {
                 
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function(stream, info) {
                      var buffer = '';
                      stream.on('data', function(chunk) {
                        buffer += chunk.toString('utf8');
                      });
                      stream.once('end', function() {
                        
                        let parsed = Imap.parseHeader(buffer);
                       console.log(parsed);
                        mes = {"subject":parsed.subject[0],"date":parsed.date[0],"from":parsed.from[0],"to": parsed.to ? parsed.to[0] : "" };
                      });
                    });
                    msg.once('attributes', function(attrs) {
                      
                      mes['uid'] = attrs.uid;
                    });
                    msg.once('end', function() {
                      
                      console.log(mes);
                      socket.emit('NEW_MESSAGE', { data: mes });
                      
                    });
                  });
                  f.once('error', function(err) {
                    console.log('Fetch error: ' + err);
                  });
                  f.once('end', function() {
                    console.log('Done fetching all messages!');
                    imap.end();
                  });
                });
                });
              });
              
              imap.once('error', function(err) {
                console.log(err);
                socket.emit('IO_ERROR', { value: err.message });
              });
              
              imap.once('end', function() {
                console.log('Connection ended');
              });
              
              
            
                       
                       
            
        }catch(error)
        {   
            console.log(error.message);
            socket.emit('IO_ERROR', { value: error.message });
        }
        
      });

      socket.on('GET_POP3_MAIL',async function(data) {
        
        try{


          let IsTLS = data.encryption == "Unencrypted" ? false: true;
          let STARTTLS = data.encryption == "STARTTLS" ? "required" : "never";
          let client = new Client({
              username: data.username,
              password: data.password,
              host: data.server,
              port: data.port,
              tls: IsTLS,
              mailparser: true,
              options: {
                servername : data.server
                }
            
            });
            await client.connect();
            let msgCount = await client.count();
            for(let i = 1; i < msgCount ;i++)
            {
              let headers =await client.top(i,15);
              console.log(headers);
              let msg = {
                "uid":i,
                "subject":headers.subject,
                "date":headers.date,
                "from":headers.from[0].name +" <"+headers.from[0].address + ">",
                "to": headers.to ? headers.to[0].name + " <"+headers.to[0].address+">" : "" };

              socket.emit('NEW_MESSAGE', { data: msg });
            }

            console.log(msgCount);
            await client.quit();


        }catch(error)
        {
            console.log(error);
            socket.emit('IO_ERROR', { value: error.message });
        }
        
      });


    socket.on('disconnect', () => {
      console.log('user disconnected');
      socket.emit('IO_ERROR', "😢 Server Disconnected");
    });
  });

app.post('/pop3/getEmail',async (req, res) => {

  try{
  let uid =  req.body.uid
  let IsTLS = req.body.config.encryption == "Unencrypted" ? false: true;
  let STARTTLS = req.body.config.encryption == "STARTTLS" ? "required" : "never";
  let client = new Client({
      username: req.body.config.username,
      password: req.body.config.password,
      host: req.body.config.server,
      port: req.body.config.port,
      tls: IsTLS,
      mailparser: true,
      options: {
        servername : req.body.config.server
        }
    
    });
    await client.connect();
    let clientMsg =await client.retrieve(uid);
    console.log(clientMsg);
    let msg = {
      "uid":uid,
      "subject":clientMsg.subject,
      "date":clientMsg.date,
      "from":clientMsg.from[0].name +" <"+clientMsg.from[0].address + ">",
      "to": clientMsg.to ? clientMsg.to[0].name + " <"+clientMsg.to[0].address+">" : "" ,
      "html":clientMsg.html};

    await client.quit();
    res.send(msg);

  }catch(error)
  {   
      console.log(error.message); 
      res.status(500).json({message: error.message});
  }



});

app.post('/imap/getEmail', async (req, res) => {

    try{
           let uid =  req.body.uid;
           let IsTLS = req.body.config.encryption == "Unencrypted" ? false: true;
           let STARTTLS = req.body.config.encryption == "STARTTLS" ? "required" : "never";
           let imap = new Imap({
                    user: req.body.config.username,
                    password: req.body.config.password,
                    host: req.body.config.server,
                    port: req.body.config.port,
                    tls: IsTLS,
                    autotls:STARTTLS,
                    tlsOptions : {
                      port: req.body.config.port,
                      host: req.body.config.server,
                      servername: req.body.config.server
                    }
                });
                
                
                function openInbox(cb) {
                  imap.openBox('INBOX', true, cb);
                }
            await   imap.connect();
            var mes = {};
            // let parsed = Imap.parseHeader(buffer);
            // console.log(parsed);
            // mes = {"uid":uid,"subject":parsed.subject[0],"date":parsed.date[0],"from":parsed.from[0],"to": parsed.to ? parsed.to[0] : "","html":parsed.html };
            
            imap.once('ready', function() {
                openInbox(function(err, box) {
                  if (err) throw err;
                imap.search([[ 'UID',uid ]], function(err, results) {
                  if (err || !results.length) return imap.end();
                  var f = imap.fetch(results, {
                    bodies: ''
                  });
                  f.on('message', function(msg, seqno) {
                 
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function(stream, info) {
                           
                      simpleParser(stream, (err, mail) => {
                        console.log(prefix + mail.subject);
                        console.log(prefix + mail.text);
                        mes = {"uid":uid,"subject":mail.subject,"date":mail.date,"from":mail.from.text,"to": mail.to ? mail.to.text : "","html":mail.html };
                        res.send(mes);
                      });
                      
                    });
                
                    msg.once('end', function() {
                      
                     
                      
                    });
                  });
                  f.once('error', function(err) {
                    console.log('Fetch error: ' + err);
                  });
                  f.once('end', function() {
                    console.log('Done fetching all messages!');
                    
                    imap.end();
                  });
                });
                });
              });
              
              imap.once('error', function(err) {
                console.log(err);
              });
              
              imap.once('end', function() {
                console.log('Connection ended');
              });
              
                
        
    }catch(error)
    {
        res.status(500).json({message: error.message});
    }
});



