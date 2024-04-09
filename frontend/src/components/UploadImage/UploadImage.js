import { Select, TextField, MenuItem, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { Input } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './UploadImage.css'
import EXIF from 'exif-js';
import { GPSSelect } from '../GPSSelect/GPSSelect';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CreateGroup } from '../CreateGroup/CreateGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { EditGroup } from '../EditGroup/EditGroup';

const style = {
    position: 'absolute',

    width: '100vw',
    height:'100vh',
    bgcolor: 'background.paper',
   
  
  };

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    'max-height': 'calc(100vh - 100px)',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '300px',
    
}

/*Képek feltöltése a táblázatba*/
export function UploadImage({save,closeModal}){
    
    const [open, setOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    const closeGroupModal = function() {
        setIsGroupModalOpen(false);
    }

    const isFormValid = function(){
        if(form.name[0] == ""){
            return false;
        }
        if(form.description[0] == ""){
            return false;
        }
        if(form.group[0].id == null){
            return false;
        }
        if(form.image[0] == ""){
            return false;
        }
        if(form.latitude[0] == 0){
            return false;
        }
        
        if(form.longitude[0] == 0){
            return false;
        }
        return true;
    }

    const close = function(latitude,longitude){
        console.log(latitude,longitude)
        form.latitude[1](latitude)
        form.longitude[1](longitude)
        setOpen(false)
    }
    const createModalClose = function(){
        setCreateModalOpen(false);
    }


    const saveGroup = function(created){
        setGroups(groups.concat([created]))
        closeGroupModal()
    }

    let form = {
        name:  useState(""),
        description: useState(""),
        group:  useState({color: "transparent"}),
        image:  useState(""),
        latitude: useState(0),
        longitude:useState(0)
      }
    let [groups, setGroups] = useState([]);
    useEffect(()=>{
        axios.get("/group").then((response)=>{
            setGroups(response.data);
           
        });
    },[]);

  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedGroup, setClickedGroup] = useState({});

    
    const closeEditGroupModal = function(){
        setIsModalOpen(false)
    }

    const saveGroupEdit = function(saved){
        axios.get("/group").then((response)=>{
            setGroups(response.data);
           
        });
        form.group[1]({color: "transparent"})
        setIsModalOpen(false)
    }

    const showImage=function(){
        if(form.image[0]!=""){
            return (
                 <>
                    <img className='uploadedImage' src={"data:image/png;base64, "+form.image[0]}></img>
                    <div className="gps">
                        <div>
                        Latitude:  <Input disabled={true} value={form.latitude[0]}></Input>
                        </div>
                        <div>
                        Longitude: <Input disabled={true} value={form.longitude[0]}></Input>
                        </div>
                      
                      

                    </div>
                    <Button onClick={()=>{setOpen(true)}} className="gpsButton" variant="contained" >
                        <MapIcon></MapIcon>
                    </Button>
                 </>
            )
        }else{
            return <></>
        }
    }

    



    return (


    <>
        <Modal open={open}>
         <Box sx={style}>
            <GPSSelect close={close}></GPSSelect>
        </Box>
      </Modal>

      <Modal open={isGroupModalOpen}>
         <Box sx={style2}>
            <CreateGroup closeGroupModal={closeGroupModal} save={saveGroup}></CreateGroup>
        </Box>
      </Modal>

      <Modal open={isModalOpen}>
                                <Box sx={style2}>
                                <EditGroup input={clickedGroup} save={saveGroupEdit} closeGroupModal={closeEditGroupModal}></EditGroup>
                                </Box>
      
                            </Modal>
   
    <div className="formContainer">
        <TextField value={form.name[0]} onChange={ (e) => form.name[1](e.target.value) } label="name" variant="outlined" />
        <Textarea className="textArea" value={form.description[0]} onChange={ (e) => form.description[1](e.target.value) } label="description" variant="outlined" />
        <Select
            style={{background: form.group[0].color}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.group[0]}
            label="Group"
            onChange={(e)=> form.group[1](e.target.value)}
        >
            {groups.map((group)=>{
                return(<MenuItem style={{background: group.color}} value= {group}>
                   <div style={{width:'100%',display:'flex',flexDirection:'row'}}>

                   <div>
                        <div>{group.name}</div>
                    </div>

                    <div style={{flex:'1'}}></div>
                    
                    <div>
            
                        <EditIcon onClick={(e)=>{
                            setIsModalOpen(true)
                            setClickedGroup(group)
                        }
                          
                        }>
                           
                            
                            
                            </EditIcon>
                    </div>

                    <div>
                        <DeleteIcon onClick={(e) =>
                        {
                            e.stopPropagation()
                        if(window.confirm('Are you sure you want to delete?')){
                          console.log(group);
                          axios.delete(`/group/${group.id}`).then((response)=>{
                            setGroups(groups.filter((x)=>{
                                return x.id != group.id;
                            }))
                            form.group[1]({color: "transparent"})
                        }).catch((error)=>{
                            if(error.response.data.status==400){
                                alert('Group is still in use, please remove related images first.')
                            }
                    })
                        }}
                       
                    }></DeleteIcon>
                    </div>

                   </div>


                </MenuItem>)
            })}
            <MenuItem style={{justifyContent:'center',alignItems:'center'}}  value= {{color: "transparent"}} onClick={(e)=>{
                e.preventDefault();
                setIsGroupModalOpen(true);
            }

            }>
                <AddIcon></AddIcon>

            </MenuItem>
        </Select>
        <div>
            {showImage()}
        </div>
        <Input type="file"
         onChange={ (e) => {
            console.log(e.nativeEvent.srcElement.files[0])
            if(e.nativeEvent.srcElement.files[0]){
                const reader = new FileReader();
            reader.readAsBinaryString(e.nativeEvent.srcElement.files[0]);
            var image = new Image();

            reader.onload = function(event) {
                image.onload = function() {
                    if (this.width) {
                        form.image[1](btoa(event.target.result))
                        EXIF.getData(e.nativeEvent.srcElement.files[0], function () {
                            let data =EXIF.getAllTags(this)
                            if(data.GPSLatitude && data.GPSLongitude && data.GPSLatitude[2] && data.GPSLongitude[2]){
                                form.latitude[1](data.GPSLatitude[2])
                                form.longitude[1](data.GPSLongitude[2])

                            }else{
                                console.log("NO EXIF DATA")
                                form.latitude[1](0)
                                form.longitude[1](0)
                            }
                        });

                    }
                };
                image.src = URL.createObjectURL(e.nativeEvent.srcElement.files[0]); 
              };
           
            }
           
         } }
        accept="image/png, image/gif, image/jpeg" ></Input>
        <div style={{display:'flex',"flex-direction":"row"}}>
            
                <Button disabled={
                     !isFormValid()
                } onClick={()=>{
                    
                    let payload = {
                        name:  form.name[0],
                        description: form.description[0],
                        group:  form.group[0],
                        image:   form.image[0],
                        latitude:  form.latitude[0],
                        longitude: form.longitude[0]
                    }

                    axios.post('/image',payload).then((response)=>{
                        save(response.data)
                    }).catch((error)=>{console.log(error)})

                }}>Save</Button>  
                <div style={{flex:1}}></div>
                <Button onClick={()=>{closeModal()}}>Cancel</Button>

        </div>
    </div>
    </>
    )
}
