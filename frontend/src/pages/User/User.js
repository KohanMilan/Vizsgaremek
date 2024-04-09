import "./User.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {UserTable} from '../../components/UserTable/UserTable';
import { UserUpload } from "../../components/UserUpload/UserUpload";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    'max-height': 'calc(100vh - 100px)',
    overflow: 'auto',
  };

export function User({isLoggedIn,isAdmin,username}) {
    const navigate = useNavigate();
    useEffect(()=>{
        if (!isLoggedIn || !isAdmin) {
            navigate("/Login")
        }else{
          axios.get('/user').then((response)=>{
            console.log(response.data)
            setRows(response.data)
          })
        }
    },[]);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [rows,setRows] = useState([]);
   
    const save = function(created){
        setRows(rows.concat([created]))
        setOpen(false)
    }

    const close = function(){
        setOpen(false)
    }
    return(
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
         <UserUpload closeModal={close} save={save}></UserUpload>
        </Box>
      </Modal>
        <div className="addButton">
            <div>  
                <Fab onClick={handleOpen} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> 
            </div> 
        </div>
     
        <UserTable username={username} rows={rows} setRows={setRows}></UserTable>
        
    </div>
    )
}