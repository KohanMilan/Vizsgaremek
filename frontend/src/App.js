import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from './pages/Login/Login';
import { Home }from "./pages/Home/Home";
import {useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { List } from './pages/List/List';
import { Map } from './pages/Map/Map';
import { User } from './pages/User/User';

function App() {

  let [isLoggedIn,setIsLoggedIn] = useState(false);
  let [token, setToken] = useState("");
  let [isAdmin, setIsAdmin] = useState(false);
  let [username,setUserName]=useState("")


    return (
      <>
      
      <BrowserRouter>
      
      <div className='flexContainer'>
        <div className='navigation'><Navigation setIsAdmin={setIsAdmin} isAdmin={isAdmin} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} ></Navigation></div>
        <div className='page'>


     
          <Routes>
           <Route path='/'>
           <Route path="/" element={<Home isLoggedIn = {isLoggedIn} />} />
            <Route path="home" element={<Home isLoggedIn = {isLoggedIn} />} />
            <Route path="map" element={<Map isLoggedIn = {isLoggedIn} />} />
            <Route path="list" element={<List isLoggedIn = {isLoggedIn} />} />
            <Route path="user" element={<User username={username} isAdmin={isAdmin} isLoggedIn = {isLoggedIn} />} />
            <Route path="login" element={<Login setUserName={setUserName} setIsAdmin={setIsAdmin} setIsLoggedIn = {setIsLoggedIn} setToken = {setToken} />} />
            <Route path="*" element={<Home isLoggedIn = {isLoggedIn}/>}/>
            </Route>
          </Routes>
        </div>
      </div>
          
        </BrowserRouter>
    </>
    );
  }
  export default App;