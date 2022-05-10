import socketMiddleware from 'socket.io-middleware';
import * as EVENTS from './socketio';

const initialSocket = null;


export const client = EVENTS.client;
export const server = EVENTS.server;
export const state = EVENTS.state;
export const socket_id = 'EMAIL';

export default socketMiddleware(
  initialSocket,    
  EVENTS.client,
  EVENTS.server,
  EVENTS.state,
  socket_id,/* connect action to be sent by redux to initialize the socket */
  
 
); 