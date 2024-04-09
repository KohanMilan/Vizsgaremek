import "./List.css"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { UploadImage } from "../../components/UploadImage/UploadImage";
import { ImageTable } from "../../components/ImageTable/ImageTable";
import axios from 'axios'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    'max-height': 'calc(100vh - 100px)',
    overflow: 'auto',
  };

export function List({isLoggedIn}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    let [rows,setRows] = useState([]);
    useEffect(()=>{
      axios.get('/image').then((response)=>{
        console.log(response.data)
        setRows(response.data)
      })
    },[])
    const save = function(created){
        setRows(rows.concat([created]))
        setOpen(false)
    }

    const edit = function(edited){
      
      let index=rows.indexOf(rows.find((rows) => rows.id==edited.id))
      rows[index]=edited
      setRows(rows.concat([]))
      setOpen(false)
  }

    const close = function(){
        setOpen(false)
    }


    const navigate = useNavigate();
    useEffect(()=>{
        if (!isLoggedIn) {
            navigate("/Login")
        }
    },[]);
    
    return(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <UploadImage closeModal={close} save={save}></UploadImage>
        </Box>
      </Modal>
        <div className="addButton">
            <div>  
                <Fab onClick={handleOpen} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> 
            </div> 
        </div>
     
        <ImageTable rows={rows} setRows={setRows} editImage={edit}></ImageTable>
        
    </div>
    )
}