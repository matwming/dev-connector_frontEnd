import React, { Component, Fragment } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGitHub from "./ProfileGitHub";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../store/reducers/profileReducer";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class Profile extends Component {
 componentDidMount() {
  const query = new URLSearchParams(this.props.location.search);
  const handle = query.get("name");
  console.log("profile", handle);
  if (handle) {
   this.props.getProfileByHandle(handle);
  }
 }
 componentDidUpdate() {
  if (this.props.profile.profile === null && this.props.profile.loading) {
   this.props.history.push("/not-found");
  }
 }
 render() {
  const { profile, loading } = this.props.profile;
  console.log(this.props.profile, loading);
  let profileContent;
  if (profile === null || loading) {
   profileContent = <Spinner />;
  } else {
   profileContent = (
    <MDBContainer>
     <MDBRow>
      <MDBCol md="6">
       <Link to="/profiles">Back To Profiles</Link>
      </MDBCol>
     </MDBRow>
     <MDBRow>
      <MDBCol size="12">
       <ProfileHeader profile={profile} />
       <ProfileAbout profile={profile} />
       <ProfileCreds education={profile.education} experience={profile.experience} />
       {profile.githubusername ? <ProfileGitHub username={profile.githubusername} /> : null}
      </MDBCol>
     </MDBRow>
    </MDBContainer>
   );
  }
  return <Fragment>{profileContent}</Fragment>;
 }
}
Profile.propType = {
 profile: PropTypes.object.isRequired,
 getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => {
 return {
  profile: state.profile
 };
};
export default connect(
 mapStateToProps,
 { getProfileByHandle }
)(Profile);
