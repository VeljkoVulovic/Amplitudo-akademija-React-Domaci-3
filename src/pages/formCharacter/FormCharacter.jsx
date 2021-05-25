import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import {
  deleteCharacter,
  editCharacter,
  addCharacter,
  getCharacter,
} from "../../services/characters";
import DeleteModal from "../../components/modal/DeleteModal";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const initialData = {
  age: 0,
  dateOfBirth: "",
  firstName: "",
  gender: "",
  id: 0,
  lastName: "",
  occupation: "",
};

const FormCharacter = (props) => {
  const character = props.location.character;
  const history = useHistory();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();

  const mutationEdit = useMutation((data) => editCharacter(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("characters");
      history.push("/characters");
    },
  });

  const mutationAdd = useMutation((data) => addCharacter(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("characters");
      history.push("/characters");
    },
  });

  useEffect(() => {
    if (character !== undefined) {
      getCharacter(character.id).then((response) => {
        setFormData(response?.data);
      });
    }
  }, [character]);

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (character !== undefined) {
      data.id = character.id;
      mutationEdit.mutate(data);
    } else {
      delete data.id;
      mutationAdd.mutate(data);
    }
  };

  const onDelete = (id) => {
    deleteCharacter(id)
      .then((response) => {
        history.push("/characters");
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
      {character !== undefined ? (
        <h2>Edit character {character.id}</h2>
      ) : (
        <h2>Add character</h2>
      )}
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="First name"
          autoComplete="off"
          {...register("firstName", {
            required: {
              value: true,
              message: "Please input first name!",
            },
          })}
        />
        <span className="errorSpan">{errors?.firstName?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Last name"
          autoComplete="off"
          {...register("lastName", {
            required: {
              value: true,
              message: "Please input last name!",
            },
          })}
        />
        <span className="errorSpan">{errors?.lastName?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="number"
          variant="outlined"
          label="Age"
          autoComplete="off"
          {...register("age", {
            required: {
              value: true,
              message: "Please input age!",
            },
          })}
        />
        <span className="errorSpan">{errors?.age?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Gender"
          autoComplete="off"
          {...register("gender", {
            required: {
              value: true,
              message: "Please input Gender (MALE / FEMALE / OTHER)!",
            },
          })}
        />
        <span className="errorSpan">{errors?.gender?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Occupation"
          autoComplete="off"
          {...register("occupation", {
            required: {
              value: true,
              message: "Please input occupation",
            },
          })}
        />
        <span className="errorSpan">{errors?.occupation?.message}</span>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Date of birth"
          autoComplete="off"
          {...register("dateOfBirth", {
            required: {
              value: true,
              message: "Please input date of birth (format yyyy-mm-dd)!",
            },
          })}
        />
        <span className="errorSpan">{errors?.dateOfBirth?.message}</span>
      </div>
      <Button
        style={{ width: "112px" }}
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        type="submit"
      >
        Submit
      </Button>
      <Button
        startIcon={<KeyboardReturnIcon />}
        variant="outlined"
        color="primary"
        onClick={() => history.push("/characters")}
      >
        Return
      </Button>
      {character !== undefined ? (
        <DeleteModal
          onDelete={onDelete}
          name={"character " + formData?.id}
          id={formData?.id}
        ></DeleteModal>
      ) : null}
    </form>
  );
};

export default FormCharacter;
