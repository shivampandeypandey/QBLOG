import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';



import './Navbar.css'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Nav({loggedInUser,authManager}) {
    const classes = useStyles();
    const logout=async()=>{
        localStorage.removeItem('token');
        authManager();
    }
    let navContent;

    if (loggedInUser===null) {
        navContent = (
            <div>
            <Typography variant="h6" className={classes.title} >
                    <Link to="/"><h4>Login</h4></Link>
            </Typography>
             <Typography variant="h6" className={classes.title}>
             <Link to="/register" ><h4>Register</h4></Link>
            </Typography>
            </div>
                   
        )
    } else {
        navContent = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/" className="nav-link" onClick={logout}><h4>Logout</h4></Link>
                </li>
            </ul>
        )
    }

    return (
        <div className="navbar fixed-top" >
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Avatar variant="rounded" className={classes.rounded}>
                            <AssignmentIcon />
                        </Avatar>
                    </IconButton>
                <Typography variant="h6" className={classes.title}>Blog-it</Typography>
                <Typography variant="h6" className={classes.title}><h4>Welcome {loggedInUser?.name}</h4></Typography>
                <div>
                    {navContent}
                </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};