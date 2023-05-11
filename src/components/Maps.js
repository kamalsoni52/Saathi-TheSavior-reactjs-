import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet";

import {MyContext} from "./App"

const position = [28.7041, 77.1025]


const Maps = ({clicked}) => {

  
const gatewayInfo = useContext(MyContext);
console.log("gatewayInfo",gatewayInfo)


  const customIcon = new Icon({
    iconUrl: require("./img/access-point.png"),
    iconSize: [25, 25]
  })

  

  return (
    <MapContainer center={position} zoom={5} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        
        gatewayInfo !== undefined && gatewayInfo.map((gate) =>        
        {
          
          return (
            <Marker
            key={gate.key}
              position= {[gate.value.latitude,gate.value.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: (e)=>
                {
                  console.log(e.latlng.lat)
                  const gateid = gatewayInfo.filter((gat)=> e.latlng.lat == gat.value.latitude && e.latlng.lng == gat.value.longitude  )
                  clicked(gateid)
                },
              }}>
              <Popup offset={[0, -10]}>
                {gate.value.place}
              </Popup>
            </Marker>

          )

        })
      }
    </MapContainer>
  );
}

export default Maps