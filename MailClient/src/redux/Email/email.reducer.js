import * as ActionType from './email.types';

export  default   (emails  = [],action ) =>{
    switch (action.type) {
        case ActionType.IMAP_GETALLMAIL:
        case ActionType.POP3_GETALLMAIL:
            return [];
        case ActionType.IMAP_GETONEMAIL:
        case ActionType.POP3_GETONEMAIL:
           let newEmails = emails.map((email)=>email.uid === action.payload.uid ? action.payload : email);
            
            return [...newEmails];
            case ActionType.NEW_MESSAGE:
                console.log(action);
                return [...emails,action.payload.data];
        default:
            return emails;
            
    }
}