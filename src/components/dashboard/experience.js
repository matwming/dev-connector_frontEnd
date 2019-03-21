import React, { Component } from "react";
import { connect } from "react-redux";

import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from "mdbreact";
import Moment from "react-moment";
import { deleteExperience } from "../../store/reducers/profileReducer";
import PropTypes from "prop-types";
import styled from "styled-components";
const DelBtn = styled.button`
 border-radius: 10px;
 background-color: red;
 color: white;
 padding: 4px;
 :hover {
  cursor: pointer;
  transform: scale(1.02);
 }
`;
class Experience extends Component {
 state = {};
 onDeleteClick(id) {
  this.props.deleteExperience(id, this.props.history);
 }
 render() {
  const experience = this.props.profile.profile.experience.map(exp => {
   return (
    <tr key={exp._id}>
     <td>{exp.company}</td>
     <td>{exp.title}</td>
     <td>
      <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
      {!exp.to === null ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Current"}
     </td>
     <td onClick={this.onDeleteClick.bind(this, exp._id)}>
      <DelBtn>Delete</DelBtn>
     </td>
    </tr>
   );
  });
  console.log(this.props.experience);

  return (
   <div>
    <MDBCardBody>
     <h4 className="mb-4">Experience Credentials</h4>
     <table className="table">
      <tbody>
       <tr>
        <th>Company</th>
        <th>Title</th>
        <th>Year</th>
        <th />
       </tr>
       {experience}
      </tbody>
     </table>
    </MDBCardBody>
   </div>
  );
 }
}

Experience.propTypes = {
 deleteExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => {
 return {
  profile: state.profile
 };
};
export default connect(
 mapStateToProps,
 { deleteExperience }
)(Experience);
