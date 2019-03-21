import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
import PostForm from "./PostForm";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { getPosts } from "../../store/reducers/postReducer";
import PostFeed from "./PostFeed";
class Posts extends Component {
 componentDidMount() {
  this.props.getPosts();
 }
 render() {
  const { posts, loading } = this.props.posts;
  console.log(this.props.posts);
  let postContent;
  if (posts === null || loading) {
   postContent = <Spinner />;
  } else {
   postContent = <PostFeed posts={posts} />;
  }
  return (
   <div className="feed">
    <MDBContainer>
     <MDBRow>
      <MDBCol md="12">
       <PostForm />
       {postContent}
      </MDBCol>
     </MDBRow>
    </MDBContainer>
   </div>
  );
 }
}
Posts.propType = {
 post: PropTypes.object.isRequired,
 getPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => {
 return {
  posts: state.post
 };
};
export default connect(
 mapStateToProps,
 { getPosts }
)(Posts);
