import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { withRouter, useHistory } from "react-router-dom";
import "./Navbar.css";
import { account } from "../../services/account";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    marginRight: 20,
    fontSize: 17
  },
}));

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState("");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (newRoute) => {
    history.push(newRoute);
    setAnchorEl(null);
  };

  useEffect(() => {
    account()
      .then(function (response) {
        setUser(response?.data?.login);
      })
      .catch(function (error) {
        setUser("");
      });
  }, []);

  return (
    <div>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button
              className="logo transition"
              color="primary"
              onClick={() => history.push("/movies")}
            >
              MOVIES.COM
            </Button>
          </Typography>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuClick("/characters")}>
                Characters
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/books")}>
                Books
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/movies")}>
                Movies
              </MenuItem>
            </Menu>
            <Typography variant="h7" className={classes.user}>
              <b>User</b> : <i>{user}</i>
            </Typography>
            <Button
              startIcon={<ExitToAppIcon />}
              className="logout transition"
              color="secondary"
              onClick={() => {
                localStorage.clear();
                handleMenuClick("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
