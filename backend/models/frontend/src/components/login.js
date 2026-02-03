import React,{useState} from "react";
import axios from "axios";
export default function Login(){
    const[form,setForm]=useState({email:"",password:""});
    const login=async()=>{
        const res=await axios.post("https://finvault-77kp.onrender.com",form);
        localStorage.setItem("token",res.data.token);
        alert("Login successful");
    };
    return(
        <div className="container">
            <h2>Login</h2>
            <input placeholder="Email"
            onChange={e =>setForm({...form,email:e.target.value})}/>
            <input placeholder="Password" type="password"
            onChange={e =>setForm({...form,password:e.target.value})}/>
            <button onClick={login}>Login</button>
        </div>
    );
}