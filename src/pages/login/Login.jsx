import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { login } from "../../services/account";
import { useForm } from "react-hook-form";

const Login = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    login(data)
      .then(function (response) {
        localStorage.setItem("jwt-token", response?.data["id_token"]);
        history.push("/movies");
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setErrorMessage(error?.response?.data?.title);
      });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Container>
      <form
        className="styleDiv centerDiv"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h1>Welcome!</h1>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            autoComplete="off"
            {...register("username", {
              required: {
                value: true,
                message: "Please input username!",
              },
            })}
          />
          <span className="errorSpan">{errors?.username?.message}</span>
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            autoComplete="off"
            {...register("password", {
              required: {
                value: true,
                message: "Please input password!",
              },
            })}
          />
          <span className="errorSpan">{errors?.password?.message}</span>
        </div>
        <FormControlLabel
          label="Remember me"
          control={<input type="checkbox" {...register("rememberMe")} />}
        />
        <div className="buttonDiv">
          <Button fullWidth variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
        <div className="buttonDiv">
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => history.push("/register")}
          >
            Register
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
