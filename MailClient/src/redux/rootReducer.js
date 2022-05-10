import { combineReducers } from 'redux';


import emailReducer from './Email/email.reducer';
import errorReducer from './Error/error.reducer';


    const rootReducer = combineReducers({

        emails: emailReducer,
        error: errorReducer

    });

    export default rootReducer;