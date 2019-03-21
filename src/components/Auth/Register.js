import React, { Component } from "react";
import PropTypes from "prop-types";
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
import { registerUser } from "../../store/reducers/authReducer";
import { withRouter } from "react-router-dom";
import { timingSafeEqual } from "crypto";
class Register extends Component {
 constructor() {
  super();
  this.state = {
   name: "",
   email: "",
   password: "",
   password2: "",
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
   name: this.state.name,
   email: this.state.email,
   password: this.state.password,
   password2: this.state.password2
  };
  console.log(newUser);
  const history = this.props.history;
  this.props.registerUser(newUser, history);
 }
 render() {
  const { user } = this.props.auth;
  const { errors } = this.props;
  console.log("user", user);
  return (
   <MDBContainer>
    <MDBRow>
     <MDBCol md="6" lg="12">
      <MDBCard>
       <MDBCardBody>
        <MDBCardHeader className="form-header deep-blue-gradient rounded">
         <h3 className="my-3" style={{ textAlign: "center", color: "white" }}>
          <MDBIcon icon="lock" /> Sign Up:
         </h3>
         <p style={{ color: "white", textAlign: "center" }}>Create your DevConnector account</p>
        </MDBCardHeader>

        <form noValidate className="needs-validation" onSubmit={this.submit.bind(this)}>
         <div className="grey-text">
          <MDBInput
           label="Your Name"
           icon="grin"
           group
           type="text"
           validate={true}
           value={this.state.name}
           name="name"
           onInput={this.handleInput}
           required
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.name}</div>
           ) : null}
          </MDBInput>
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
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.email}</div>
           ) : null}
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
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.password}</div>
           ) : null}
          </MDBInput>
          <MDBInput
           label="Confirm password"
           icon="lock"
           group
           type="password"
           validate
           error="holy shit"
           name="password2"
           value={this.state.password2}
           onInput={this.handleInput}
           required
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.password2}</div>
           ) : null}
          </MDBInput>
         </div>

         <div className="text-center mt-4">
          <MDBBtn
           color="light-blue"
           className="mb-3"
           type="submit"
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
Register.propTypes = {
 registerUser: PropTypes.func.isRequired,
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
//   registerUser: () => registerUser()
//  };
// };
export default connect(
 mapStateToProps,
 { registerUser }
)(withRouter(Register));
