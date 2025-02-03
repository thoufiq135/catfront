import { useEffect } from 'react'
import { useState } from 'react'
import{io} from "socket.io-client"
import { setids,setchatbox,setsendmsg } from './slice1'
import { useDispatch,useSelector } from 'react-redux'
import "./index.css"

function Chat() {
  const[msg,setmsg]=useState("")
  const[semsg,setsemsg]=useState([])
  const[remsg,setremsg]=useState([])
  const[warn,setwarn]=useState(false)
  const dispatch=useDispatch()
const id=useSelector((state)=>state.chatting.fid)
const recive=useSelector((state)=>state.chatting.recivemsg)

useEffect(()=>{setremsg((p)=>[...p,recive])},[recive])
// console.log("working",id)
function endhandle(){
  dispatch(setchatbox(false))
}
function sendhandle(){
  if (msg) {
    setsemsg((p)=>[...p,msg])
    console.log("hi")
    dispatch(setsendmsg(msg))  
  } else {
    setwarn(true)  
  }

}
  return (
    <>
    
      <div>
      <div id='chatpar'>
        <span id='fid'> Connected to {id}</span>
        <div id='chatbox'>{semsg.map((e)=>(<span id='smss'>you={e}</span>))}{remsg.map((e)=>((<span id='mss'>friend={e}</span>)))}</div>
      <span id='msg'><input id={warn?'msgenter':"redi"} placeholder='Enter msg' onChange={(e)=>setmsg(e.target.value)}/><button id='send' onClick={sendhandle}>Send</button></span>
      <button id='end' onClick={endhandle}>End Chat</button>
    </div>
      </div>
    </>
  )
}

export default Chat;