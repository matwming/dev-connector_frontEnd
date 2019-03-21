import React, { Component, Fragment } from "react";
import {
 MDBNavbar,
 MDBNavbarBrand,
 MDBNavbarNav,
 MDBNavItem,
 MDBNavLink,
 MDBNavbarToggler,
 MDBCollapse,
 MDBFormInline
} from "mdbreact";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/reducers/authReducer";
import { clearCurrentProfile } from "../../store/reducers/profileReducer";
class NavbarPage extends Component {
 state = {
  isOpen: false
 };
 toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
 };
 logout() {
  this.props.clearCurrentProfile();
  this.props.logoutUser();
 }
 render() {
  const { isAuthenticated, user } = this.props.auth;
  const authLinks = (
   <Fragment>
    <MDBNavItem>
     <MDBNavLink to="/feed">Post Feed</MDBNavLink>
    </MDBNavItem>
    <MDBNavItem>
     <MDBNavLink to="/dashboard">Dashboard</MDBNavLink>
    </MDBNavItem>
    <MDBNavLink to="/dashboard" active>
     <img
      src={user ? user.avatar : ""}
      alt={user ? user.name : ""}
      title="You must have a Gravatar connected to your email to display an image"
      style={{ height: "25px", width: "25px", borderRadius: "20px" }}
     />
    </MDBNavLink>
    <MDBNavItem>
     <MDBNavLink to="/" onClick={() => this.logout()}>
      Logout
     </MDBNavLink>
    </MDBNavItem>
   </Fragment>
  );
  const guestLinks = (
   <Fragment>
    <MDBNavItem>
     <MDBNavLink to="/register" active>
      Sign Up
     </MDBNavLink>
    </MDBNavItem>
    <MDBNavItem>
     <MDBNavLink to="/login">Login</MDBNavLink>
    </MDBNavItem>
   </Fragment>
  );
  return (
   <MDBNavbar color="indigo" dark expand="md">
    <MDBNavbarBrand>
     <Link to="/">
      <strong className="white-text">DevConnector</strong>
     </Link>
    </MDBNavbarBrand>
    <MDBNavbarToggler onClick={this.toggleCollapse} />
    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
     <MDBNavbarNav left>
      <MDBNavItem>
       <MDBNavLink to="/" active>
        Home
       </MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
       <MDBNavLink to="/profiles">Developers</MDBNavLink>
      </MDBNavItem>
      {isAuthenticated ? authLinks : guestLinks}
     </MDBNavbarNav>
     <MDBNavbarNav right>
      <MDBNavItem>
       <MDBFormInline waves>
        <div className="md-form my-0">
         <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
         />
        </div>
       </MDBFormInline>
      </MDBNavItem>
     </MDBNavbarNav>
    </MDBCollapse>
   </MDBNavbar>
  );
 }
}
// Navbar.propTypes = {
//  logoutUser: PropTypes.func.isRequired,
//  auth: PropTypes.object.isRequired
// };
const mapStateToProps = state => {
 return {
  auth: state.auth,
  errors: state.errors
 };
};
export default connect(
 mapStateToProps,
 { logoutUser, clearCurrentProfile }
)(NavbarPage);
