import { Select, TextField, MenuItem, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { Input } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './EditImage.css'
import EXIF from 'exif-js';
import { GPSSelect } from '../GPSSelect/GPSSelect';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { CreateGroup } from '../CreateGroup/CreateGroup';
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

/*Képek szerkesztése*/
export function EditImage({save,closeModal, inputImage, isModalOpen,editImage}){
    
    const [open, setOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    const closeGroupModal = function() {
        setIsGroupModalOpen(false);
    }

    const saveGroup = function(created){
        setGroups(groups.concat([created]))
        closeGroupModal()
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

    const [clickedGroup, setClickedGroup] = useState({});

    const close = function(latitude,longitude){
        console.log(latitude,longitude)
        form.latitude[1](latitude)
        form.longitude[1](longitude)
        setOpen(false)
    }
    console.log(inputImage)

    let form = {
        id: useState(inputImage.id),
        name:  useState(inputImage.name),
        description: useState(inputImage.description),
        group:  useState({color: "transparent"}),
        image:  useState(inputImage.image),
        latitude: useState(inputImage.latitude),
        longitude:useState(inputImage.longitude)
      }

    let [groups, setGroups] = useState([]);
    useEffect(()=>{
        axios.get("/group").then((response)=>{
            setGroups(response.data);

            form.group[1](response.data.find((x)=>{return x.id=inputImage.group.id}))
          
        });
    },[]);



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
    const [isEditGroupModalOpen, setisEditGroupModalOpen] = useState(false);

    const closeEditGroupModal = function(){
        setisEditGroupModalOpen(false)
    }

    const saveGroupEdit = function(saved){
        axios.get("/group").then((response)=>{
            setGroups(response.data);
           
        });
        form.group[1]({color: "transparent"})
        setisEditGroupModalOpen(false)
    }
    
    const getSelect = function(){
        return <Select 
            placeholder={form.group[0].name}
            style={{background: form.group[0].color}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.group[0]}
            label={form.group[0].name}
            onChange={(e)=>{
                form.group[1](e.target.value)
            
                console.log(form.group[0])
             }}
        >
 {groups.map((group)=>{
                return(<MenuItem selected={form.group[0].id == group.id} style={{background: group.color}} value= {group}>
                   <div style={{width:'100%',display:'flex',flexDirection:'row'}}>

                   <div>
                        <div>{group.name}</div>
                    </div>

                    <div style={{flex:'1'}}></div>
                    
                    <div>
            
                        <EditIcon onClick={(e)=>{
                             setisEditGroupModalOpen(true)
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
       
    }

    return (

        
    <>
       <Modal open={isGroupModalOpen}>
         <Box sx={style2}>
            <CreateGroup closeGroupModal={closeGroupModal} save={saveGroup}></CreateGroup>

         
        </Box>
      </Modal>

      <Modal open={isEditGroupModalOpen}>
                                <Box sx={style2}>
                                <EditGroup input={clickedGroup} save={saveGroupEdit} closeGroupModal={closeEditGroupModal}></EditGroup>
                                </Box>
      
                            </Modal>
        <Modal
        open={open}
        
        
        
      >
         <Box sx={style}>
            <GPSSelect close={close}></GPSSelect>
        </Box>
      </Modal>
   
    <div className="formContainer">



        <TextField value={form.name[0]} onChange={ (e) => form.name[1](e.target.value) } label="name" variant="outlined" />
        <Textarea className="textArea" value={form.description[0]} onChange={ (e) => form.description[1](e.target.value) } label="description" variant="outlined" />
        {getSelect()}
        
        <div>
            {showImage()}
        </div>
        <Input type="file"
         onChange={ (e) => {
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

        <div style={{display:'flex',flexDirection:"row"}}>
                <Button disabled={!isFormValid()}
                onClick={()=>{
                    
                    let payload = {
                        name:  form.name[0],
                        description: form.description[0],
                        group:  form.group[0],
                        image:   form.image[0],
                        latitude:  form.latitude[0],
                        longitude: form.longitude[0]
                    }

                    axios.put(`/image/${inputImage.id}`,payload).then((response)=>{
                        editImage(response.data)
                        closeModal(true);
                    }).catch((error)=>{console.log(error)})
                }}>Save</Button>  
                <div style={{flex:1}}></div>
                <Button onClick={()=>{closeModal()}}>Cancel</Button>
        </div>
    </div>
    </>
    )
}