import dotenv from "dotenv"
import jwt from "jsonwebtoken"

//load file .env
dotenv.config()

const createToken = (data) =>{
    return jwt.sign({payload:data},process.env.SECRET_KEY,{
        algorithm:"HS256",
        expiresIn:"20s" // m: minute, s:second, h:hour, d:day
    })
}

const createRefToken = (data) =>{
    return jwt.sign({payload:data},process.env.SECRET_KEY,{
        algorithm:"HS256",
        expiresIn:"7d" // m: minute, s:second, h:hour, d:day
    })
}

export {
    createToken
}