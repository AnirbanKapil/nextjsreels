import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;


if(!MONGODB_URL){
    throw new Error("Plz define mongoDB URL in env file");
};


let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn : null , promise : null}
}

export async function connectionToDatabase () {
    if(cached){
        return cached.conn
    };

    if(!cached.promise){
        const opts = {
            bufferCommands : true,
            maxPoolSize : 10
        }
    };

    cached.promise = mongoose.connect()
}