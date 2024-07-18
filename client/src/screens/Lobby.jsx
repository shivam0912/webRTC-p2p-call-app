import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../context/SocketProvider"
import { useNavigate } from "react-router-dom";


function Lobby() {

    const [email,setEmail] = useState("")
    const [room,setRoom] = useState("")
    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmit=useCallback((e)=>{
        //so form automatically submit na ho
        e.preventDefault();
      
        socket.emit('room:join',{email,room})
        
    },[email,room,socket])

    const handleJoinRoom = useCallback((data)=>{
      const {room} = data
      navigate(`/room/${room}`)
    },[navigate])

    useEffect(()=>{
      //if we get from backend 
      socket.on("room:join",handleJoinRoom);
      return ()=>{
        socket.off("room:join",handleJoinRoom)
      }
    },[socket,handleJoinRoom])
  
  return (
    <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email Id</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />

            <br /><label htmlFor="room-code">Room Code</label>
            <input value={room} onChange={(e)=> setRoom(e.target.value)} type="text" id="room-code" />
            
            <br /><button>Join</button>
        </form>
    </div>
  )
}

export default Lobby