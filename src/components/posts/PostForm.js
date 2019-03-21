import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../store/reducers/postReducer";
import {
 MDBRow,
 MDBCard,
 MDBCardBody,
 MDBIcon,
 MDBBtn,
 MDBCol,
 MDBCardImage,
 MDBInput
} from "mdbreact";
import { withRouter } from "react-router-dom";
class PostForm extends Component {
 state = {
  text: "",
  errors: ""
 };
 submit(e) {
  e.preventDefault();
  e.target.className += " was-validated";
  const { user } = this.props.auth;
  const newPost = {
   text: this.state.text,
   name: user.name,
   avatar: user.avatar
  };
  this.props.addPost(newPost, this.props.history);
  this.setState({ text: "" });
 }
 handleInput(e) {
  this.setState({
   [e.target.name]: e.target.value
  });
 }
 render() {
  const { errors } = this.props;
  return (
   <MDBRow>
    <MDBCol md="12">
     <MDBCard news className="my-5">
      <MDBCardBody>
       <div className="card-header bg-info text-white">say something</div>
       <form onSubmit={this.submit.bind(this)} noValidate className="needs-validation">
        <MDBInput
         type="textarea"
         label="create a post"
         rows="4"
         style={{ padding: "1rem", height: "4rem", overflow: "scroll", width: "90%" }}
         icon="pencil-alt"
         name="text"
         value={this.state.text}
         onInput={this.handleInput.bind(this)}
        />

        <MDBBtn type="submit" color="primary">
         Submit
        </MDBBtn>
       </form>
      </MDBCardBody>
     </MDBCard>
    </MDBCol>
   </MDBRow>
  );
 }
}

PostForm.propTypes = {
 addPost: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  errors: state.errors,
  auth: state.auth
 };
};
export default connect(
 mapStateToProps,
 { addPost }
)(withRouter(PostForm));
