import MailReader from "../services/imapClient";

export const getMailIMAP = async (req,res) => {

    try{
        var config = req.config;
        mailClient = new MailListener({
            username: config.gmailId, password: config.gmailPw, host: 'imap.gmail.com',
            port: 993, tls: true, tlsOptions: { servername: 'imap.gmail.com' },
            connTimeout: 10000, authTimeout: 5000,
            mailbox: "INBOX",
            searchFilter: [
               ['UNSEEN']
            ],
            fetchUnreadOnStart: true, markSeen: true,
            attachments: true, attachmentOptions: { directory: "attachments/" },
            debug: config.imapLogging ? Log : false
         });
      
         mailClient.start();
         mailClient.imapReady();

         
         

    }catch(error)
    {
        res.status(404).json({message: error.message});
    }
}

export const getMailIPOP = async (req,res) => {

    try{
        var config = req.config;
        mailClient = new MailListener({
            username: config.gmailId, password: config.gmailPw, host: 'imap.gmail.com',
            port: 993, tls: true, tlsOptions: { servername: 'imap.gmail.com' },
            connTimeout: 10000, authTimeout: 5000,
            mailbox: "INBOX",
            searchFilter: [
               ['UNSEEN']
            ],
            fetchUnreadOnStart: true, markSeen: true,
            attachments: true, attachmentOptions: { directory: "attachments/" },
            debug: config.imapLogging ? Log : false
         });
      
         mailClient.start();
         mailClient.imapReady();
         
         
         

    }catch(error)
    {
        res.status(404).json({message: error.message});
    }
}

export const connectMailIMAP = async (req,res) => {

    try{

        

    }catch(error)
    {
        res.status(404).json({message: error.message});
    }
}