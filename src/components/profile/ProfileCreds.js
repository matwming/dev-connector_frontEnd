import React, { Component } from "react";
import Moment from "react-moment";
import { MDBRow, MDBCol } from "mdbreact";

class ProfileCreds extends Component {
 render() {
  const { experience, education } = this.props;
  const expItems = experience.map(exp => (
   <li key={exp._id} className="list-group-item">
    <h4>{exp.company}</h4>
    <p>
     <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
     {exp.to === null ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
    </p>
    <p>
     <strong>Position:</strong>
     {exp.title}
    </p>
    <p>
     {exp.location === "" ? null : (
      <span>
       <strong>Location:</strong>
       {exp.location}
      </span>
     )}
    </p>
    <p>
     {exp.description === "" ? null : (
      <span>
       <strong>Description:</strong>
       {exp.description}
      </span>
     )}
    </p>
   </li>
  ));
  const eduItems = education.map(edu => (
   <li key={edu._id} className="list-group-item">
    <h4>{edu.school}</h4>
    <p>
     <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
     {edu.to === null ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
    </p>
    <p>
     <strong>Degree:</strong>
     {edu.degree}
    </p>
    <p>
     <strong>Field of Study:</strong>
     {edu.fieldofstudy}
    </p>

    <p>
     {edu.description === "" ? null : (
      <span>
       <strong>Description:</strong>
       {edu.description}
      </span>
     )}
    </p>
   </li>
  ));
  return (
   <MDBRow>
    <MDBCol md="6">
     <h3 className="text-center text-info">Experience</h3>
     {experience.length > 0 ? (
      <ul className="listgroup">{expItems}</ul>
     ) : (
      <p className="text-center">No Experience Listed</p>
     )}
    </MDBCol>
    <MDBCol md="6">
     <h3 className="text-center text-info">Education</h3>
     {education.length > 0 ? (
      <ul className="listgroup">{eduItems}</ul>
     ) : (
      <p className="text-center">No Education Listed</p>
     )}
    </MDBCol>
   </MDBRow>
  );
 }
}
export default ProfileCreds;
