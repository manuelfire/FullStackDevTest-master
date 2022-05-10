
import {applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import socketIOMiddleWare from '../middleware/socketio-middleware'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketIOMiddleWare)
    
  });

export default store;