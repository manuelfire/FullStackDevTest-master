const Imap  =require('imap')
const inspect = require('util').inspect;

class MailClientIMAP {

        connection = new Imap({
        user: 'manueldrag99@gmail.com',
        password: '483.Champ',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: false
        },
        authTimeout: 3000
    }).once('error', function (err) {
        console.log('Source Server Error:- ', err);
    });

    constructor() {
        
      this.loadedUids = new Set()

      
      this.initialLoadDone = false;
     
     this.connection.connect();
        
    }

    async getServer() {

       return this.connection;
    }

    // async connectAndLoadMessages() {
    //   const configWithListener = {
    //     ...this.config,
    //     // 'onmail' adds a callback when new mails arrive. With this we can keep the imap refresh interval very low (or even disable it).
    //     onmail: () => this._doOnNewMail()
    //   }
  
    //   this.once(MailClientIMAP.EVENT_INITIAL_LOAD_DONE, () =>
    //     this._doAfterInitialLoad()
    //   )
  
    //   await this._connectWithRetry(configWithListener)
  
    //   // Load all messages in the background. (ASYNC)
    //   this._loadMailSummariesAndEmitAsEvents()
    // }
  
    // async _connectWithRetry(configWithListener) {
    //   try {
    //     await retry(
    //       async _bail => {
    //         // If anything throws, we retry
    //         this.connection = await imaps.connect(configWithListener)
  
    //         this.connection.on('error', err => {
    //           // We assume that the app will be restarted after a crash.
    //           console.error(
    //             'got fatal error during imap operation, stop app.',
    //             err
    //           )
    //           this.emit('error', err)
    //         })
  
    //         await this.connection.openBox('INBOX')
    //         debug('connected to imap')
    //       },
    //       {
    //         retries: 5
    //       }
    //     )
    //   } catch (error) {
    //     console.error('can not connect, even with retry, stop app', error)
    //     throw error
    //   }
    // }

    
    // async _getMailHeadersAndEmitAsEvents(uids) {
    //   try {
    //     const mails = await this._getMailHeaders(uids)
    //     mails.forEach(mail => {
    //       this.loadedUids.add(mail.attributes.uid)
    //       // Some broadcast messages have no TO field. We have to ignore those messages.
    //       if (mail.parts[0].body.to) {
    //         this.emit(MailClientIMAP.EVENT_NEW_MAIL, this._createMailSummary(mail))
    //       }
    //     })
    //   } catch (error) {
    //     debug('can not fetch', error)
    //     throw error
    //   }
    // }
  
    // async _getMailHeaders(uids) {
    //   const fetchOptions = {
    //     bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
    //     struct: false
    //   }
    //   const searchCriteria = [['UID', ...uids]]
    //   return this.connection.search(searchCriteria, fetchOptions)
    // }

    // async _getAllUids() {
    //   // We ignore mails that are flagged as DELETED, but have not been removed (expunged) yet.
    //   const uids = await this._searchWithoutFetch([['!DELETED']])
    //   // Create copy to not mutate the original array. Sort with newest first (DESC).
    //   return [...uids].sort().reverse()
    // }

    // async fetchOneFullMail(to, uid) {
    //   if (!this.connection) {
    //     // Here we 'fail fast' instead of waiting for the connection.
    //     throw new Error('imap connection not ready')
    //   }
  
    //   debug(`fetching full message ${uid}`)
  
    //   // For security we also filter TO, so it is harder to just enumerate all messages.
    //   const searchCriteria = [['UID', uid], ['TO', to]]
    //   const fetchOptions = {
    //     bodies: ['HEADER', ''], // Empty string means full body
    //     markSeen: false
    //   }
  
    //   const messages = await this.connection.search(searchCriteria, fetchOptions)
    //   if (messages.length === 0) {
    //     throw new Error('email not found')
    //   }
  
    //   const fullBody = _.find(messages[0].parts, {which: ''})
    //   return simpleParser(fullBody.body)
    // }
}

module.exports = MailClientIMAP;
