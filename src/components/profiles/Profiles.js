import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
import PropTypes from "prop-types";
import { getProfiles } from "../../store/reducers/profileReducer";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ProfileItem from "./ProfileItem";
class Profiles extends Component {
 state = {};
 componentDidMount() {
  this.props.getProfiles();
 }
 render() {
  console.log(this.props.profiles.profiles);
  const { profiles, loading } = this.props.profiles;
  let profileItems;
  if (profiles == null || loading) {
   profileItems = <Spinner />;
  } else {
   if (profiles.length > 0) {
    profileItems = <ProfileItem profile={this.props.profiles.profiles} />;
   } else {
    profileItems = <h4>No Profiles found...</h4>;
   }
  }
  return (
   <MDBContainer>
    <MDBRow>Develop Profiles</MDBRow>
    <p className="lead text-center">Browser and Connect with developers</p>
    {profileItems}
   </MDBContainer>
  );
 }
}
Profiles.propTypes = {
 getProfiles: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  profiles: state.profile
 };
};
export default connect(
 mapStateToProps,
 { getProfiles }
)(Profiles);
