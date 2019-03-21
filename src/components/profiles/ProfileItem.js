import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
import uuid from "uuid";
import {
 MDBContainer,
 MDBRow,
 MDBBtn,
 MDBIcon,
 MDBRotatingCard,
 MDBAvatar,
 MDBCard,
 MDBCardBody,
 MDBCardUp,
 MDBCol
} from "mdbreact";
class ProfileItem extends Component {
 state = {
  flipped: false
 };

 handleFlipping = () => {
  this.setState({ flipped: !this.state.flipped });
 };

 render() {
  const { profile } = this.props;
  console.log(profile);
  const colStyle = { maxWidth: "22rem" };
  let profileDetail = profile.map(profile => {
   return (
    <MDBCol md="4" style={{ minHeight: "26rem" }} key={uuid.v4()}>
     <MDBRotatingCard
      flipped={this.state.flipped}
      className="text-center h-100 w-100"
      style={colStyle}
     >
      <MDBCard className="face front">
       <MDBCardUp>
        <img
         className="card-img-top"
         src="https://mdbootstrap.com/img/Photos/Others/photo7.jpg"
         alt=""
        />
       </MDBCardUp>
       <MDBAvatar className="mx-auto white" circle>
        <img
         src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg"
         alt=""
         className="rounded-circle"
        />
       </MDBAvatar>
       <MDBCardBody>
        <h4 className="font-weight-bold mb-3">{profile.user.name}</h4>
        <p className="font-weight-bold blue-text">Web developer</p>
        <p className="font-weight-bold blue-text">
         {profile.user.company ? "working at" + profile.user.company : "self-employed"}
        </p>
        <p className="font-weight-bold ">
         {profile.user.location ? "living at" + profile.user.location : "Location is not visible"}
        </p>
        <Link to={`/profile/developer/?name=${profile.handle}`}>
         <p className="font-weight-bold ">
          {" "}
          <MDBBtn>View Profiles</MDBBtn>
         </p>
        </Link>
        <a href="#!" className="rotate-btn" data-card="card-1" onClick={this.handleFlipping}>
         <MDBIcon icon="redo" /> Click here to rotate
        </a>
       </MDBCardBody>
      </MDBCard>
      <MDBCard className="face back">
       <MDBCardBody>
        <h4 className="font-weight-bold">About me</h4>
        <hr />

        <p>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quae, dolores dicta.
         Blanditiis rem amet repellat, dolores nihil quae in mollitia asperiores ut rerum
         repellendus, voluptatum eum, officia laudantium quaerat?
        </p>
        <h4>Skills Set</h4>
        <ul className="list-group">
         {profile.skills.slice(0, 4).map((skill, index) => {
          return (
           <li key={uuid.v4()} className="list-group-item">
            <i className="fa fa-check pr-1">{skill}</i>
           </li>
          );
         })}
        </ul>
        <hr />
        <ul className="list-inline py-2">
         <li className="list-inline-item">
          <a href="#!" className="p-2 fa-lg fb-ic">
           <MDBIcon icon="facebook" brand />
          </a>
         </li>
         <li className="list-inline-item">
          <a href="#!" className="p-2 fa-lg tw-ic">
           <MDBIcon icon="twitter" brand />
          </a>
         </li>
         <li className="list-inline-item">
          <a href="#!" className="p-2 fa-lg gplus-ic">
           <MDBIcon icon="google-plus" brand />
          </a>
         </li>
         <li className="list-inline-item">
          <a href="#!" className="p-2 fa-lg li-ic">
           <MDBIcon icon="linkedin" brand />
          </a>
         </li>
        </ul>
        <a href="#!" className="rotate-btn" data-card="card-1" onClick={this.handleFlipping}>
         <MDBIcon icon="undo" /> Click here to rotate back
        </a>
       </MDBCardBody>
      </MDBCard>
     </MDBRotatingCard>
    </MDBCol>
   );
  });

  ProfileItem.propType = {
   profile: PropTypes.object.isRequired
  };
  return (
   <MDBContainer>
    <MDBRow>{profileDetail}</MDBRow>
   </MDBContainer>
  );
 }
}
export default ProfileItem;
