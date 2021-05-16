import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { login } from "../../services/account";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    login(loginData)
      .then(function (response) {
        localStorage.setItem("jwt-token", response?.data["id_token"]);
        history.push("/movies");
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        if (error?.response?.data?.details === "Bad credientials") {
          setErrorMessage("Pogresni kredencijali!");
        } else {
          setErrorMessage("Doslo je do greske!");
        }
      });
  };

  return (
    <Container>
      <div className="styleDiv centerDiv">
        <h1>Welcome!</h1>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            autoComplete="off"
            value={loginData?.username}
            onChange={(e) =>
              setLoginData((prevState) => {
                return {
                  ...prevState,
                  username: e.target.value,
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
            value={loginData?.password}
            onChange={(e) =>
              setLoginData((prevState) => {
                return {
                  ...prevState,
                  password: e.target.value,
                };
              })
            }
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={loginData?.rememberMe}
              onChange={(e) =>
                setLoginData((prevState) => {
                  return {
                    ...prevState,
                    rememberMe: e.target.checked,
                  };
                })
              }
              color="primary"
            />
          }
          label="Remember me"
        />
        <div className="buttonDiv">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => onLogin(e)}
          >
            Login
          </Button>
        </div>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </div>
    </Container>
  );
};

export default Login;
