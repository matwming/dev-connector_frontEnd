import { instance } from "../../config/config";
let initialState = {
 posts: [],
 post: {},
 loading: false
};
//Action=>
export const addPost = (postData, history) => dispatch => {
 dispatch(clearErrors());
 instance
  .post("/api/posts", postData)
  .then(res =>
   dispatch({
    type: "ADD_POST",
    posts: res.data
   })
  )
  .catch(err =>
   dispatch({
    type: "GET_ERRORS",
    errors: err.response.data
   })
  );
};
//Action=>
export const getPosts = () => dispatch => {
 dispatch(setPostLoading());
 instance
  .get("/api/posts")
  .then(res =>
   dispatch({
    type: "GET_POSTS",
    posts: res.data
   })
  )
  .catch(err =>
   dispatch({
    type: "GET_POSTS",
    posts: null
   })
  );
};
//Action
export const setPostLoading = () => {
 return {
  type: "POST_LOADING"
 };
};
//Action=> get post
export const getPost = id => dispatch => {
 dispatch(setPostLoading());
 instance
  .get(`/api/posts/${id}`)
  .then(res =>
   dispatch({
    type: "GET_POST",
    post: res.data
   })
  )
  .catch(err =>
   dispatch({
    type: "GET_POST",
    post: null
   })
  );
};

//Action=>Delete Post
export const deletePost = id => dispatch => {
 instance
  .delete(`/api/posts/${id}`)
  .then(res =>
   dispatch({
    type: "DELETE_POST",
    payload: id
   })
  )
  .catch(err =>
   dispatch({
    type: "GET_ERRORS",
    errors: err.response.data
   })
  );
};

//Action=> Add Like
export const addLike = id => dispatch => {
 instance
  .post(`/api/posts/like/${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err =>
   dispatch({
    type: "GET_ERRORS",
    errors: err.response.data
   })
  );
};
//Action=> REMOVE Like
export const removeLike = id => dispatch => {
 instance
  .post(`/api/posts/unlike/${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err =>
   dispatch({
    type: "GET_ERRORS",
    errors: err.response.data
   })
  );
};

//Action=>add comment
export const addComment = (postId, commentData) => dispatch => {
 dispatch(clearErrors());
 instance
  .post(`/api/posts/comment/${postId}`, commentData)
  .then(res =>
   dispatch({
    type: "GET_POST",
    post: res.data
   })
  )
  .catch(err =>
   dispatch({
    type: "GET_ERRORS",
    errors: err.response.data
   })
  );
};

//Action=> delete comment
export const deleteComment = (postId, commentId) => dispatch => {
 instance
  .delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(res =>
   dispatch({
    type: "GET_POST",
    post: res.data
   })
  )
  .catch(err =>
   dispatch({
    type: "GET_ERRORS",
    errors: err.response.data
   })
  );
};
//Action=> clear errors
export const clearErrors = () => {
 return {
  type: "CLEAR_ERRORS"
 };
};
//Reducer
export const postReducer = (state = initialState, action) => {
 switch (action.type) {
  case "ADD_POST":
   console.log(action.posts);
   return {
    ...state,
    posts: [action.posts, ...state.posts]
   };
  case "GET_POSTS":
   return {
    ...state,
    loading: false,
    posts: action.posts
   };
  case "GET_POST":
   return {
    ...state,
    loading: false,
    post: action.post
   };
  case "POST_LOADING":
   return {
    ...state,
    loading: true
   };
  case "DELETE_POST":
   let deletedPostId = action.payload;
   let newPostList = state.posts.filter(post => post._id !== deletedPostId);
   return {
    ...state,
    posts: [...newPostList]
   };
  default:
   return state;
 }
};
