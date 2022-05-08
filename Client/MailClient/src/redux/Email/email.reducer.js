import * as ActionType from './email.types';

export  default   (emails  = [],action ) =>{
    switch (action.type) {
        case ActionType.IMAP_GETALLMAIL:
        case ActionType.POP3_GETALLMAIL:
            console.log("fui fetch");
            return action.payload;
        case ActionType.IMAP_GETONEMAIL:
        case ActionType.POP3_GETONEMAIL:
            console.log("let me update");
            console.log(action.payload);
           let newEmails = emails.map((email)=>email.uid === action.payload.uid ? action.payload : email);
            
            return Array.from(newEmails);

        default:
            return emails;
            
    }
}