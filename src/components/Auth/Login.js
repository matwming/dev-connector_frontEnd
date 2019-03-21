import React, { Component } from "react";
import {
 MDBContainer,
 MDBRow,
 MDBCol,
 MDBCard,
 MDBCardBody,
 MDBModalFooter,
 MDBIcon,
 MDBCardHeader,
 MDBBtn,
 MDBInput
} from "mdbreact";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../store/reducers/authReducer";
import PropTypes from "prop-types";
class Login extends Component {
 constructor() {
  super();
  this.state = {
   email: "",
   password: "",

   error: {},
   loading: false
  };
 }
 componentDidMount() {
  if (this.props.auth.isAuthenticated) {
   this.props.history.push("/dashboard");
  }
 }
 handleInput = event => {
  this.setState({
   [event.target.name]: event.target.value
  });
 };
 submit(e) {
  e.preventDefault();
  e.target.className += " was-validated";
  this.setState({
   loading: true
  });
  let newUser = {
   email: this.state.email,
   password: this.state.password
  };
  console.log(newUser);
  const history = this.props.history;
  this.props.loginUser(newUser, history);
 }
 render() {
  return (
   <MDBContainer>
    <MDBRow>
     <MDBCol md="6" lg="12">
      <MDBCard>
       <MDBCardBody>
        <MDBCardHeader className="form-header warm-flame-gradient  rounded">
         <h3 className="my-3" style={{ textAlign: "center", color: "white" }}>
          <MDBIcon icon="lock" /> Login:
         </h3>
         <p style={{ color: "white", textAlign: "center" }}>Create your DevConnector account</p>
        </MDBCardHeader>

        <form noValidate className="needs-validation" onSubmit={this.submit.bind(this)}>
         <div className="grey-text">
          <MDBInput
           label="Your email"
           icon="envelope"
           group
           type="email"
           validate
           error="wrong"
           success="right"
           name="email"
           value={this.state.email}
           onInput={this.handleInput}
           required
          >
           <div className="invalid-feedback">{this.props.errors.errors.email}</div>
          </MDBInput>
          <MDBInput
           label="Your password"
           icon="lock"
           group
           type="password"
           validate
           name="password"
           value={this.state.password}
           onInput={this.handleInput}
           required
          >
           <div className="invalid-feedback">{this.props.errors.errors.password}</div>
          </MDBInput>
         </div>

         <div className="text-center mt-4">
          <MDBBtn
           color="deep-orange"
           className="mb-3"
           type="submit"
           disabled={this.state.loading ? true : false}
          >
           {this.state.loading ? <Spinner /> : "Submit"}
          </MDBBtn>
         </div>
        </form>

        <MDBModalFooter>
         <div className="font-weight-light">
          <p>Not a member? Sign Up</p>
          <p>Forgot Password?</p>
         </div>
        </MDBModalFooter>
       </MDBCardBody>
      </MDBCard>
     </MDBCol>
    </MDBRow>
   </MDBContainer>
  );
 }
}
Login.propTypes = {
 loginUser: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  auth: state.auth,
  errors: state.errors
 };
};
// const mapDispatchToProps = () => {
//  return {
//   loginUser: loginUser
//  };
// };
export default connect(
 mapStateToProps,
 { loginUser }
)(withRouter(Login));
