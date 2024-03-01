import React, { useState } from 'react'
import { VscSend } from "react-icons/vsc";
import AllState from '../Context/Context';
export default function ChartSearchBar() {
  const [message,setMessage]=useState("")
  const {state:{sliderUser}}=AllState()
  const handleSendMessage=async()=>{
    const resData=await fetch(`http://localhost:8000/api/message/send/${sliderUser.userId}`,{
      method:"post",
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem("jwt_token"),
        'Content-Type':'application/json'
      },
      body:JSON.stringify({message:message}) 
    })
    const data=await resData.json()
    console.log(data)
  }

  return (
    <div className="pt-2 relative">
    <input
      type="text"
      placeholder="type somthing.."
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
    />
    <span className='absolute right-0 bottom-0  px-3 py-2 cursor-pointer' onClick={()=>handleSendMessage()}>
    <VscSend className='text-xl text-blue-800' />
    </span>
  </div>
  )
}
