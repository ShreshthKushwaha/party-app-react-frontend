
const initialState = {
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.payload.userId,
        };
      case 'LOGOUT':
        return {
          ...state,
          userId: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  