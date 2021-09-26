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
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
//import Avatar from "@material-ui/core/Avatar";

import RegisterService from '../../services/RegisterService';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.success.dark,
    },
    form: {
      width: "100%", 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    paragraph:{
      color: "black",
      marginBottom:"5px",
      fontSize: "17px"
    }
  }));
  



export default function Register() {
    const classes = useStyles();
    const email = React.useRef(null);
    const password = React.useRef(null);
    const name = React.useRef(null);
    const phone = React.useRef(null);
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [redirect, setRedirect] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("email", email.current.value);
        data.append("password", password.current.value);
        data.append("name", name.current.value);
        if(phone.current.value.trim()!==""){
          data.append("phone", phone.current.value);
        }
        if(profilePicture){
          data.append("profile_picture", profilePicture);
        }
        let response;
        try{
            response = await RegisterService(data);
            if(response.success && response.data.id){
                const token = response.data.id; 
                console.log(token);
                setRedirect(true);
            } 
        } catch(err){
            setErrorMessage("check enter proper values or email already taken!")
            console.log(err)
            // console.log("Show error/ error handling")
        }
    }
    if (redirect) {
        return <Redirect to="/"/>;
    }

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
              <LockOpenOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form key={"haha"} className={classes.form} onSubmit={handleSubmit}>
              {err}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="email"
                autoComplete="Name"
                inputRef={name}
                
              />
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
                label="Password minimum length 6 characters"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="Phone Number 10 digits only"
                name="phone"
                autoComplete="phone"
                inputRef={phone}
              />

              <p className={classes.paragraph}>Profile Picture</p>
              <Input
                type="file"
                margin="normal"
                onChange={e=>setProfilePicture(e.target.files[0])}
                fullWidth
                variant="outlined"
              />      
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
    
              <Grid container>
                <Grid item>
                  <Link  href="/" variant="body2">
                    {"Already have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      );
}