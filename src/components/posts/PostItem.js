import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { MDBCardBody, MDBCard, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import { deletePost, getPosts, addLike, removeLike } from "../../store/reducers/postReducer";
class PostItem extends Component {
 onDelete(id) {
  console.log("clicked");
  this.props.deletePost(id);
 }
 addLike(id) {
  this.props.addLike(id);
 }
 removeLike(id) {
  this.props.removeLike(id);
 }
 findUserLike(likes) {
  const { auth } = this.props;
  if (likes.filter(like => like.user === auth.user.id).length > 0) {
   return true;
  } else {
   return false;
  }
 }
 render() {
  const { post, auth, showActions } = this.props;
  return (
   <MDBCard className="mb-1">
    <MDBCardBody>
     <MDBRow>
      <MDBCol md="2">
       <a href="/">
        <img className="rounded-circle d-none d-md-block" src={post.avatar} width="95%" />
       </a>
       <br />
       <p className="text-center">{post.name}</p>
      </MDBCol>
      <MDBCol md="10">
       <p className="lead">{post.text}</p>
       {showActions ? (
        <Fragment>
         <button className="btn btn-light mr-1" onClick={this.addLike.bind(this, post._id)}>
          <MDBIcon
           far
           icon="thumbs-up"
           size="2x"
           className={classnames("", {
            "text-info": this.findUserLike(post.likes)
           })}
          />
          <span className="badge badge-light">{post.likes.length}</span>
         </button>
         <button className="btn btn-light mr-1" onClick={this.removeLike.bind(this, post._id)}>
          <MDBIcon icon="thumbs-down" size="2x" />
          <span className="badge badge-light" />
         </button>
         <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
          comments
         </Link>
         {post.user === auth.user.id ? (
          <MDBBtn onClick={this.onDelete.bind(this, post._id)}>
           Delete <i className="fas fa-times" />
          </MDBBtn>
         ) : null}
        </Fragment>
       ) : null}
      </MDBCol>
     </MDBRow>
    </MDBCardBody>
   </MDBCard>
  );
 }
}
PostItem.propTypes = {
 deletePost: PropTypes.func.isRequired,
 addLike: PropTypes.func.isRequired,
 removeLike: PropTypes.func.isRequired,
 post: PropTypes.object.isRequired,
 auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  auth: state.auth
 };
};
export default connect(
 mapStateToProps,
 { deletePost, getPosts, addLike, removeLike }
)(PostItem);
