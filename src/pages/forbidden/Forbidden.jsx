import React from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const Forbidden = () => {
  const history = useHistory();
  return (
    <div className="centerDiv styleDiv">
      <b>This page is forbidden! Please log in!</b>
      <div className="buttonDiv">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Forbidden;
