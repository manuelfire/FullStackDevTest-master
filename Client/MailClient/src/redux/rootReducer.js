import { combineReducers } from 'redux';


import emailReducer from './Email/email.reducer';


    const rootReducer = combineReducers({

        emails: emailReducer,

    });

    export default rootReducer;