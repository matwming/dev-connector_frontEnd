import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
class PostFeed extends Component {
 render() {
  const { posts } = this.props;
  return posts.map(post => {
   console.log("postFeed", post);
   return <PostItem key={post._id} post={post} showActions={true} />;
  });
 }
}
PostFeed.propTypes = {
 posts: PropTypes.array.isRequired
};
export default PostFeed;
