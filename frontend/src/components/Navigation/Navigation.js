import "./Navigation.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState,useEffect} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
/*Oldalak közötti váltás*/
export function Navigation({setIsAdmin, isLoggedIn, setIsLoggedIn, setToken,isAdmin}) { 
    let [width,setWidth]=useState(window.innerWidth)
    let [isNavOpen,setIsNavOpen]=useState(false)

    const navigate = useNavigate();
    const logout = ()=>{
      setIsLoggedIn(false);
      setToken("");
      localStorage.removeItem("token");
      navigate("/Login");
    } 
    
    useEffect(()=>{
      window.addEventListener('resize', (event)=>{
        if(window.innerWidth<1000){
          setIsNavOpen(false)
        }
        setWidth(window.innerWidth)
      } );
    },[])
    
    
    const getUserButton = ()=>{
        if(isAdmin){
            return  <ListItem disablePadding>
            <ListItemButton onClick={()=>{
              navigate("/User");
            }}>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary= {"User"} />
            </ListItemButton>
        </ListItem>
        }else{
          return <></>
        }
    }
    function getCloseButton(){
        if(width>1000){
          return <></>
        }else{
          return <div className="closeIcon"> <CloseIcon onClick={()=>{setIsNavOpen(false)}}></CloseIcon></div>
        }
    }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
          {getCloseButton()}
          <List>
            <ListItem disablePadding>
                <ListItemButton onClick={()=>{
                  navigate("/Home");
                }}>
                 
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary= {"Home"} />
                </ListItemButton>
            </ListItem>
              
            <ListItem  disablePadding>
                <ListItemButton onClick={()=>{
                  navigate("/Map");
                }}>
                  <ListItemIcon>
                    <MapIcon/>
                  </ListItemIcon>
                  <ListItemText primary= {"Map"} />
                </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
                <ListItemButton onClick={()=>{
                  navigate("/List");
                }}>
                  <ListItemIcon>
                    <ListIcon/>
                  </ListItemIcon>
                  <ListItemText primary= {"List"} />
                </ListItemButton>
            </ListItem>
              {getUserButton()}
           
          
          </List>
          <Divider />
          <List>
          <ListItem  disablePadding>
                <ListItemButton onClick={()=>{
                  logout();
                  
                }}>
                  
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary= {"Log out"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      );
      if (isLoggedIn) {
        if(width<1000  && !isNavOpen ){
          return <div className="hamburger"> <MenuIcon onClick={()=>{setIsNavOpen(true)}}></MenuIcon></div>


        }else{
          return(<div className="DrawerContainer">{DrawerList}</div>);

        }
      }else{
        return <></>
      }
}