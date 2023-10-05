import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { ApiClient } from 'adminjs'

const api = new ApiClient()
const socket = io();

const Dashboard = () => {

    const [message, setMessage] = useState('');      

      useEffect(() => {
        socket.on("RECEIVE_MESSAGE",(data)=>{console.log(data)});
      }, []);
      
const sendMessage = async() =>{
  await socket.emit("SEND_MESSAGE", {
    'user_consumer': 1,
    'user_receptor': 2,
    message});

  setMessage('');
}

return <>

<input 
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button onClick={async()=> {
    await sendMessage();
}}>Enviar</button>


</>

}

export default Dashboard;