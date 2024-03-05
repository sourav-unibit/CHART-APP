import React, { useEffect, useMemo } from 'react'
import MessageContainer from './components/MessageContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { io } from "socket.io-client";
import Login from './components/Login'
import SignUp from './components/Signup'
import AllState from './Context/Context';
function App() {
  const {state:onlineUserInfo}=AllState()
  console.log(onlineUserInfo)
  const socket = useMemo(
    () =>
      io("http://localhost:8000", {
        withCredentials: true,
      }),
    []
  );
  useEffect(() => {
    const userId=localStorage.getItem("userId");
    socket.on("connect", () => {
      socket.emit("online-user",{socketId:socket.id,userId});
      socket.on("get-online-user",(id)=>{
        console.log("id----------->",id)
      })
  },[])
})



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Login/>} />
      <Route path="/chart" element={ <MessageContainer/>}/>
      <Route path="/signup" element={ <SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  


  )
}

export default App