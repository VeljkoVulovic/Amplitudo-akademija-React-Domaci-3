import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import {
  deleteCharacter,
  editCharacter,
  addCharacter,
} from "../../services/characters";

const FormCharacter = (props) => {
  const character = props.location.character;
  const history = useHistory();
  const [id, setId] = useState(0);
  const [age, setAge] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if (character != null) {
      setId(character.id);
      setAge(character.age);
      setFirstName(character.firstName);
      setLastName(character.lastName);
      setDateOfBirth(character.dateOfBirth);
      setGender(character.gender);
      setOccupation(character.occupation);
    }
  }, [character]);

  const onSave = (e) => {
    e.preventDefault();
    const formData = {
      age: age,
      dateOfBirth: dateOfBirth,
      firstName: firstName,
      gender: gender,
      id: id,
      lastName: lastName,
      occupation: occupation,
    };
    if (character != null) {
      editCharacter(formData)
        .then((response) => {
          history.push("/characters");
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
    } else {
      delete formData.id;
      addCharacter(formData)
        .then((response) => {
          history.push("/characters");
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
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
    <div className="styleDiv formDiv">
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="First name"
          autoComplete="off"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Last name"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="number"
          variant="outlined"
          label="Age"
          autoComplete="off"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <FormControl
          style={{ width: "100%" }}
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value={"MALE"}>Male</MenuItem>
            <MenuItem value={"FEMALE"}>Female</MenuItem>
            <MenuItem value={"OTHER"}>Other</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          style={{ width: "100%" }}
          type="text"
          variant="outlined"
          label="Occupation"
          autoComplete="off"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </div>
      <div className="datePicker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: "100%" }}
            margin="normal"
            label="Date of birth"
            format="yyyy-MM-dd"
            value={dateOfBirth}
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
        color="primary"
        startIcon={<SaveIcon />}
        onClick={(e) => onSave(e)}
      >
        Save
      </Button>
      <Button
        startIcon={<KeyboardReturnIcon />}
        variant="outlined"
        color="primary"
        onClick={() => history.push("/characters")}
      >
        Return
      </Button>
      {character != null ? (
        <div>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="secondary"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default FormCharacter;
