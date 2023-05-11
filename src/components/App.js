import React, { Component, createContext, useEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

const MyContext = createContext();


const App = () => {

  
  const [gatewayInfo, setGatewayInfo] = useState([])
  const [gatewayData, setGatewayData] = useState([])
  const [gtid, setid] = useState(null)
  const [data, setData] = useState({
    temperature: "",
    humadity: "",
    waterLevel: ""

  })

  useEffect(() => {
    console.log("ComponentDidMount")
    axios.get("http://webdevMalso.pythonanywhere.com/gatewayInfo")
      .then(resp => setGatewayInfo((gatewayInfo) => {
        if(resp.data!==null){
        const updatedInfo = Object.entries(resp.data).map(([key, value]) => ({ key, value }))
        console.log(updatedInfo)
        return updatedInfo
        }
      }))
      .catch(err => console.log(err))
    axios.get("http://webdevMalso.pythonanywhere.com/gatewayData")
      .then(resp => setGatewayData((gatewayData) => {
        if(resp.data!==null){
        const updatedData = Object.entries(resp.data).map(([key, value]) => ({ key, value }))
        console.log(updatedData)
        return updatedData
        }
      }))
      .catch(err => console.log(err))

  }, [])

  useEffect(()=>{
    {gtid!==null &&  fun()}

  },[gtid])

  const fun = () =>{
    console.log(gtid)
    const val = gatewayData.filter((gate)=>gate.key==gtid)
    console.log(val)
    setData({...data, 
      temperature: val[0].value.temperature,
      humadity: val[0].value.humadity,
      waterLevel: val[0].value.waterLevel
    })
  }

  const clicked = (gate) => {
    console.log(gate)
    setid((gtid)=>{
      const updatedId = gate[0].key      
      return updatedId
    })
    
  }

  
  return (
    
    <div className="flex max-w-[1320px] mx-auto h-screen border-4 border-black">
      <div className=" border-4 border-red-300 w-[20%] h-full">
      <Sidebar/>
      </div>
      <div className="w-[80%] border-4 border-green-300 h-full " >
      <Routes>
      
      <Route path="/deploy" element={<Form />}/>
      <Route exact path="/" element = {
      <MyContext.Provider value={gatewayInfo}>
        <Dashboard 
        clicked={clicked}
        gateid = {gtid}
        temp = {data.temperature}
        huma = {data.humadity}
        wat = {data.waterLevel}/>
      </MyContext.Provider>
      }/>
     
      </Routes>
      </div>
    </div>
    
  );
}

export default App;
export {MyContext};
