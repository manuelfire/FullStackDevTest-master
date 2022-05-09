const express = require('express')
const MailReaderPOP = require('./services/popClient')
const MailClientIMAP = require('./services/imapClient')
const inspect = require('util').inspect;
const Imap = require('imap');
const cors = require('cors');
const { Client }=  require('yapople');
var imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');

const app = express();
const port = 3001;
var IMAPConnection = null;
var POP3Connection = null;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(express.json())
app.use(cors());

app.post('/pop3/Login',async (req, res) => {

try{
    let IsTLS = req.body.encryption == "Unencrypted" ? false: true;
    POP3Connection = new Client({
        username: req.body.username,
        password: req.body.password,
        host: req.body.server,
        port: req.body.port,
        tls: IsTLS,
        mailparser: true
      
      });
      await POP3Connection.connect();
      res.send("Authenticated");

    }catch(error)
    {
        res.status(404).json({message: error.message});
    }

});


app.get('/pop3/getAllEmails',async (req, res) => {

    if(!POP3Connection) {
        throw new Error('pop3 connection not ready')
}
    var i = 1;
    POP3Connection.forEach((message) => {
      console.log(message);
      this.messages.push({"id":i++,"subject":message.subject, "date" : message.receivedDate});
    });

});

app.get('/pop3/getEmails',async (req, res) => {


    let page= req.query.page || 0;
    let limit = req.query.limit || 100;
    var client =  new MailReaderPOP;
    await client.getAllMail(page,limit);
    res.send(client.messages);

});

app.post('/imap/Login', async (req, res) => {

    try{
        
        
        
      
        let IsTLS = req.body.encryption == "Unencrypted" ? false: true;
        var config = {
            imap: {
                user: req.body.username,
                password: req.body.password,
                host: req.body.server,
                port: req.body.port,
                tls: IsTLS,
                authTimeout: 3000
            }
                };
        
        IMAPConnection =  await imaps.connect(config);
        console.log("Authenticated");
        res.send("Authenticated"); 
       
        
                   
                   
        
    }catch(error)
    {
        res.status(404).json({message: error.message});
    }
});


app.get('/imap/getAllEmails', async (req, res) => {

    try{
       
        if (!IMAPConnection) {
                    throw new Error('imap connection not ready')
           }
        let q = [];
        var resp = await IMAPConnection.openBox('INBOX');
        var searchCriteria = ['UNSEEN'];
        var fetchOptions = { bodies: ['HEADER']  };
        var messages =  await IMAPConnection.search(searchCriteria, fetchOptions);
        for(const item of messages)
        {   console.log(item);
            var all = _.find(item.parts, { "which": "HEADER" })
            var id = item.attributes.uid;
            console.log(id);
            q.push({"uid":id,"subject":all.body.subject[0],"date":all.body.date[0],"from":all.body.from[0],"to":all.body.to[0]});
        } 
        res.send(q);
        
                   
                   
        
    }catch(error)
    {
        res.status(404).json({message: error.message});
    }
});

app.get('/imap/getEmail', async (req, res) => {

    try{
       
        if (!IMAPConnection) {
                    throw new Error('imap connection not ready')
           }
        var q = [];
        var uid =  req.query.uid
        var resp = await IMAPConnection.openBox('INBOX');
        var searchCriteria = [['UID',uid]];
        var fetchOptions = { bodies: ['HEADER', '']  };
        var messages =  await IMAPConnection.search(searchCriteria, fetchOptions);
        for(const item of messages)
        {   
            var all = _.find(item.parts, { "which": "" })
            var id = item.attributes.uid;
            var idHeader = "Imap-Id: "+id+"\r\n";
            var mail =await simpleParser(idHeader+all.body);
            q.push({"uid":id,"subject":mail.subject,"date":mail.date,"from":mail.from.text,"to":mail.to.text,"html":mail.html});
        } 
        if(q.length > 0) {res.send(q[0])} else { res.send("Email not found.")}
        
        
                   
                   
        
    }catch(error)
    {
        res.status(404).json({message: error.message});
    }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});