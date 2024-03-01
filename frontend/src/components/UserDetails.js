import React, { useEffect, useState } from 'react'
import SearchBar from './UserSearchBar'
import AllState from '../Context/Context'

function UserDetails() {
  const [sliderUser,SetSliderUser]=useState([])
  const {dispatch}=AllState()
  const handleGetUser=async()=>{
    try{
      const userForSlider=await fetch("http://localhost:8000/api/users",{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem("jwt_token")
        }
      })
      const user=await userForSlider.json()
      if(user.responseCode===200){
        SetSliderUser(user.data)
      }
    }catch(error){
      console.log("error from handleGetUser",error.message)
    }
  }
  useEffect(()=>{
    handleGetUser();
  },[])

  const handleSwitchUser=(item)=>{
    dispatch({ type: "switch_user", payload: { userId:item._id,userName:item.userName} });
  }

  return (
    <div className='bg-slate-300 col-span-1 h-full'>
         <h1 className='text-center text-lg text-slate-800'>{localStorage.getItem("userName")}</h1>
        <SearchBar/>
        <ul role="list" className="py-6 divide-y divide-slate-400">
    {
        sliderUser.map((item,index)=>{
         return(   <li className="flex px-6 py-4 first:pt-0 last:pb-0 cursor-pointer active:bg-slate-500 hover:bg-slate-400" key={item._id} onClick={()=>handleSwitchUser(item)}>
            <img className="h-10 w-10 rounded-full" src={item.profilePic} alt="" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900">{item.userName}</p>
              <p className="text-sm text-slate-500 truncate">{item.fullName} </p>
            </div>
          </li>
         )
        })
    }
</ul>
    </div>
  )
}

export default UserDetails