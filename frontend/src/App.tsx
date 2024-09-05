import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected!")
      setSocket(socket);
    }
    socket.onmessage = (msg) => {
      console.log("Received msg ", msg.data);
      setMsg2(msg.data);
    }
    return () => {
      socket.close();
    }
  }, [])

  if (!socket){
    return <div>
      Connecting to web socket ....
    </div>
  }
  
  return (
    <>
      <input onChange={(e) => {
        setMsg(e.target.value)
      }}></input><br/>
      <button onClick={() => {
        socket.send(msg);
      }}>Send MSG</button><br/>
      <div>
        Latest Message (live): <br/>
        {msg}
      </div>
        Latest Message (on button click) : <br/>
        {msg2}
      <div>

      </div>
    </>
  )
}

export default App
