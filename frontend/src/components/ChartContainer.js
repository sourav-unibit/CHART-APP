import React, { useEffect, useState } from 'react'
import ChartSearchBar from './ChartSearchBar'
import "./css/scrollbar.css"
import AllState from '../Context/Context'
export default function ChartContainer() {
 const [messages,setMessages]=useState([])
 const {state:{sliderUser}}=AllState()
  const handleGetChart=async()=>{
    if(sliderUser&&sliderUser.userId){
    try{
      const message=await fetch(`http://localhost:8000/api/message/${sliderUser?.userId}`,{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
        }
      })
      const messageData=await message.json()
      if(messageData.responseCode==200){
        setMessages(messageData.data)
      }
    }catch(error){
      console.log(error.message)
    }
  }
}

  useEffect(()=>{
    handleGetChart()
  },[sliderUser])
  const presentUser=localStorage.getItem('userId')
  
  return (
    <div className='bg-slate- col-span-2 bg-teal-950 flex h-full p-6 flex-col'>
       <h1 className='text-center text-lg text-slate-200 bg- rounded-md mb-3'>{sliderUser?.userName}</h1>
      <div className='text-slate-100 mb-2 h-[420px] overflow-auto scrollbar ' >
        {messages.map((item,index)=>{
          let isSender=item.senderId==presentUser;
          const messageTime = new Date(item.createdAt);
const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

          return(
            <div key={index} className={`flex ${isSender?'flex-row-reverse':'flex-row'} px-2`}>
              <div>
    <p  className={`latter text-sm  ${isSender?'bg-violet-600':'bg-blue-500'}  my-1 py-1 px-2 rounded-md  text-slate-50`}>{item.message}</p>
    <p className='text-xs text-end mr-2 text-gray-400'>{formattedTime}</p>
    </div>
    </div>
          )
        })}
      </div>
      {sliderUser?<ChartSearchBar />:''}
    </div>
  )
}


