import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { deleteMovie, editMovie, addMovie } from "../../services/movies";
import DeleteModal from "../../components/modal/DeleteModal";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const FormMovie = (props) => {
  const movie = props.location.movie;
  const history = useHistory();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [duration, setDuration] = useState(0);
  const [rating, setRating] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (movie != null) {
      setId(movie.id);
      setName(movie.name);
      setDirectorName(movie.directorName);
      setWriterName(movie.writerName);
      setDuration(movie.duration);
      setRating(movie.rating);
    }
  }, [movie]);

  const onSave = (e) => {
    e.preventDefault();
    const formData = {
      directorName: directorName,
      duration: duration,
      id: id,
      name: name,
      rating: rating,
      writerName: writerName,
    };
    if (movie != null) {
      editMovie(formData)
        .then((response) => {
          history.push("/movies");
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
    } else {
      delete formData.id;
      addMovie(formData)
        .then((response) => {
          history.push("/movies");
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
    }
  };

  const onDelete = (id) => {
    deleteMovie(id)
      .then((response) => {
        history.push("/movies");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="styleDiv formDiv">
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Director name"
          autoComplete="off"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Writer name"
          autoComplete="off"
          value={writerName}
          onChange={(e) => setWriterName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="number"
          variant="outlined"
          label="Duration"
          autoComplete="off"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="number"
          variant="outlined"
          label="Rating"
          autoComplete="off"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <Button
        style={{ width: "112px" }}
        className={classes.button}
        variant="contained"
        startIcon={<SaveIcon />}
        color="primary"
        onClick={(e) => onSave(e)}
      >
        Save
      </Button>
      <Button
        startIcon={<KeyboardReturnIcon />}
        variant="outlined"
        color="primary"
        onClick={() => history.push("/movies")}
      >
        Return
      </Button>
      {movie != null ? (     
        <DeleteModal onDelete={onDelete} name={name} id={id}></DeleteModal>
      ) : null}
    </div>
  );
};

export default FormMovie;
