import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export function Login({setIsLoggedIn, setToken,setIsAdmin,setUserName}) {
  const navigate = useNavigate();
  useEffect(()=>{
      let token = localStorage.getItem("token");
      let isAdmin = localStorage.getItem("is-admin");
      let username = localStorage.getItem("username");
      if(token){
        setToken(token);
        setIsAdmin(isAdmin);
        setUserName(username);
    
      
        axios.defaults.headers.common['Authorization'] = token;
      setIsLoggedIn(true);
      navigate("/Home");
      }
  },[]);
    let [isInvalid,setIsInvalid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post("/auth/login",{
        username: data.get('username'),
        password: data.get('password'),
    }).then((response)=>{
      let {token,admin,username} =response.data
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setUserName(username);

      setIsAdmin(admin);
      localStorage.setItem("is-admin", admin);
      axios.defaults.headers.common['Authorization'] = token;
      setIsLoggedIn(true);
      navigate("/Home");
    }).catch((error)=>{
        setIsInvalid(true);
        setTimeout(()=>{
            setIsInvalid(false);
        },3000);
    })

  };

  return (
    <ThemeProvider theme={defaultTheme}>
    { isInvalid ? <Alert severity="error">Invalid user or password or your account is not enabled</Alert> : <></> }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}