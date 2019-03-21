import React from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBIcon } from "mdbreact";
const ProfileAction = () => {
 return (
  <div>
   <Link to="/edit-profile">
    <MDBBtn color="info" style={{ borderRadius: "20px" }}>
     <MDBIcon icon="user-edit"> Edit Profile</MDBIcon>
    </MDBBtn>
   </Link>
   <Link to="/add-experience">
    <MDBBtn color="info" style={{ borderRadius: "20px" }}>
     <MDBIcon icon="user-alt"> Add Experience</MDBIcon>
    </MDBBtn>
   </Link>
   <Link to="/add-education">
    <MDBBtn color="info" style={{ borderRadius: "20px" }}>
     <MDBIcon icon="university"> Add Education</MDBIcon>
    </MDBBtn>
   </Link>
  </div>
 );
};

export default ProfileAction;
