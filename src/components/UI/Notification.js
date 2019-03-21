import React, { Component, Fragment } from "react";
import { ToastContainer, toast } from "mdbreact";

class Notifications extends Component {
 notify(type) {
  return () => {
   switch (type) {
    case "info":
     toast.info("Info message", {
      autoClose: 3000
     });
     break;
    case "success":
     toast.success("Success message", {
      position: this.props.position
     });
     break;
    case "warning":
     toast.warn("Warning message");
     break;
    case "error":
     toast.error("Error message");
     break;
    default:
     return null;
   }
  };
 }
 render() {
  return (
   <Fragment>
    {this.notify(this.props.type, this.props.position)}
    <ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
   </Fragment>
  );
 }
}
export default Notifications;
