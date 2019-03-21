import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
 MDBContainer,
 MDBRow,
 MDBCol,
 MDBCard,
 MDBCardBody,
 MDBIcon,
 MDBCardHeader,
 MDBBtn,
 MDBInput,
 MDBSwitch
} from "mdbreact";
import Spinner from "../UI/Spinner";
import SelectListGroup from "../UI/SelectListGroup";
import styled from "styled-components";
import { createProfile } from "../../store/reducers/profileReducer";
import { withRouter } from "react-router-dom";
const P = styled.p`
 font-size: 1.2rem;
 margin-top: 0.5rem;
 :hover {
  color: #4285f4;
 }
`;
class CreateProfile extends Component {
 state = {
  displaySocialInputs: false,
  handle: "",
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
  errors: {},
  options: [
   {
    value: "0",
    label: "*Select your Professional Status"
   },
   {
    value: "1",
    label: "Developer"
   },
   {
    value: "2",
    label: "Junior Developer"
   },
   {
    value: "3",
    label: "Senior Developer"
   },
   {
    value: "4",
    label: "Manager"
   },
   {
    value: "5",
    label: "Student"
   },
   {
    value: "6",
    label: "Instructor or Teacher"
   },
   {
    value: "7",
    label: "Intern"
   },
   {
    value: "8",
    label: "Other"
   }
  ]
 };
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
  let newProfile = {
   handle: this.state.handle,
   company: this.state.company,
   website: this.state.website,
   location: this.state.location,
   status: this.state.status,
   skills: this.state.skills,
   githubusername: this.state.githubusername,
   bio: this.state.bio,
   twitter: this.state.twitter,
   facebook: this.state.facebook,
   linkedin: this.state.linkedin,
   youtube: this.state.youtube,
   instagram: this.state.instagram
  };
  console.log(newProfile);
  const history = this.props.history;
  this.props.createProfile(newProfile, history);
 }

 render() {
  //console.log("displaySocialInput", this.state.displaySocialInputs);
  let socialInputs;
  if (this.state.displaySocialInputs) {
   socialInputs = (
    <Fragment>
     <MDBInput
      label="Twitter"
      icon="twitter-square"
      iconBrand
      group
      type="text"
      validate
      name="bio"
      value={this.state.twitter}
      onInput={this.handleInput}
     >
      {this.props.errors.errors ? (
       <div className="invalid-feedback">{this.props.errors.errors.twitter}</div>
      ) : null}
     </MDBInput>
     <MDBInput
      label="Facebook"
      icon="facebook-square"
      iconBrand
      group
      type="text"
      validate
      name="bio"
      value={this.state.facebook}
      onInput={this.handleInput}
     >
      {this.props.errors.errors ? (
       <div className="invalid-feedback">{this.props.errors.errors.facebook}</div>
      ) : null}
     </MDBInput>
     <MDBInput
      label="Youtube"
      icon="youtube-square"
      iconBrand
      group
      type="text"
      validate
      name="bio"
      value={this.state.youtube}
      onInput={this.handleInput}
     >
      {this.props.errors.errors ? (
       <div className="invalid-feedback">{this.props.errors.errors.youtube}</div>
      ) : null}
     </MDBInput>
     <MDBInput
      label="Instagram"
      icon="instagram"
      iconBrand
      group
      type="text"
      validate
      name="bio"
      value={this.state.facebook}
      onInput={this.handleInput}
     >
      {this.props.errors.errors ? (
       <div className="invalid-feedback">{this.props.errors.errors.instagram}</div>
      ) : null}
     </MDBInput>
    </Fragment>
   );
  }
  return (
   <MDBContainer>
    <MDBRow>
     <MDBCol md="6" lg="12">
      <MDBCard>
       <MDBCardBody>
        <MDBCardHeader className="form-header deep-blue-gradient rounded">
         <h3 className="my-3" style={{ textAlign: "center", color: "white" }}>
          <MDBIcon icon="pencil-alt" /> Create Your Profile
         </h3>
         <p className="lead text-center">Let other people know you better</p>
        </MDBCardHeader>

        <form noValidate className="needs-validation" onSubmit={this.submit.bind(this)}>
         <div className="grey-text">
          <MDBInput
           label="* Profile Handle"
           icon="grin"
           group
           type="text"
           validate={true}
           value={this.state.handle}
           name="handle"
           onInput={this.handleInput}
           required
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.handle}</div>
           ) : null}
          </MDBInput>
          <SelectListGroup
           options={this.state.options}
           name="status"
           onChange={this.handleInput}
           error={this.props.errors.status}
           info="Give us an idea of where you are at in your career"
          />
          <MDBInput
           label="Company"
           icon="lock"
           group
           type="text"
           validate
           name="company"
           value={this.state.company}
           onInput={this.handleInput}
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.company}</div>
           ) : null}
          </MDBInput>
          <MDBInput
           label="Website"
           icon="lock"
           group
           type="text"
           validate
           name="website"
           value={this.state.website}
           onInput={this.handleInput}
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.website}</div>
           ) : null}
          </MDBInput>
          <small className="form-text text-muted" style={{ marginTop: "-2rem" }}>
           Could be your own website or a Company one
          </small>
          <MDBInput
           label="Location"
           icon="lock"
           group
           type="text"
           validate
           name="location"
           value={this.state.location}
           onInput={this.handleInput}
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.location}</div>
           ) : null}
          </MDBInput>
          <small className="form-text text-muted" style={{ marginTop: "-2rem" }}>
           City or State{" "}
          </small>
          <MDBInput
           label="Skills"
           icon="lock"
           group
           type="text"
           validate
           name="skills"
           value={this.state.skills}
           onInput={this.handleInput}
           required
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.skills}</div>
           ) : null}
          </MDBInput>
          <small className="form-text text-muted" style={{ marginTop: "-1.5rem" }}>
           Please use comma separated values (el. HTML,CSS,JavaScript,PHP)
          </small>
          <MDBInput
           label="Github Username"
           icon="lock"
           group
           type="text"
           validate
           name="githubusername"
           value={this.state.githubusername}
           onInput={this.handleInput}
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.githubusername}</div>
           ) : null}
          </MDBInput>
          <small className="form-text text-muted" style={{ marginTop: "-2rem" }}>
           A real coder must have a Github. Are you a real Coder?
          </small>
          <MDBInput
           label="Short Bio"
           icon="pencil-alt"
           group
           type="textarea"
           validate
           name="bio"
           value={this.state.bio}
           onInput={this.handleInput}
          >
           {this.props.errors.errors ? (
            <div className="invalid-feedback">{this.props.errors.errors.bio}</div>
           ) : null}
          </MDBInput>
          <small className="form-text text-muted" style={{ marginTop: "-2rem" }}>
           Please tell me your story. I would like to hear.
          </small>
         </div>
         <div className="mb-3">
          <P>Do you want to show Social Network Links?</P>
          <MDBSwitch
           checked={this.state.displaySocialInputs}
           onChange={() =>
            this.setState({
             displaySocialInputs: !this.state.displaySocialInputs
            })
           }
          />
         </div>
         {socialInputs}
         <div className="text-center mt-4">
          <MDBBtn
           color="light-blue"
           className="mb-3"
           type="submit"
           disabled={this.state.loading ? true : false}
          >
           {this.state.loading ? <Spinner /> : "Submit"}
          </MDBBtn>
         </div>
        </form>
       </MDBCardBody>
      </MDBCard>
     </MDBCol>
    </MDBRow>
   </MDBContainer>
  );
 }
}
CreateProfile.propTypes = {
 profile: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  profile: state.profile,
  errors: state.errors
 };
};
export default connect(
 mapStateToProps,
 { createProfile }
)(withRouter(CreateProfile));
