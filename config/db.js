const mongoose= require("mongoose");

class Dbconnect{
    async connectDb(){
        try{

            mongoose.connect(process.env.DB_URI);
            console.log("db connect succesfully")

        }catch (err){
            throw err
        }
    }
}

module.exports=new Dbconnect