import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment } from "../../store/reducers/postReducer";
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
class CommentForm extends Component {
 state = {
  text: "",
  errors: ""
 };
 submit(e) {
  e.preventDefault();
  e.target.className += " was-validated";
  const { user } = this.props.auth;

  const newComment = {
   text: this.state.text,
   name: user.name,
   avatar: user.avatar
  };

  this.props.addComment(this.props.postId, newComment);
  this.setState({ text: "" });
 }
 handleInput(e) {
  this.setState({
   [e.target.name]: e.target.value
  });
 }
 render() {
  console.log(this.props.post);
  return (
   <MDBRow>
    <MDBCol md="12">
     <MDBCard news className="my-5">
      <MDBCardBody>
       <div className="card-header bg-info text-white">make a comment</div>
       <form onSubmit={this.submit.bind(this)} noValidate className="needs-validation">
        <MDBInput
         type="textarea"
         label="replay to this post"
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

CommentForm.propTypes = {
 addComment: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  errors: state.errors,
  auth: state.auth,
  post: state.post
 };
};
export default connect(
 mapStateToProps,
 { addComment }
)(withRouter(CommentForm));
