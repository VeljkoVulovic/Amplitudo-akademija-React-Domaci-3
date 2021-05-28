import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import { registerUser } from "../../services/account";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
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
    registerUser(data)
      .then(function (response) {
        history.push("/login");
      })
      .catch(function (error) {
        setErrorMessage(error?.response?.data?.title);
      });
  };

  const onError = (errors) => {
    console.log(errors.title);
  };

  return (
    <Container>
      <form
        className="styleDiv centerDiv"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h1>Register</h1>
        <div>
          <TextField
            fullWidth
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
          <span className="errorSpan">{errors?.username?.message}</span>
        </div>
        <div>
          <TextField
            fullWidth
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
          <span className="errorSpan">{errors?.password?.message}</span>
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="E-mail"
            autoComplete="off"
            {...register("email", {
              required: {
                value: true,
                message: "Please input email!",
              },
            })}
          />
          <span className="errorSpan">{errors?.password?.message}</span>
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            autoComplete="off"
            {...register("login", {
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
        <div className="buttonDiv">
          <Button fullWidth variant="contained" color="primary" type="submit">
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
