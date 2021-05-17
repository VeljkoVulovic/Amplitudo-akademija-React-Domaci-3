import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { deleteBook, editBook, addBook } from "../../services/books";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FormBook = (props) => {
  const book = props.location.book;
  const history = useHistory();
  const [id, setId] = useState(0);
  const [isbn, setIsbn] = useState("");
  const [writerName, setWriterName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publishedDate, setPublishedDate] = useState(null);
  const [genre, setGenre] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setPublishedDate(date);
  };

  useEffect(() => {
    if (book != null) {
      setId(book.id);
      setIsbn(book.isbn);
      setWriterName(book.writerName);
      setPublisherName(book.publisherName);
      setPublishedDate(book.publishedDate);
      setGenre(book.genre);
    }
  }, [book]);

  const onSave = (e) => {
    e.preventDefault();
    const formData = {
      genre: genre,
      id: id,
      isbn: isbn,
      publishedDate: publishedDate,
      publisherName: publisherName,
      writerName: writerName,
    };
    if (book != null) {
      editBook(formData)
        .then((response) => {
          history.push("/books");
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
    } else {
      delete formData.id;
      addBook(formData)
        .then((response) => {
          history.push("/books");
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
    }
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
    <div className="styleDiv formDiv">
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          label="Isbn"
          variant="outlined"
          autoComplete="off"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
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
          type="text"
          variant="outlined"
          label="Publisher name"
          autoComplete="off"
          value={publisherName}
          onChange={(e) => setPublisherName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Genre"
          autoComplete="off"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="datePicker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: "100%" }}
            margin="normal"
            label="Published date"
            format="yyyy-MM-dd"
            value={publishedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
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
        onClick={() => history.push("/books")}
      >
        Return
      </Button>
      {book != null ? (
        <div>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="secondary"
            onClick={() => handleOpen()}
          >
            Delete
          </Button>
        </div>
      ) : null}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Please Confirm!</h2>
            <p id="transition-modal-description">
              Are you sure you want to delete <u>{isbn}</u>?
            </p>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default FormBook;
