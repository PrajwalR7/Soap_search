import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import Icons from './icon';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router";
import {GoogleLogin} from "react-google-login";
import { Icon } from '@material-ui/core';
import { useEffect, useState } from "react";
//import Signup from './Signup';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to='/'>
        Soap Search
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(62 204 137)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    '&:hover':{
      backgroundColor: 'rgb(62 204 137)'
    }
  },
}));

// const styles = theme => ({
//   btnStyle: {
//     borderRadius: "10px",
//     color: "black",
//     textTransform: "none",
//     backgroundColor: "rgb(231 231 231)",
//     padding: "12px 16px",
//     fontSize: "14px",
//     margin:"auto 20px",
//     boxShadow:"none",
//   '&:hover': {
//     backgroundColor: 'rgb(62 204 137)'
//   }
//   },
// });
const initialState={email:'',password:''};
function SignIn() {
  const classes = useStyles();
  const [formData,setFormData]=useState(initialState);

  const handleSubmit=(e)=>
{
  e.preventDefault();
  console.log(formData);
  return fetch('http://localhost:5000/stored',{
      method:'POST',
      body: JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
  
};

const handleChange=(e)=>
{
  setFormData({...formData,[e.target.name]: e.target.value});
}
  const googleSuccess= async(res)=>{
    const result =res?.profileObj;
    const token= res?.tokenId;
    const name=result?.name;
    const mail=result?.email;
    // console.log(token);  
    console.log(name,mail);
    const data={
      name,
      mail,
    }
    return fetch('http://localhost:5000/stored',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
  
    
  };
  const googleFailure=()=>{
    console.log("Google Sign In was Unsuccessful .")
  };

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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <GoogleLogin
            clientId="383691205237-7fdptrv5md4h1n45jdln7j5rnpr8tb8c.apps.googleusercontent.com"
            render={(renderProps)=>(
              <Button 
              className={classes.googleButton} 
              color='primary' 
              fullWidth 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              startIcon={<Icons />} 
              varient="contained">
                Google Sign In
              </Button>)}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn);