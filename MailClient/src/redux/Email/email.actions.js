import * as api from '../../api/api';
import * as ActionType from './email.types';


export const IMAPGetAllMail = (config) => async (dispatch) => {

try{

    const clearAction = {type : ActionType.IMAP_GETALLMAIL, payload : []};
    dispatch(clearAction);
    const action = {type : ActionType.GET_IMAP_MAIL, payload : config};

    dispatch(action);

}catch(error )
{
    console.log(error.message);
}

    
}

export const IMAPGetMail = (id,config) => async (dispatch) => {

    try{
        
        const {data} = await api.IMAPfetchOne(id,config);
        
       
        const action = {type : ActionType.IMAP_GETONEMAIL, payload : data};
    
        dispatch(action);
    
    }catch(error )
    {
        console.log(error.message);
    }
    
        
    }

export const POP3GetAllMail = (config) => async (dispatch) => {

    try{
        
        const clearAction = {type : ActionType.POP3_GETALLMAIL, payload : []};
        dispatch(clearAction);
        const action = {type : ActionType.GET_POP3_MAIL, payload : config};
        console.log(action);
        dispatch(action);
    
    
    }catch(error )
    {
        console.log(error.message);
    }
    
        
    }

    export const POP3GetMail = (id,config) => async (dispatch) => {

        try{
            
            const {data} = await api.POP3fetchOne(id,config);

            const action = {type : ActionType.POP3_GETONEMAIL, payload : data};
        
            dispatch(action);
            
        
        }catch(error )
        {
            console.log(error.message);
        }
        
            
        }
    
    export const EmailConnect = (host,port) => async (dispatch) => {

            try{
                
             
                const action = {type : ActionType.EMAIL_CONNECT, payload : {host,port}};
            
                dispatch(action);
                
            
            }catch(error )
            {
                console.log(error.message);
            }
            
                
        }
  

