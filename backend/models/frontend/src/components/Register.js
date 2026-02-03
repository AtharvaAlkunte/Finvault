import React,{useState} from "react";
import axios from "axios";
export default function Register(){
    const[form,setForm]=useState({name:"",email:"",password:""});
    const submit=async()=>{
        await axios.post("https://finvault-77kp.onrender.com",form);
        alert("Registered");
    };
    return (
        <div className="container">
            <h2>Register</h2>
            <input placeholder="Name"
            onChange={e => setForm({...form,name:e.target.value})}/>
            <input placeholder="Email"
            onChange={e => setForm({...form,email:e.target.value})}/>
            <input placeholder="Password" type="password"
            onChange={e => setForm({...form,password:e.target.value})}/>
            <button onClick={submit}>Register</button>
        </div>
    );
}