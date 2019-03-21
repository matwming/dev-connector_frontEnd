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
import isEmpty from "../../validation/isEmpty";
import ProfileItem from "../profiles/ProfileItem";
class ProfileHeader extends Component {
 render() {
  const { profile } = this.props;
  console.log(profile);
  return (
   <MDBContainer style={{ backgroundColor: "#35ACC2", borderRadius: "20px", padding: "1rem" }}>
    <MDBRow>
     <div className="m-auto">
      <img
       src={profile.user.avatar}
       alt=""
       className="rounded-circle"
       height="150px"
       width="150px"
      />
     </div>
    </MDBRow>
    <MDBRow>
     <MDBCol>
      <div className="display-b text-center">
       <h1> {profile.user.name}</h1>
       <h1> {profile.status}</h1>
       <p> {isEmpty(profile.company) ? null : <span>{profile.company}</span>}</p>
       <p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
      </div>
     </MDBCol>
    </MDBRow>
    <MDBRow>
     <MDBCol>
      <div className="text-center p-14">
       {isEmpty(profile.website) ? null : (
        <a className="text-white p-2" href={profile.website} target="_blank">
         <i className="fas fa-globe fa-2x" />
        </a>
       )}
       {isEmpty(profile.social && profile.social.twitter) ? null : (
        <a className="text-white p-2" href={profile.social.twitter} target="_blank">
         <i className="fab fa-twitter fa-2x" />
        </a>
       )}
       {isEmpty(profile.social && profile.social.facebook) ? null : (
        <a className="text-white p-2" href={profile.social.facebook} target="_blank">
         <i className="fab fa-facebook fa-2x" />
        </a>
       )}
       {isEmpty(profile.social && profile.social.youtube) ? null : (
        <a className="text-white p-2" href={profile.social.youtube} target="_blank">
         <i className="fab fa-youtube fa-2x" />
        </a>
       )}
       {isEmpty(profile.social && profile.social.instagram) ? null : (
        <a className="text-white p-2" href={profile.social.instagram} target="_blank">
         <i className="fab fa-instagram fa-2x" />
        </a>
       )}
      </div>
     </MDBCol>
    </MDBRow>
   </MDBContainer>
  );
 }
}
export default ProfileHeader;
