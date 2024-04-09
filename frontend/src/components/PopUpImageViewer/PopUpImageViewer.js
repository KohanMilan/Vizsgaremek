import React from 'react';
import './PopUpImageViewer.css';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';


/*Képek megtekintése és tulajdonságnak megjelenítése a TÉRKÉPEN*/
export function PopUpImageViewer({ openEditModal,row, rows, setRows, closeModal, timestampToDateTime }) {

  console.log(row)
  
  const fullName = `${row.user.firstname} ${row.user.lastname}`;

  let [isModalOpen,setIsModalOpen] = useState(false);
 
 

  
 
  return (
     <>
       
          <div>
            <strong>ID:</strong> {row.id}
          </div>
          <div>
            <strong>Image name:</strong> {row.name}
          </div>
          <div>
            <strong>Description:</strong> {row.description}
          </div>
          <div>
            <strong>Latitude:</strong> {row.latitude}
          </div>
          <div>
            <strong>Longitude:</strong> {row.longitude}
          </div>
          <div>
            <strong>Name:</strong> {fullName}
          </div>
          <div>
            <strong>Date:</strong> {timestampToDateTime(row.date)}
          </div>
          <div>
            <strong>Group name:</strong> {row.group.name}
          </div>
          <div className="imageContainer" style={{ backgroundImage: `url(data:image/png;base64, ${row.image})` }}>
          <img style={{width:'100%'}} src={"data:image/png;base64, "+row.image}></img>
          </div>
          <div><DeleteIcon onClick={(e) =>
                        {
                          
                          if(window.confirm('Are you sure you want to delete?')){
                           
                            axios.delete(`/image/${row.id}`).then((response)=>{
                             
                              setRows(rows.filter((x)=>{
                                  return x.id != row.id;
                              }))
                          })
                          }
                         
                         
                        }
                       
                    }></DeleteIcon>
                    <EditIcon onClick={(e)=>{
                      if(!isModalOpen){
                        console.log(row)
                        openEditModal(row)
                      }                    
                  }
                  }></EditIcon></div>
          <div></div>
    </>
  );
}

