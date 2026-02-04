import React,{useState} from "react";
import axios from "axios";
export default function KycUpload(){
    const userId="12345";
    const [panData,setPandata]=useState({});
    const [digilockerData,setdigi]=useState({});
    const [selfieUrl,setSelfie]=useState("");

    const scanPAN=async()=>{
        const res=await axios.post("https://finvault-77kp.onrender.com");
        setPandata(res.data.panData);
    };
    const fetchdigi=async()=>{
        const res=await axios.get("https://finvault-77kp.onrender.com");
        setdigi(res.data);
    };
    const uploadSelfie=async()=>{
        const res=await axios.post("https://finvault-77kp.onrender.com");
        setSelfie(res.data.url);
    };
    const SubmitKyc=async()=>{
        await axios.post("https://finvault-77kp.onrender.com",{
            userId,
            panData,
            digilockerData,
            selfieUrl
        });
        alert("KYC submitted");
    };
    return (
        <div className="container">
            <h2>KYC Upload</h2>
            <button onClick={scanPAN}>Scan Pan</button>
            <button onClick={fetchdigi}>Fetch digilocker</button>
            <button onClick={uploadSelfie}>Upload selfie</button>
            <button onClick={SubmitKyc}>Submit KYC</button>

            <pre>{JSON.stringify({panData,digilockerData,selfieUrl},null,2)}</pre>
        </div>
    );
}