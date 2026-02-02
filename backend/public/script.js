
const API_BASE="http://localhost:5000/kyc";
fetch("http://localhost:5000/kyc/submit", {
method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
    });
let panData=null;
let digilockerData=null;
let selfieUrl=null;
let userId=null;

async function scanPAN() {
   try{
    const res=await axios.post(`${API_BASE}/pan`);
    panData=res.data.panData;
    alert("PAN scanned successfully");
    document.getElementById("pan").value=panData.pan_number;
    document.getElementById("name").value=panData.name;
    document.getElementById("dob").value=panData.dob;
   } catch(err){
    console.error(err);
    alert("pan scan failed");
   }
}

async function fetchDigilocker(){
try{
    const res=await fetch(`${API_BASE}/digilocker`);
    const data=await res.json();
    digilockerData=data.digilocker;
    alert("digilocker fetched");
    document.getElementById("output").innerText="Aadhar: "+digilockerData+"\nAddress: "+digilockerData.address;
} catch(err){
    console.error(err);
    alert("Digilocker failed");
}
}

async function uploadSelfie(){
   try{
    const res=await fetch(`${API_BASE}/selfie`,{method:"POST"});
    const data=await res.json();
    selfieUrl=data.url;
    alert("Selfie uploaded");

   } catch(err){
    console.error(err);
    alert("Selfie upload failed");
   }
}
async function submitKYC() {
    const payload = {
        userId: "693e86cb43d4f2673a5ad3f1", // MongoDB _id
        panData: {
            pan_number: "ABCDE1234F",
            name: "Virat Kohli",
            dob: "2005-01-05"
        },
        digilockerData: {
            address: "Delhi, India"
        },
        selfieUrl: "https://example.com/selfie.jpg"
    };

    try {
        const res = await fetch("http://localhost:5000/kyc/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        alert("Submit failed");
    }
}
