import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { ApiClient } from 'adminjs'

const api = new ApiClient()
const socket = io();

const Dashboard = () => {

    const [message, setForm] = useState('');  
    const [name, setForm2] = useState(''); 
    const [email, setForm3] = useState('');     

      useEffect(() => {
        socket.on("RECEIVE_FORM",(data)=>{console.log(data)});
      }, []);
      
const sendForm = async() =>{
  await socket.emit("SEND_FORM", {
    'user_consumer': 1,
    'user_receptor': 2,
    'cpf':12345678,
    name,
    email,
    message});

  setForm('');
  setForm2('');
  setForm3('');
}

return <>

<input 
value={message}
onChange={(e)=>setForm(e.target.value)}
/>

<input 
value={name}
onChange={(e)=>setForm2(e.target.value)}
/>

<input 
value={email}
onChange={(e)=>setForm3(e.target.value)}
/>

<button onClick={async()=> {
    await sendForm();
}}>Enviar</button>


</>

}

export default Dashboard;