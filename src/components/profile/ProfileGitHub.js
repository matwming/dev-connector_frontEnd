import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBadge } from "mdbreact";
import styled from "styled-components";
const NewMDBCard = styled(MDBCard)`
 :hover {
  border: 5px solid pink;
  cursor: pointer;
 }
`;
class ProfileGitHub extends Component {
 state = {
  clientId: "3c56ab012d768eb6d77f",
  clientSecret: "83e50ea73603d1ec752853b7cc879a766d3f7ca8",
  count: 5,
  sort: "created:asc",
  repos: []
 };
 componentDidMount() {
  const { username } = this.props;
  const { count, sort, clientId, clientSecret } = this.state;
  fetch(
   `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
  )
   .then(res => res.json())
   .then(data => {
    this.setState({
     repos: data
    });
   })
   .catch(err => console.log(err));
 }
 render() {
  const { repos } = this.state;
  const repoItems = repos.map(repo => (
   <NewMDBCard className="m-1">
    <MDBCardBody>
     <div key={repo.id} className="mb-2">
      <MDBRow>
       <MDBCol md="6">
        <h4>
         <Link to={repo.html_url} className="text-info" target="_blank">
          {repo.name}
         </Link>
        </h4>
        <p>{repo.description}</p>
       </MDBCol>
       <MDBCol md="6">
        <span className="p-2">
         Stars: <MDBBadge color="primary">{repo.stargazers_count}</MDBBadge>
        </span>
        <span className="p-2">
         Watchers: <MDBBadge color="secondary">{repo.watchers_count}</MDBBadge>
        </span>
        <span className="p-2">
         Forks: <MDBBadge color="success">{repo.forks_count}</MDBBadge>
        </span>
       </MDBCol>
      </MDBRow>
     </div>
    </MDBCardBody>
   </NewMDBCard>
  ));
  return (
   <div>
    <hr />
    <h3 className="mb-4">Latest Github Repos</h3>
    {repoItems}
   </div>
  );
 }
}

ProfileGitHub.propTypes = {
 username: PropTypes.string.isRequired
};
export default ProfileGitHub;
