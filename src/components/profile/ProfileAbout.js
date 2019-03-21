import React, { Component } from "react";
import {
 MDBContainer,
 MDBRow,
 MDBCol,
 MDBCard,
 MDBCardImage,
 MDBCardBody,
 MDBCardText,
 MDBBtn,
 MDBCardTitle
} from "mdbreact";
import PropTypes from "prop-types";
import isEmpty from "../../validation/isEmpty";
import uuid from "uuid";

class ProfileAbout extends Component {
 render() {
  const { profile } = this.props;
  //get first name
  const firstName = profile.user.name.trim().split(" ")[0];
  //skills list
  const skills = profile.skills.map((skill, index) => (
   <div key={uuid.v4()} className="p-3">
    <i className="fa fa-check" />
    {skill}
   </div>
  ));
  return (
   <MDBRow>
    <MDBCol md="12">
     <MDBCard>
      <MDBCardBody>
       <h3 className="text-center text-info">{firstName.toUpperCase()}'s Bio</h3>
       <p className="lead">
        {isEmpty(profile.bio) ? (
         <p className="text-center">{firstName} does not have an bio</p>
        ) : (
         <span>{profile.bio}</span>
        )}
       </p>
       <hr />
       <h3 className="text-center text-info">Skill Set</h3>
       <div className="d-flex flex-wrap justify-content-center align-items-center">{skills}</div>
      </MDBCardBody>
     </MDBCard>
    </MDBCol>
   </MDBRow>
  );
 }
}
export default ProfileAbout;
