import { instance } from "../../config/config";

let initialState = {
 profile: null,
 profiles: null,
 loading: false
};
//Action=>
export const getCurrentProfile = () => dispatch => {
 console.log("getCurrentProfile");
 dispatch(setProfileLoading());
 instance
  .get("/api/profile")
  .then(res =>
   dispatch({
    type: "GET_PROFILE",
    data: res.data
   })
  )
  .catch(error =>
   dispatch({
    type: "GET_PROFILE",
    data: {}
   })
  );
};
//Action=> getProfileByHandle
export const getProfileByHandle = handle => dispatch => {
 console.log("getProfileByHandle");
 dispatch(setProfileLoading());
 instance
  .get(`/api/profile/handle/${handle}`)
  .then(res =>
   dispatch({
    type: "GET_PROFILE",
    data: res.data
   })
  )
  .catch(error =>
   dispatch({
    type: "GET_PROFILE",
    data: null
   })
  );
};
//Action=>
export const setProfileLoading = () => {
 return {
  type: "PROFILE_LOADING"
 };
};
//Action=>
export const clearCurrentProfile = () => {
 return {
  type: "CLEAR_CURRENT_PROFILE"
 };
};
//Action=> Create Profile
export const createProfile = (profileData, history) => dispatch => {
 console.log("createProfile", profileData);
 instance
  .post("/api/profile", profileData)
  .then(res => history.push("/dashboard"))
  .catch(error =>
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   })
  );
};

//Action=> Delete Account
export const deleteAccount = () => dispatch => {
 if (window.confirm("Are you sure? This can NOT be UNDONE"))
  instance
   .delete("/api/profile")
   .then(res =>
    dispatch({
     type: "SET_CURRENT_USER",
     userData: {}
    })
   )
   .catch(error => {
    dispatch({
     type: "GET_ERRORS",
     errors: error.response.data
    });
   });
};

//Action=> Edit User Profile
export const editUserProfile = profileData => {
 console.log(profileData.target.value);
 console.log(profileData.target.name);
 return {
  type: "EDIT_USER_PROFILE",
  profileName: profileData.target.name,
  profileValue: profileData.target.value
 };
};

//Action=> Add experience
export const addExperience = (expData, history) => dispatch => {
 instance
  .post("/api/profile/experience", expData)
  .then(res => history.push("/dashboard"))
  .catch(error =>
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   })
  );
};
//Action=> Add experience
export const addEducation = (eduData, history) => dispatch => {
 instance
  .post("/api/profile/education", eduData)
  .then(res => history.push("/dashboard"))
  .catch(error =>
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   })
  );
};
//Action=> Delete experience
export const deleteExperience = id => dispatch => {
 instance
  .delete(`/api/profile/experience/${id}`)
  .then(res =>
   dispatch({
    type: "GET_PROFILE",
    data: res.data
   })
  )
  .catch(error =>
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   })
  );
};
//Action=> Delete education
export const deleteEducation = id => dispatch => {
 instance
  .delete(`/api/profile/education/${id}`)
  .then(res =>
   dispatch({
    type: "GET_PROFILE",
    data: res.data
   })
  )
  .catch(error =>
   dispatch({
    type: "GET_ERRORS",
    errors: error.response.data
   })
  );
};
//Action=> Get all profiles
export const getProfiles = () => dispatch => {
 dispatch(setProfileLoading());
 instance
  .get("/api/profile/all")
  .then(res =>
   dispatch({
    type: "GET_PROFILES",
    data: res.data
   })
  )
  .catch(error =>
   dispatch({
    type: "GET_PROFILES",
    data: null
   })
  );
};
//Reducer
export const profileReducer = (state = initialState, action) => {
 switch (action.type) {
  case "GET_PROFILE":
   return {
    ...state,
    loading: false,
    profile: action.data
   };
  case "PROFILE_LOADING":
   return {
    ...state,
    loading: true
   };
  case "PROFILE_NOT_FOUND":
   return {
    ...state,
    errors: action.errors
   };
  case "CLEAR_CURRENT_PROFILE":
   return {
    ...state,
    profile: null
   };
  case "EDIT_USER_PROFILE":
   console.log(action.profileName, action.profileValue);
   let name = action.profileName;
   let value = action.profileValue;
   let oldProfile = { ...state.profile };
   oldProfile[name] = value;

   console.log(oldProfile);
   console.log(state.profile);
   return {
    ...state,
    profile: oldProfile
   };
  case "GET_PROFILES":
   return {
    ...state,
    profiles: action.data,
    loading: false
   };
  default:
   return state;
 }
};
