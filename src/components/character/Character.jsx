import React from "react";
import PropTypes from "prop-types";

const Character = ({
  firstName,
  lastName,
  dateOfBirth,
  age,
  gender,
  occupation,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <b>
          {firstName} {lastName}
        </b>
      </div>
      <hr className="card-hr"></hr>
      <div className="card-info">
        <div>
          <b>Date of birth:</b> <i>{dateOfBirth}</i>
        </div>
        <div>
          <b>Age:</b> {age}
        </div>
        <div>
          <b>Gender:</b> {gender}
        </div>
        <div>
          <b>Occupation:</b> {occupation}
        </div>
      </div>
    </div>
  );
};

export default Character;

Character.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gender: PropTypes.string,
  age: PropTypes.number,
  occupation: PropTypes.string,
};
