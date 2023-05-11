import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Gateway = () => {

  const [deployForm, setDeployForm] = useState({
    gatewayid: "",
    longitude: "",
    latitude: "",
    place: ""
  });
  const [addre, setAddre] = useState(null)

  const getAddress = (position) => {
    console.log(position)
    setDeployForm({
      ...deployForm,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })

  }
  const deploy = (event) => {
    event.preventDefault();
    const gateInfo = {
      "gatewayid": deployForm.gatewayid,
      "latitude": deployForm.latitude,
      "longitude": deployForm.longitude,
      "place": addre
    }
    axios.post("http://webdevMalso.pythonanywhere.com/deployGateway", gateInfo)
      .then((res) => {
        console.log(res.data)
        console.log(gateInfo)
        window.alert("Gateway" + gateInfo.gatewayid + " has been successfully Deployed")
      }
      )
      .catch((error) => console.log(error.message))

    console.log({ ...deployForm })
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeployForm({ ...deployForm, [name]: value })
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(getAddress, function () {
      console.log("error");
    }, { enableHighAccuracy: true })
  }

  useEffect(() => {
    console.log("useEffect-updating document")
    if (deployForm.latitude !== "" && deployForm.longitude !== "") {
      const address = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${deployForm.latitude}&lon=${deployForm.longitude}`;
      fetch(address)
        .then(res => res.json())
        .then(data => {
          setAddre(data.display_name);
        })
        .catch(() => {
          console.log(address)
          console.log("error")
        })
    }
    return () => {
      console.log("component unmount")
    }
  }, [deployForm.latitude, deployForm.longitude]);


  return (
    <div className='flex flex-col gap-4 justify-center items-center  w-full h-full'>
    
      <div className='border-2 p-5 rounded-md border-black w-[40%] flex flex-col items-center'>
      <div className='flex w-full    '>
        <label className='py-2 mr-3 w-[35%] ' htmlFor="gateid">GatewayId: </label>
        <input className='border border-gray-400 px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type="text" name="gatewayid" id="gateid" value={deployForm.gatewayid} onChange={handleChange} required />
      </div>
        <div className='flex w-full py-2'>
          <label className='py-2 mr-3 w-[35%] ' htmlFor="long">Longitude: </label>
          <input className='border border-gray-400 px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type="number" name='longitude' id='long' value={deployForm.longitude} onChange={handleChange} required />
        </div>
        <div className='flex w-full  py-2'>
          <label className='py-2 mr-3 w-[35%] ' htmlFor="lat">Latitude: </label>
          <input className='border border-gray-400 px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type="number" name='latitude' id='lat' value={deployForm.latitude} onChange={handleChange} required />
        </div>
        {addre !== null && <label className='pl-8 py-2 text-bold text-sm' htmlFor="placet">{addre} </label>}<br />
        <div className='flex gap-2'>
        <button className=" bg-green-500 rounded animate-waving-hand  p-2 font-bold  hover:scale-110 duration-200  ease-in-out  text-white  uppercase hover:bg-green-400" onClick={getLocation}>Get Location</button>
        <button className=" bg-red-500 rounded animate-waving-hand  p-2 font-bold  hover:scale-110 duration-200  ease-in-out  text-white  uppercase hover:bg-red-400" onClick={deploy}>submit</button>
        </div>
      </div>
      {/* <div className='border-2 border-black w-[40%]'>
        <label className='pl-8' htmlFor="placet">Deploy At: </label>
        <input type="radio" name='place' id='place' value="River Side" onChange={handleChange} required />River Side
        <input type="radio" name='place' id='place' value="Inside City" onChange={handleChange} required />Inside City

      </div> */}
      
    </div>
  )
}

export default Gateway