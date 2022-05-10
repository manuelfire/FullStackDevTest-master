import { EMAIL_LOGIN } from '../../../redux/Email/email.types';

const dispatch = (socket, store, action) => {
  // dispatch an action with the store to the server
  socket.emit(action.type, action.payload);
};

export default {
  action: EMAIL_LOGIN,
  dispatch,
};