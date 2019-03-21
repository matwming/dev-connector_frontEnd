import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../store/reducers/postReducer";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import Spinner from "../UI/Spinner";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
 componentDidMount() {
  this.props.getPost(this.props.match.params.id);
 }
 render() {
  const { post, loading } = this.props;
  console.log(this.props.post.post.comments);
  let postContent;
  if (post.post === null || loading) {
   postContent = <Spinner />;
  } else {
   postContent = (
    <div>
     <PostItem post={post.post} showActions={false} />
     <CommentForm postId={post.post._id} />
     <CommentFeed postId={post.post._id} comments={this.props.post.post.comments} />
    </div>
   );
  }
  return (
   <MDBContainer>
    <MDBRow>
     <MDBCol md="12">
      <Link to="/feed" className="btn btn-light mb-3">
       Back To Feed
      </Link>
      {postContent}
     </MDBCol>
    </MDBRow>
   </MDBContainer>
  );
 }
}
Post.propTypes = {
 getPost: PropTypes.func.isRequired,
 post: PropTypes.object.isRequired
};
const mapStateToProps = state => {
 return {
  post: state.post
 };
};
export default connect(
 mapStateToProps,
 { getPost }
)(withRouter(Post));
