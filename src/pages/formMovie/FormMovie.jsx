import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import {
  deleteMovie,
  editMovie,
  addMovie,
  getMovie,
} from "../../services/movies";
import DeleteModal from "../../components/modal/DeleteModal";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const initialData = {
  directorName: "",
  duration: 0,
  id: 0,
  name: "",
  rating: 0,
  writerName: "",
};

const FormMovie = (props) => {
  const history = useHistory();
  const movie = props.location.movie;
  const [formData, setFormData] = useState(initialData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (movie !== undefined) {
      getMovie(movie.id).then((response) => {
        console.log(response?.data);
        setFormData(response?.data);
      });
    }
  }, [movie]);

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (movie !== undefined) {
      data.id = movie.id;
      editMovie(data)
        .then((response) => {
          history.push("/movies");
        })
        .catch((error) => {
          console.log(error?.response?.data);
          setErrorMessage(error?.response?.data?.title);
        });
    } else {
      delete data.id;
      addMovie(data)
        .then((response) => {
          history.push("/movies");
        })
        .catch((error) => {
          console.log(error?.response?.data);
          setErrorMessage(error?.response?.data?.title);
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
    <form
      className="styleDiv formDiv"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {movie !== undefined ? (
        <h2>Edit movie {movie.id}</h2>
      ) : (
        <h2>Add movie</h2>
      )}
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Name"
          autoComplete="off"
          {...register("name", {
            required: {
              value: true,
              message: "Please input name!",
            },
          })}
        />
        <span className="errorSpan">{errors?.name?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Director name"
          autoComplete="off"
          {...register("directorName", {
            required: {
              value: true,
              message: "Please input director name!",
            },
          })}
        />
        <span className="errorSpan">{errors?.directorName?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Writer name"
          autoComplete="off"
          {...register("writerName", {
            required: {
              value: true,
              message: "Please input writer name!",
            },
          })}
        />
        <span className="errorSpan">{errors?.writerName?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="number"
          variant="outlined"
          label="Duration"
          autoComplete="off"
          {...register("duration", {
            required: {
              value: true,
              message: "Please input duration!",
            },
          })}
        />
        <span className="errorSpan">{errors?.duration?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="number"
          variant="outlined"
          label="Rating"
          autoComplete="off"
          {...register("rating", {
            required: {
              value: true,
              message: "Please input rating!",
            },
          })}
        />
        <span className="errorSpan">{errors?.duration?.message}</span>
      </div>
      <Button
        style={{ width: "112px" }}
        className={classes.button}
        variant="contained"
        startIcon={<SaveIcon />}
        color="primary"
        type="submit"
      >
        Submit
      </Button>
      <Button
        startIcon={<KeyboardReturnIcon />}
        variant="outlined"
        color="primary"
        onClick={() => history.push("/movies")}
      >
        Return
      </Button>
      {movie !== undefined ? (
        <DeleteModal
          onDelete={onDelete}
          name={"movie " + formData?.id}
          id={formData?.id}
        ></DeleteModal>
      ) : null}
      {errorMessage !== "" ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : null}
    </form>
  );
};

export default FormMovie;
