export const dispatch = (action, data, dispatch) => {
    dispatch({
      type: 'IO_ERROR',
      payload: data,
    });
  };
  
  export default {
    action: 'IO_ERROR',
    dispatch,
  };