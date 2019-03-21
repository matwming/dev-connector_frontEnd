import setAuthToken from "../../util/setAuthToken";
import jwt_decode from "jwt-decode";
import isEmpty from "../../validation/isEmpty";
import { instance } from "../../config/config";
const initialState = {
 isAuthenticated: false,
 user: {}
};

//Action=> Register user
export const registerUser = (userData, history) => dispatch => {
 console.log(userData);
 //send post request and wait for response
 instance
  .post(`/api/users/register`, userData)
  .then(res => history.push("/login"))
  .catch(error => {
   console.log(error);
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   });
  });
};

//Action=> Login
export const loginUser = (userData, history) => dispatch => {
 instance
  .post(`/api/users/login`, userData)
  .then(res => {
   //save to localStorage
   const token = res.data.token;
   localStorage.setItem("devToken", token);
   //set to header
   setAuthToken(token);
   //Decode token to get user data
   const decoded = jwt_decode(token);
   //set current user
   dispatch(setCurrentUser(decoded));
   history.push("/dashboard");
  })
  .catch(error => {
   console.log(error);
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   });
  });
};

//Action=> Set Current User
export const setCurrentUser = decoded => {
 return {
  type: "SET_CURRENT_USER",
  userData: decoded
 };
};

//Action=> Logout
export const logoutUser = () => dispatch => {
 //remove token from localStorage
 localStorage.removeItem("devToken");
 //remove auth header
 setAuthToken(false);
 //set current user to empty
 dispatch(setCurrentUser());
};

//Reducer
export const authReducer = (state = initialState, action) => {
 switch (action.type) {
  case "register":
   return {
    ...state,
    user: action.data
   };
  case "SET_CURRENT_USER":
   return {
    ...state,
    isAuthenticated: !isEmpty(action.userData),
    user: action.userData
   };
  default:
   return state;
 }
};
