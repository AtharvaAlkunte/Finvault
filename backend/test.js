const mongoose=require("mongoose");
const User=require("./models/User");
async function runtest(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/finvault");
        console.log("Mongodb connected");
        const user=await User.create({
            name:"Atharva",
            email:"atharv@gmail.com",
            password:"123456"

        });
        console.log("User created");
        console.log(user);
        await mongoose.disconnect();
        console.log("Mongodb is connected");
    } catch(error){
        console.error("Error: ",error);
    }
}
runtest();