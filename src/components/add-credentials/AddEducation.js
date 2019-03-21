import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
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
 MDBDatePicker
} from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
import { addEducation } from "../../store/reducers/profileReducer";
class AddEducation extends Component {
 state = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  current: false,
  description: "",
  errors: {},
  disabled: false,
  isCurrentJob: false,
  loading: false
 };
 getPickerValue = value => {
  console.log(value);
  this.setState({
   from: value
  });
 };
 submit(e) {
  e.preventDefault();
  e.target.className += " was-validated";
  const eduData = {
   school: this.state.school,
   degree: this.state.degree,
   fieldofstudy: this.state.fieldofstudy,
   from: this.state.from,
   to: this.state.to,
   description: this.state.description,
   disabled: this.state.disabled
  };
  console.log(eduData);
  this.props.addEducation(eduData, this.props.history);
 }
 isCurrentJob() {
  console.log("clicked");
  this.setState({
   isCurrentJob: !this.state.isCurrentJob
  });
 }
 handleInput = e => {
  this.setState({
   [e.target.name]: e.target.value
  });
 };
 render() {
  console.log(this.props.errors.errors);
  return (
   <MDBContainer>
    <Fragment>
     <Link to="/dashboard" className="btn btn-light" style={{ marginBottom: "2.5rem" }}>
      Go Back
     </Link>
     <MDBRow>
      <MDBCol md="6" lg="12">
       <MDBCard>
        <MDBCardBody>
         <MDBCardHeader className="form-header warm-flame-gradient  rounded">
          <h3 className="my-3" style={{ textAlign: "center", color: "white" }}>
           <MDBIcon icon="lock" /> Add Education
          </h3>

          <small className="d-block pb-3">
           Add any job or position that you have had in the past or current
          </small>
         </MDBCardHeader>

         <form noValidate className="needs-validation" onSubmit={this.submit.bind(this)}>
          <div className="grey-text">
           <MDBInput
            label="School"
            icon="envelope"
            group
            type="email"
            validate
            error="wrong"
            success="right"
            name="school"
            value={this.state.company}
            onInput={this.handleInput}
            required
           >
            <div className="invalid-feedback">{this.props.errors.errors.school}</div>
           </MDBInput>
           <MDBInput
            label="Degree or Certification"
            icon="lock"
            group
            type="text"
            validate
            name="degree"
            value={this.state.degree}
            onInput={this.handleInput}
            required
           >
            <div className="invalid-feedback">{this.props.errors.errors.degree}</div>
           </MDBInput>
           <MDBInput
            label="Field of Study"
            icon="lock"
            group
            type="text"
            validate
            name="fieldofstudy"
            value={this.state.location}
            onInput={this.handleInput}
           >
            <div className="invalid-feedback">{this.props.errors.errors.fieldofstudy}</div>
           </MDBInput>

           <MDBRow>
            <MDBCol md="2" middle>
             From Date:
            </MDBCol>
            <MDBCol md="4">
             {" "}
             <MDBDatePicker getValue={this.getPickerValue} onInputChange={e => console.log(e)}>
              <div className="invalid-feedback">{this.props.errors.errors.from}</div>
             </MDBDatePicker>
            </MDBCol>
            <MDBCol md="2" middle>
             To Date:
            </MDBCol>
            <MDBCol md="4">
             {" "}
             <MDBDatePicker getValue={this.getPickerValue} disabled={this.state.isCurrentJob}>
              <div className="invalid-feedback">{this.props.errors.errors.password}</div>
             </MDBDatePicker>
            </MDBCol>
           </MDBRow>
           <MDBInput
            label="Current Job"
            type="checkbox"
            checked={this.state.isCurrentJob}
            onChange={this.isCurrentJob.bind(this)}
            id="isCurrentJob"
           />
           <MDBInput
            label="Program Description"
            icon="lock"
            group
            type="textarea"
            validate
            name="text"
            value={this.state.description}
            onInput={this.handleInput}
           >
            <div className="invalid-feedback">{this.props.errors.errors.description}</div>
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
        </MDBCardBody>
       </MDBCard>
      </MDBCol>
     </MDBRow>
    </Fragment>
   </MDBContainer>
  );
 }
}
AddEducation.propTypes = {
 addEducation: PropTypes.func.isRequired,
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
 { addEducation }
)(withRouter(AddEducation));
