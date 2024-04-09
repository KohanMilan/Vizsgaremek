import React from 'react';
import './ImageViewer.css';

/*Képek megtekintése és tulajdonságnak megjelenítése*/
export function ImageViewer({ row, close, timestampToDateTime }) {
  const fullName = `${row.user.firstname} ${row.user.lastname}`;

  const handleClose = () => {
    close();
  };

  return (

     <>
        <button className="closeButton" onClick={handleClose}>
          X
        </button>
        
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
          <img style={{width:'50vw'}} src={"data:image/png;base64, "+row.image}></img>
          </div>
          
          </>


  );
}

