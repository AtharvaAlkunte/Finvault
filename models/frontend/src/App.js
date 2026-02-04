import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import KycUpload from "./components/KycUpload";
import Dashboard from "./components/Dashboard";
function App(){
    return (
        <>
        <Register/>
        <Login/>
        <kycUpload/>
        <Dashboard/>
        </>
    );
}
export default App;