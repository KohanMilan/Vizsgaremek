import "./Map.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Popup,Circle} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { PopUpImageViewer } from "../../components/PopUpImageViewer/PopUpImageViewer";
import axios from "axios";
import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import { useState } from "react";
import { EditImage } from "../../components/EditImage/EditImage";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { UploadImage } from "../../components/UploadImage/UploadImage";

const style = {
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
};

export function Map({isLoggedIn}) {


  const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if (!isLoggedIn) {
            navigate("/Login")
        }
    },[]);

    function timestampToDateTime(timestamp) {
      const date = new Date(timestamp);
      
      // Get the date components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
  
      
      // Construct the date-time string
      const dateTimeString = `${year}-${month}-${day}`;
      
      return dateTimeString;
  }
    const edit = function(edited){
      
      let index=rows.indexOf(rows.find((rows) => rows.id==edited.id))
      rows[index]=edited
      setRows(rows.concat([]))
      setOpen(false)
  }


    let [images,setImages]=useState([])
    
  let [rows,setRows] = useState([]);
  
    useEffect(()=>{
      axios.get('/image').then((response)=>{
        console.log(response.data)
        setRows(response.data)
        console.log(rows)
        setImages(response.data)
      })

    },[])

    const circleOptions = { fillColor: 'blue',fillOpacity:1,color:'blue' }

    const position = [47.9530, 21.7271];

    const editImage = function(edited){
      
      let index=rows.indexOf(rows.find((rows) => rows.id==edited.id))
      rows[index]=edited
      setRows(rows.concat([]))
      setOpen(false)
  }

    let [clickedImage,setClickedImage] = useState({});
    let [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [isAddModalOpen, setisAddModalOpen] = useState(false);

    const closeAddModal= function(){
        setisAddModalOpen(false)
    }

    const saveAddModal= function(created){
      setRows(rows.concat([created]))
      setisAddModalOpen(false)

    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      'max-height': 'calc(100vh - 100px)',
      overflow: 'auto',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      zIndex:'500',
      background:'white',
      p: 4,
    };

    const closeEditModal= function(){
      setIsEditModalOpen(false)
    }

    const openEditModal = function(image){
      
      setClickedImage(image)
      setIsEditModalOpen(true)
    }



    return(
    <>
    
    <Modal style={{zIndex:500}} open={isEditModalOpen}>
      <Box sx={style}>
      <EditImage editImage={editImage} openEditModal={openEditModal}  inputImage={clickedImage} closeModal={closeEditModal} ></EditImage>
      </Box>
      
    </Modal>

    <Modal style={{zIndex:500}} 
        open={isAddModalOpen}
      >
         <Box sx={style}>
            <UploadImage closeModal={closeAddModal} save={saveAddModal}></UploadImage>
        </Box>
     </Modal>

    <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={13}  minZoom={5} maxZoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
              <MarkerClusterGroup chunkedLoading maxClusterRadius={500 }  >
              {rows.map((image,index)=>{
                  return  <Circle key={index} center={[rows[index].latitude, rows[index].longitude]} pathOptions={circleOptions} radius={15} >
                    <Popup>
                      
                          <PopUpImageViewer  inputImage={clickedImage}  openEditModal={openEditModal}  row={image} rows={rows} setRows={setRows} editImage={edit} timestampToDateTime={timestampToDateTime} ></PopUpImageViewer>
                      
                    </Popup>
                    </Circle>
                    })}
              </MarkerClusterGroup>;
      </MapContainer>
    
    <div style={{position:'absolute',zIndex:'9999',right:'20px',bottom:'20px'}}>  
                <Fab  onClick={()=>{
                    setisAddModalOpen(true)
                }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> 
            </div> 
    </>
       
    )
}