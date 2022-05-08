const { Client }=  require('yapople');



 class MailReaderPOP 
{
  constructor(props){
    this.client = new Client({
      host: 'pop.gmail.com',
      port:  995,
      tls: true,
      mailparser: true,
      username: 'manueldrag99@gmail.com',
      password: '483.Champ'
    
    });

    
    
    this.messages = [];
  }
  
 
  async getAllMail(){
    try{
    await this.client.connect();
    const messages = await this.client.retrieveAll();
    var i = 1;
    messages.forEach((message) => {
      console.log(message.subject);
      this.messages.push({"id":i++,"subject":message.subject, "date" : message.receivedDate});
    });
    await this.client.quit();
  }catch(e)
  {
    console.log(e);
    throw e;
    
  }

}
  async getAllMail(page,limit){
      try{
        
        const start = page * limit; // start index of the records
        const end = (page + 1) * limit; 
        const step =1;
        const len = Math.floor((end - start) / step) + 1;


      let range = Array(len).fill().map((_, idx) => start + (idx * step)).slice(1);
      console.log(range);
      await this.client.connect();
      
      const messages = await this.client.retrieve(range);
      var i = 1;
      messages.forEach((message) => {
        console.log(message.subject);
        this.messages.push({"id":i++,"subject":message.subject, "date" : message.receivedDate});
      });
      await this.client.quit();
    }catch(e)
    {
      console.log(e);
      throw e;
      
    }
 
  }

  async getMail(num){
    try{
    console.log("mail get");
    await this.client.connect();
    const messages = await this.client.retrieve(num);
    messages.forEach((message) => {
      console.log(message.subject);
      this.messages.push(message.subject);
    });
    await this.client.quit();
  }catch(e)
  {
    console.log(e);
    throw e;
    
  }

}
}
module.exports = MailReaderPOP;

