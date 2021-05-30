import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
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

const DeleteModal = ({ onDelete, name, id }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              Are you sure you want to delete <u>{name}</u>?
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
    </>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  onDelete: PropTypes.func,
};
