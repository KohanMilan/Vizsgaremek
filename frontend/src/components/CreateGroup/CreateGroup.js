import './CreateGroup.css'
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

/*Csoportok létrehozása*/
export function CreateGroup({save,closeGroupModal}){
    const isFormValid = function(){
        if(form.name[0] == ""){
            return false;
        }
        if(form.color[0] == null){
            return false;
        }
        return true;
    }
    
    let form = {
        name:  useState(""),
        color:  useState(""),
      }
     
    return(
    <>
        <div style={{display:'flex',gap:'15px',flexDirection:'column',alignItems:'start'}}>
        <TextField value={form.name[0]} onChange={ (e) => form.name[1](e.target.value) } label="Name" variant="outlined" />
        <div>
        <input
        type="color"
            name='GroupColor'
            defaultValue='#000'
             value={form.color[0]}
            onChange={(e) => 
                {
               
                    form.color[1](e.nativeEvent.srcElement.value)
                }
            }
            />
        </div>
        <div  style={{width:'100%',display:'flex',flexDirection:"row"}}>
        <Button disabled={
                     !isFormValid()
                } onClick={
            ()=>{
                    
                    let payload = {
                        name:  form.name[0],
                        color: form.color[0]
                    }

                    axios.post('/group',payload).then((response)=>{
                        save(response.data)
                    }).catch((error)=>{console.log(error)})
                }}>Save</Button>  
                <div style={{flex:'1'}}></div>
                
                <Button onClick={()=>{closeGroupModal()}}>Cancel</Button>
        </div>
        
        </div>
    </>
    );
}