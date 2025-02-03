import {createSlice} from "@reduxjs/toolkit"
import{io} from "socket.io-client"
import { useEffect } from "react"
const chatting=createSlice({
    name:"chat",
    initialState:{
        id:"",
        fid:"",
        chatbox:false,
        sendmsg:"",
        recivemsg:"",
        
     

    },
    reducers:{
        setids:(state,action)=>{
            state.id=action.payload
                                    
        },
        setfids:(state,action )=>{
            state.fid=action.payload
        },
        setchatbox:(state,action)=>{
            state.chatbox=action.payload
        },
        setsendmsg:(state,action)=>{
            state.sendmsg=action.payload
            console.log("splice message=",state.sendmsg)
        },
        setremsg:(state,action)=>{
            state.recivemsg=action.payload
            console.log("splice message=",state.recivemsg)
            console.log("output=",state.recivemsg)

        }

    }
})
export const{setids,setfids,setchatbox,setsendmsg,setremsg}=chatting.actions;
export default chatting.reducer;