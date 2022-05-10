export const dispatch = (action, data, dispatch) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: data,
    });
  };
  
  export default {
    action: 'NEW_MESSAGE',
    dispatch,
  };