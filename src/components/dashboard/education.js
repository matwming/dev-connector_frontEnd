import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from "mdbreact";
import Moment from "react-moment";
import { deleteEducation } from "../../store/reducers/profileReducer";
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
class Education extends Component {
 state = {};
 onDeleteClick(id) {
  this.props.deleteEducation(id, this.props.history);
 }
 render() {
  const education = this.props.profile.profile.education.map(edu => {
   return (
    <tr key={edu._id}>
     <td>{edu.school}</td>
     <td>{edu.degree}</td>
     <td>
      <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{" "}
      {!edu.to === null ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Current"}
     </td>
     <td onClick={this.onDeleteClick.bind(this, edu._id)}>
      <DelBtn>Delete</DelBtn>
     </td>
    </tr>
   );
  });
  console.log(this.props.experience);

  return (
   <div>
    <MDBCardBody>
     <h4 className="mb-4">Education Credentials</h4>
     <table className="table">
      <tbody>
       <tr>
        <th>School</th>
        <th>Degree</th>
        <th>Years</th>
        <th />
       </tr>
       {education}
      </tbody>
     </table>
    </MDBCardBody>
   </div>
  );
 }
}

Education.propTypes = {
 deleteEducation: PropTypes.func.isRequired
};
const mapStateToProps = state => {
 return {
  profile: state.profile
 };
};
export default connect(
 mapStateToProps,
 { deleteEducation }
)(Education);
