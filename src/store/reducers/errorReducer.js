const initialState = {
 errors: ""
};

//Reducer
export const errorReducer = (state = initialState, action) => {
 switch (action.type) {
  case "GET_ERRORS":
   return {
    ...state,
    errors: action.errors
   };
  case "CLEAR_ERRORS":
   return {
    ...state,
    errors: null
   };
  default:
   return state;
 }
};
