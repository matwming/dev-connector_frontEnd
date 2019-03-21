import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const OuterDiv = styled.div`
 .landing {
  position: relative;
  background: url("./showcase.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
 }
 .landing-inner {
  padding-top: 80px;
 }

 .dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
 }
`;

class Landing extends Component {
 state = {};
 componentDidMount() {
  if (this.props.auth.isAuthenticated) {
   this.props.history.push("/dashboard");
  }
 }
 render() {
  return (
   <OuterDiv>
    <div className="landing">
     <div className="dark-overlay landing-inner text-light">
      <div className="container">
       <div className="row">
        <div className="col-md-12 text-center">
         <Link to="/" style={{ color: "white" }}>
          <h1 className="display-3 mb-4">Developer Connector</h1>
         </Link>
         <p className="lead">
          {" "}
          Create a developer profile/portfolio, share posts and get help from other developers
         </p>
         <hr />
         <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign Up
         </Link>
         <Link to="/login" className="btn btn-lg btn-light">
          Login
         </Link>
        </div>
       </div>
      </div>
     </div>
    </div>
   </OuterDiv>
  );
 }
}

Landing.propTypes = {
 auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  auth: state.auth
 };
};
export default connect(mapStateToProps)(Landing);
