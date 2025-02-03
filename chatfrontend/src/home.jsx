import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import Chat from './chat';
import "./index.css";
import { setids, setfids, setchatbox, setremsg } from "./slice1.jsx";

function Home() {
  const [id, setid] = useState(0);
  const [room, setroom] = useState(0);
  const [fid, setfid] = useState(0);
  const [warning, setwarning] = useState(false);
  const [socket, setsocket] = useState(null);
  const [showchat, setshowchat] = useState(false);
  const [sendmess, setsendmess] = useState("");

  const naam = useSelector((state) => state.chatting.id);
  const send = useSelector((state) => state.chatting.sendmsg);
  console.log("coming",send)
  const dispatch = useDispatch();
  const fidss = useSelector((state) => state.chatting.chatbox);

  useEffect(() => {
    console.log("Initializing socket...");
    const socket = io("https://chatback-plum.vercel.app/");
  
    setsocket(socket);
  
    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
      dispatch(setids(socket.id));
      setid(socket.id);
    });

    socket.on("receive", (message) => {
      console.log("📩 Received message from friend:", message);
      dispatch(setremsg(message));
    });
  
    console.log("Socket event listeners set up ✅");
  
    return () => {
      console.log("Cleaning up socket...");
      socket.off("connect");
      socket.off("receive");
      socket.disconnect();
    };
  }, [dispatch]); 

  // ✅ Send message when `sendmess` changes
  useEffect(() => {
    if (socket && send && fid) {
      console.log(`📤 Sending message: ${send} to ${fid}`);
      socket.emit("send", send, fid);
    }
  }, [send, socket, fid]);

  async function Check() {
    if (!socket) return;
    
    socket.emit("checkid", fid);
    socket.on("exists", (Bool) => {
      setwarning(Bool);
      dispatch(setfids(fid));
    });
  }

  function Chating() {
    dispatch(setchatbox(warning));
    setshowchat(true);
  }

  return (
    <>
      <h1>Zoombo</h1>
      <span id='ids'>Your ID={id}</span>
      <div id="con1">
        <div id="con2">
          <input id={warning ? "id" : "warn"} placeholder='Friend id' onChange={(e) => { setfid(e.target.value) }} />
          <button id='check' onClick={Check}>check</button>
          {warning ? <button id='chatbtn' onClick={Chating}>Chat</button> : ""}
        </div>
        <div id='room'>
          <input placeholder='Room name' id={warning ? "warn" : "name"} onChange={(e) => { setroom(e.target.value) }} />
          {warning ? <button id='joinbtn'>Join</button> : ""}
        </div>
      </div>
      <button id="create">Creat Room+</button>
      {fidss ? <Chat /> : ""}
    </>
  );
}

export default Home;
