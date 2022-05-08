import * as api from '../../api/api';
import * as ActionType from './email.types';


export const IMAPGetAllMail = (config) => async (dispatch) => {

try{
    
    
    const {data} = await api.IMAPLogin(config);
   
    if(data == "Authenticated") {
     const {data} = await api.IMAPfetchAll();
     console.log(data);
     const action = {type : ActionType.IMAP_GETALLMAIL, payload : data};

     dispatch(action);
    }else {

        console.log("Wrong credentials");
    }
    
    

}catch(error )
{
    console.log(error.message);
}

    
}

export const IMAPGetMail = (config,id) => async (dispatch) => {

    try{
        
        const {data} = await api.IMAPfetchOne(config,id);
        
        console.log(data);
        const action = {type : ActionType.IMAP_GETONEMAIL, payload : data};
    
        dispatch(action);
    
    }catch(error )
    {
        console.log(error.message);
    }
    
        
    }

export const POP3GetAllMail = (config) => async (dispatch) => {

    try{
        
        const {data} = await api.POP3fetchAll(config);
        
        console.log(data);
        const action = {type : ActionType.POP3_GETALLMAIL, payload : data};
    
        dispatch(action);
    
    }catch(error )
    {
        console.log(error.message);
    }
    
        
    }

    export const POP3GetMail = (config,id) => async (dispatch) => {

        try{
            
            const {data} = await api.POP3fetchOne(config,id);
            
            console.log(data);
            const action = {type : ActionType.POP3_GETONEMAIL, payload : data};
        
            dispatch(action);
        
        }catch(error )
        {
            console.log(error.message);
        }
        
            
        }
  
