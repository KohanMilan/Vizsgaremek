import './UserEdit.css';
import { TextField } from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {Checkbox} from '@mui/material';
import { useState } from 'react';
import {Button} from '@mui/material';
import axios from 'axios';
import * as React from 'react';

/*Felhasználók hozzáadása*/
export function UserEdit({inputUser,save,closeModal}) {
    console.log(inputUser)
    let form = {
        id:useState(inputUser.id),
        username:  useState(inputUser.username),
        password: useState(""),
        email: useState(inputUser.email),
        enabled:  useState(inputUser.enabled),
        firstname:  useState(inputUser.firstname),
        lastname: useState(inputUser.lastname),
        admin:useState(inputUser.admin)
      }
      const [checked1, setChecked1] = useState(inputUser.enabled);
      const [checked2, setChecked2] = useState(inputUser.admin);
      const [valid, setValid] = React.useState(true);

      const isFormValid = function(){
        if(form.username[0] === ""){
            console.log("Uname false"); 
            return false;
        }
        if(!form.password[0].match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)){
            console.log("password fse");
            return false;
        }
       
        if(!form.email[0].match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            console.log("email false");
            return false;
        }
        if(checked1 === null){
            console.log("enabled false");
            return false;
        }
        if(form.firstname[0] === ""){
            console.log("firstname false");
            return false;
        }
        if(form.lastname[0] === ""){
            console.log("lastname false");
            return false;
        }
        if(checked2 === null){
            console.log("admin false");
            return false;
        }
        return true;
    }

      React.useEffect(()=> {
        setValid(isFormValid);
      }, [form]);

      const handle1Change = (event) => {
        setChecked1(event.target.checked);
      };
      const handle2Change = (event) => {
        setChecked2(event.target.checked);
      };

    return(
        <div className='userUploadContainer'>
            <div>            <TextField value={form.username[0]} onChange={ (e) => form.username[1](e.target.value) } label="Username" variant="outlined" /></div>
            <div>        <TextField value={form.password[0]} onChange={ (e) => form.password[1](e.target.value) } type="password" label="Password" variant="outlined" /></div>
            <div>        <TextField value={form.email[0]} onChange={ (e) => form.email[1](e.target.value) } label="E-mail" variant="outlined" /></div>
            <div>        <FormControlLabel control={<Checkbox checked={checked1} onChange={handle1Change} defaultChecked />} label="Enabled" /></div>
            <div>        <TextField value={form.firstname[0]} onChange={ (e) => form.firstname[1](e.target.value) } label="Firstname" variant="outlined" /></div>
            <div>        <TextField value={form.lastname[0]} onChange={ (e) => form.lastname[1](e.target.value) } label="Lastname" variant="outlined" /></div>
            <div>  <FormControlLabel control={<Checkbox checked={checked2} onChange={handle2Change} defaultChecked />} label="Admin" /></div>
      
       
      

        <div style={{display:'flex',"flex-direction":"row"}}>
        <Button disabled={!valid}
        onClick={()=>{  
                    let payload = {
                        username:  form.username[0],
                        password: form.password[0],
                        email: form.email[0],
                        enabled:  checked1,
                        firstname: form.firstname[0],
                        lastname:  form.lastname[0],
                        admin: checked2
                    }

                    console.log(JSON.stringify(payload));
                    console.log("AAAASD")
                    axios.put(`/user/${form.id[0]}`,payload).then((response)=>{
                        save(response.data)
                    }).catch((error)=>{
                        console.error('Hiba történt a kérés során:', error);
                        alert('Hiba történt a mentés során. Kérjük, próbálkozzon újra később.');
                    })

                }}>Save</Button>  
                <div style={{flex:1}}></div>
                <Button onClick={()=>{closeModal()}}>Cancel</Button>
        </div>
        </div>
    );
}