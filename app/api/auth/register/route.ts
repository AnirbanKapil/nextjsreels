import { NextRequest , NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User"; 
import { error } from "console";



export async function POST (request : NextRequest) {
    try {
         const {email , password} = await request.json(); 
         
         if(!email || !password){
            return NextResponse.json(
                {
                    error : "Email & Password are required"
                },
                {
                    status : 400
                } 
            )
         }

        await connectToDatabase();
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {
                    error : "Email already registered"
                },
                {
                    status : 400
                }
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {
                Message : "User registered successfully"
            },
            {
                status : 200
            }
        )


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error : "Failed to register user",
            },
            {
                status : 500
            }
        )  
    }
}