import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { deleteBook, editBook, addBook, getBook } from "../../services/books";
import DeleteModal from "../../components/modal/DeleteModal";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const initialData = {
  genre: "",
  id: 0,
  isbn: "",
  publishedDate: "",
  publisherName: "",
  writerName: "",
};

const FormBook = (props) => {
  const history = useHistory();
  const book = props.location.book;
  const [formData, setFormData] = useState(initialData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    if (book !== undefined) {
      editBook(data)
        .then((response) => {
          history.push("/books");
        })
        .catch((error) => {
          console.log(error?.response?.data);
          setErrorMessage(error?.response?.data?.title);
        });
    } else {
      delete data.id;
      addBook(data)
        .then((response) => {
          history.push("/books");
        })
        .catch((error) => {
          console.log(error?.response?.data);
          setErrorMessage(error?.response?.data?.title);
        });
    }
  };

  useEffect(() => {
    if (book !== undefined) {
      getBook(book.id).then((response) => {
        console.log(response?.data);
        setFormData(response?.data);
      });
    }
  }, [book]);

  const onError = (errors) => {
    console.log(errors);
  };

  const onDelete = (id) => {
    deleteBook(id)
      .then((response) => {
        history.push("/books");
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
      {book !== undefined ? <h2>Edit book {book.id}</h2> : <h2>Add book</h2>}
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          label="Isbn"
          variant="outlined"
          autoComplete="off"
          {...register("isbn", {
            required: {
              value: true,
              message: "Please input isbn!",
            },
          })}
        />
        <span className="errorSpan">{errors?.isbn?.message}</span>
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
          type="text"
          variant="outlined"
          label="Publisher name"
          autoComplete="off"
          {...register("publisherName", {
            required: {
              value: true,
              message: "Please input publisher name!",
            },
          })}
        />
        <span className="errorSpan">{errors?.publisherName?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Published date"
          autoComplete="off"
          {...register("publishedDate", {
            required: {
              value: true,
              message: "Please input published date (format yyyy-mm-dd)!",
            },
          })}
        />
        <span className="errorSpan">{errors?.publishedDate?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Genre"
          autoComplete="off"
          {...register("genre", {
            required: {
              value: true,
              message: "Please input genre!",
            },
          })}
        />
        <span className="errorSpan">{errors?.genre?.message}</span>
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
        onClick={() => history.push("/books")}
      >
        Return
      </Button>
      {book !== undefined ? (
        <DeleteModal
          onDelete={onDelete}
          name={"book " + formData?.id}
          id={formData?.id}
        ></DeleteModal>
      ) : null}
      {errorMessage !== "" ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : null}
    </form>
  );
};

export default FormBook;
