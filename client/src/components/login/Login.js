import React from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LoginService from '../../services/LoginService';
//import GetUserService from "../../services/GetUserService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({authManager}) {
  const classes = useStyles();

  const email = React.useRef(null);
  const password = React.useRef(null);
  const rememberMe = React.useRef(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
      rememberMe: rememberMe.current.checked,
    }
    let response;
    try{
        response = await LoginService(data);
        if(response.success && response.data.token){
          const token = response.data.token;
          localStorage.setItem("token", token); 
          authManager();
        } 
    } catch(err){
      setErrorMessage("Invalid credentials")
      console.log(err)
    }
  };
  let err='';
  if(errorMessage){
    err=(
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )
  }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form key={"haha"} className={classes.form} onSubmit={handleSubmit}>
          {err}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={email}
            
          />
          <TextField
            inputRef={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            inputRef={rememberMe}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <center>
                <Link  href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </center>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
