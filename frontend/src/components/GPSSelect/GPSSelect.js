import "./GPSSelect.css"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import * as React from 'react';
import { useMapEvent } from "react-leaflet";


function MapClick({close}) {
  const map = useMapEvent('click', (event) => {
      close(event.latlng.lat,event.latlng.lng)
  })
  return null
}


/*Képek helyének megadása*/
export function GPSSelect({close}){
  const position = [47.9530, 21.7271];

 


 
  return(
      <MapContainer  style={{ height: '100%', width: '100%' }} center={position} zoom={13}  minZoom={5} maxZoom={16} scrollWheelZoom={true}>
        <MapClick close={close}></MapClick>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
    </MapContainer>)
}