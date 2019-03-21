import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../store/reducers/profileReducer";
import Spinner from "../UI/Spinner";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileAction";
import Experience from "./experience";
import Education from "./education";
class Dashboard extends Component {
 state = {};
 componentDidMount() {
  this.props.getCurrentProfile();
 }
 onDelete(e) {
  this.props.deleteAccount();
 }
 render() {
  console.log(this.props);
  const { user } = this.props.auth;
  const { profile, loading } = this.props.profile;
  let dashBoardContent;
  if (profile === null || loading) {
   dashBoardContent = <Spinner />;
  } else {
   if (Object.keys(profile).length > 0) {
    dashBoardContent = (
     <div>
      <p className="lead text-muted">
       Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
      </p>
      <ProfileActions />
      <Experience />
      <Education />
      <MDBBtn
       color="unique"
       onClick={this.onDelete.bind(this)}
       style={{ marginTop: "10rem", borderRadius: "20px" }}
      >
       Delete Account
      </MDBBtn>
     </div>
    );
   } else {
    dashBoardContent = (
     <div>
      <p className="lead text-muted">Welcome {user.name}</p>
      <p> You have not setup a profile, please add some info</p>
      <Link to="/create-profile">
       {" "}
       <MDBBtn tag="a" size="lg" floating gradient="purple">
        <MDBIcon icon="pencil-alt" size="lg" />
       </MDBBtn>
      </Link>
     </div>
    );
   }
  }
  return (
   <MDBContainer>
    <MDBRow>
     <MDBCol>{dashBoardContent}</MDBCol>
    </MDBRow>
   </MDBContainer>
  );
 }
}
Dashboard.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired,
 deleteAccount: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  profile: state.profile,
  auth: state.auth
 };
};
export default connect(
 mapStateToProps,
 { getCurrentProfile, deleteAccount }
)(Dashboard);
