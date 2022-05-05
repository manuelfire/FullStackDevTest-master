
const  inspect = require('util').inspect;
const Imap = require('imap');
const EventEmitter = require('events').EventEmitter;
const simpleParser = require('mailparser').simpleParser;
const async = require('async');
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");

class MailReader extends EventEmitter{
    constructor(options){
      super();
      this.imap = new Imap({
        keepalive: config.imapKeepalive,
        xoauth2: options.xoauth2, 
        user: options.username,
        password: options.password, 
        host: options.host,
        port: options.port, 
        tls: options.tls, 
        tlsOptions: options.tlsOptions || {},
        connTimeout: options.connTimeout || null, 
        authTimeout: options.authTimeout || null,
        debug: options.debug || null
     });
     this.imap.once('ready', this.imapReady.bind(this));
     this.imap.once('close', this.imapClose.bind(this));
     this.imap.on('error', this.imapError.bind(this));
     this.messages = [];
    
    }
   start() { this.imap.connect() };
   stop() { this.imap.end() };
   imapReady() {
    this.imap.openBox(this.mailbox, false, (err, mailbox) => {
       if (err) { this.emit('error', err); }
       else {
          this.emit('server', 'connected');
          this.emit('mailbox', mailbox);
          if (this.fetchUnreadOnStart) { this.parseUnread.call(this); }
          let listener = this.imapMail.bind(this);
          this.imap.on('mail', listener);
          this.imap.on('update', listener);
       }
    });

    
 };

 imapClose() { this.emit('server', 'disconnected'); };
 imapError(err) { this.emit('error', err); };
 imapMail() { this.parseUnread.call(this); };

 parseUnread() {
  let self = this;
  self.imap.search(self.searchFilter, (err, results) => {
     if (err) { self.emit('error', err); }
     else if (results.length > 0) {
        async.each(results, (result, callback) => {
           let f = self.imap.fetch(result, { bodies: '', markSeen: self.markSeen });
           f.on('message', (msg, seqno) => {
              msg.on('body', async (stream, info) => {
                 let parsed = await simpleParser(stream);
                 console.log("MAIL:", parsed);
                 let from = parsed.from.value[0];
                 self.emit('mail', from, parsed.text, parsed.subject);
                 this.messages.push(parsed);
                 if (parsed.attachments.length > 0) {
                    for (let att of parsed.attachments) {
                       if (self.attachments) { self.emit('attachment', from, att); }
                       else { self.emit('attachment', from, null); }
                    }
                 }
              });
           });
           f.once('error', (err) => { self.emit('error', err); });
        }, (err) => { if (err) { self.emit('error', err); } });
     }
  });
}

}

export default MailReader;