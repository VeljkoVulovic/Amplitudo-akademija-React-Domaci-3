import React from "react";

const Movie = ({ name, directorName, writerName, duration, rating }) => {
  return (
    <div className="card">
      <div className="card-header">
        <b>{name}</b>
      </div>
      <hr className="card-hr"></hr>
      <div className="card-info">
        <div>
          <b>Rating:</b> {rating}
        </div>
        <div>
          <b>Duration:</b> {duration}
        </div>
        <div>
          <b>Director name:</b> {directorName}
        </div>
        <div>
          <b>Writer name:</b> {writerName}
        </div>
      </div>
    </div>
  );
};

export default Movie;
