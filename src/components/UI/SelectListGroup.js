import React, { Fragment } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
 const selectOption = options.map(option => {
  return (
   <option key={option.label} value={option.value}>
    {option.label}
   </option>
  );
 });
 return (
  <Fragment>
   <select
    className={classnames("browser-default custom-select", {
     "is-invalid": error
    })}
    name={name}
    value={value}
    onChange={onChange}
   >
    {selectOption}
   </select>
   {info && <small className="form-text text-muted">{info}</small>}
   {error && <div className="invalid-feedback">{error}</div>}
  </Fragment>
 );
};
SelectListGroup.propTypes = {
 name: PropTypes.string.isRequired,
 value: PropTypes.string.isRequired,
 info: PropTypes.string,
 error: PropTypes.string,
 onChange: PropTypes.func.isRequired,
 options: PropTypes.array.isRequired
};
export default SelectListGroup;
