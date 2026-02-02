import React,{useState} from "react";
import axios from "axios";
export default function KycUpload(){
    const userId="12345";
    const [panData,setPandata]=useState({});
    const [digilockerData,setdigi]=useState({});
    const [selfieUrl,setSelfie]=useState("");

    const scanPAN=async()=>{
        const res=await axios.post("http://localhost:5000/kyc/pan");
        setPandata(res.data.panData);
    };
    const fetchdigi=async()=>{
        const res=await axios.get("http://localhost:5000/kyc/digilocker");
        setdigi(res.data);
    };
    const uploadSelfie=async()=>{
        const res=await axios.post("http://localhost:5000/kyc/selfie");
        setSelfie(res.data.url);
    };
    const SubmitKyc=async()=>{
        await axios.post("http://localhost:5000/kyc/submit",{
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