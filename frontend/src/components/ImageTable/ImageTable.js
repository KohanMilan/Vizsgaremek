import "./ImageTable.css"
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { Modal } from "@mui/base";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditImage } from "../EditImage/EditImage";

/*Képek táblázata*/
export function ImageTable({rows,setRows,editImage}){
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

  let [isModalOpen,setIsModalOpen] = useState(false);
  let [clickedImage,setClickedImage] = useState({});
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

 
  const closeModal = function(){
    setIsModalOpen(false);

  }
  const closeEditModal = function(row){
    setClickedImage(row);
    setIsEditModalOpen(false);
  }
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
  return (
    <>
    <Modal open={isModalOpen}>
      <Box sx={style}>
      <ImageViewer row={clickedImage} close={closeModal} timestampToDateTime={timestampToDateTime}></ImageViewer>
      </Box>
      
    </Modal>

    <Modal open={isEditModalOpen}>
      <Box sx={style}>
      <EditImage editImage={editImage} inputImage={clickedImage} closeModal={closeEditModal}></EditImage>
      </Box>
      
    </Modal>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  style={{borderBottom:'5px solid black',borderTop:'1px solid black'}} >
            <TableCell style={{borderRight:'1px solid black'}} align="right">ID</TableCell>
            <TableCell style={{borderRight:'1px solid black'}} align="right">Image</TableCell>
            <TableCell style={{borderRight:'1px solid black'}} align="right">Name</TableCell>
            <TableCell style={{borderRight:'1px solid black'}} align="right">User</TableCell>
            <TableCell style={{borderRight:'1px solid black'}} align="right">Date</TableCell>
            <TableCell style={{borderRight:'1px solid black'}} align="right">Group</TableCell>
            <TableCell style={{borderRight:'1px solid black'}} align="right">Delete</TableCell>
            <TableCell  align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow style={{background:index%2==0 ? 'silver':'transparent'}} 
            onClick={()=>{
              if(!isEditModalOpen){
                setIsModalOpen(true);
                setClickedImage(row);
              }
            
            }}
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right"> 
                  <img style={{width:'100px',height:'100px'}} src={"data:image/png;base64, "+row.image}></img>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.user.firstname} {row.user.lastname} </TableCell>
              <TableCell align="right">{timestampToDateTime(row.date)}</TableCell>
              <TableCell align="right">{row.group.name}</TableCell>
              <TableCell align="right"><DeleteIcon onClick={(e) =>
                        {
                          e.stopPropagation()
                          if(window.confirm('Are you sure you want to delete?')){
                           
                            axios.delete(`/image/${row.id}`).then((response)=>{
                             
                              setRows(rows.filter((x)=>{
                                  return x.id != row.id;
                              }))
                          })
                          }
                         
                         
                        }
                       
                    }></DeleteIcon></TableCell>
              <TableCell align="right"><EditIcon onClick={(e)=>{
                  e.stopPropagation();
                  if(!isModalOpen){
                    setClickedImage(row);
                  setIsEditModalOpen(true);
                  }
                
              }

              }></EditIcon></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}