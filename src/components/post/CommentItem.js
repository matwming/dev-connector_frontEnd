import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../store/reducers/postReducer";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from "mdbreact";
class CommentItem extends Component {
 onDelete(postId, commentId) {
  this.props.deleteComment(postId, commentId);
 }
 render() {
  const { comment, postId, auth } = this.props;

  return (
   <MDBCard>
    <MDBCardBody>
     <MDBRow>
      <MDBCol md="2">
       <a>
        <img src={comment.avatar} alt="" />
       </a>
       <br />
       <p className="text-center">{comment.name}</p>
      </MDBCol>
      <MDBCol md="10">
       <p className="lead">{comment.text}</p>
       {comment.user === auth.user.id ? (
        <MDBBtn onClick={this.onDelete.bind(this, postId, comment._id)}>
         Delete <i className="fas fa-times" />
        </MDBBtn>
       ) : null}
      </MDBCol>
     </MDBRow>
    </MDBCardBody>
   </MDBCard>
  );
 }
}
CommentItem.propTypes = {
 deleteComment: PropTypes.func.isRequired,
 comment: PropTypes.object.isRequired,
 postId: PropTypes.string.isRequired,
 auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
 return {
  auth: state.auth
 };
};
export default connect(
 mapStateToProps,
 { deleteComment }
)(CommentItem);
