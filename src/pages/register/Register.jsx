import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import { register } from "../../services/account";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const Login = () => {
  const history = useHistory();
  const [registerData, setRegisterData] = useState({
    langKey: "en",
    authorities: ["ROLE_USER"],
    email: "",
    firstName: "",
    lastName: "",
    login: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onRegister = (e) => {
    e.preventDefault();
    register(registerData)
      .then(function (response) {
        history.push("/login");
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setErrorMessage("Doslo je do greske!");
      });
  };

  return (
    <Container>
      <form className="styleDiv centerDiv">
        <h1>Register</h1>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="First name"
            autoComplete="off"
            value={registerData?.firstName}
            onChange={(e) =>
              setRegisterData((prevState) => {
                return {
                  ...prevState,
                  firstName: e.target.value,
                };
              })
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Last name"
            autoComplete="off"
            value={registerData?.lastName}
            onChange={(e) =>
              setRegisterData((prevState) => {
                return {
                  ...prevState,
                  lastName: e.target.value,
                };
              })
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="E-mail"
            autoComplete="off"
            value={registerData?.email}
            onChange={(e) =>
              setRegisterData((prevState) => {
                return {
                  ...prevState,
                  email: e.target.value,
                };
              })
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            autoComplete="off"
            value={registerData?.login}
            onChange={(e) =>
              setRegisterData((prevState) => {
                return {
                  ...prevState,
                  login: e.target.value,
                };
              })
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            autoComplete="off"
            value={registerData?.password}
            onChange={(e) =>
              setRegisterData((prevState) => {
                return {
                  ...prevState,
                  password: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="buttonDiv">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => onRegister(e)}
          >
            Register
          </Button>
        </div>
        <div className="buttonDiv">
          <Button
            fullWidth
            startIcon={<KeyboardReturnIcon />}
            variant="outlined"
            color="primary"
            onClick={() => history.push("/login")}
          >
            Return
          </Button>
        </div>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </form>
    </Container>
  );
};

export default Login;
