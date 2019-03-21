import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import setAuthToken from "./util/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/reducers/authReducer";
import store from "./store/store";
import Dashboard from "./components/dashboard/dashboard";
import { clearCurrentProfile } from "./store/reducers/profileReducer";
import PrivateRoute from "./components/privateRoutes";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/edit-profile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/profile";
import NotFound from "./components/NotFound/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.getItem("devToken")) {
 setAuthToken(localStorage.getItem("devToken"));
 const decoded = jwt_decode(localStorage.getItem("devToken"));
 store.dispatch(setCurrentUser(decoded));
 //check for expired token
 const currentTime = Date.now() / 1000;
 if (decoded.exp < currentTime) {
  store.dispatch(logoutUser());
  //clear current profile
  store.dispatch(clearCurrentProfile());
  //redirect to home page
  window.location.href = "/";
 }
}
class App extends Component {
 render() {
  return (
   <div>
    <NavBar />
    <Route exact path="/" component={Landing} />
    <div style={{ marginTop: "3rem", marginBottom: "10rem" }}>
     <Route exact path="/register" component={Register} />
     <Route exact path="/login" component={Login} />
     <Route exact path="/profile/developer/" component={Profile} />
     <Route exact path="/profiles" component={Profiles} />

     <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
      <PrivateRoute exact path="/feed" component={Posts} />
      <PrivateRoute exact path="/post/:id" component={Post} />
     </Switch>
     <Route exact path="/not-found" component={NotFound} />
    </div>

    <Footer />
   </div>
  );
 }
}

export default App;
