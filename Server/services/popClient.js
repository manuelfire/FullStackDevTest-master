const { Client } = require('yapople');


class MailReaderPOP extends EventEmitter
{
  const client = new Client({
    host: 'pop.gmail.com',
    port:  995,
    tls: true,
    mailparser: true,
    username: 'manuelandy@gmail.com',
    password: '483.Champ',
    options: {
      secureContext: {
        passphrase: "passphrase"
      }
    }
  });
  
  const messages = [];
  
  const getMail = (async () => {
      await client.connect();
      const messages = await client.retrieveAll();
      messages.forEach((message) => {
        console.log(message.subject);
        messages.push(message);
      });
      await client.quit();
  })().catch(console.error);

}


