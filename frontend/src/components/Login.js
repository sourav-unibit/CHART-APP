import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const navigation=useNavigate()
    const handleSetUserName=async(e)=>{
        setUserName(e.target.value)
    }
    const handleSetPassword=async(e)=>{
    
        setPassword(e.target.value)
    }
    const handleLogin=async(e)=>{
        e.preventDefault()
        try{
        const user =await fetch("http://localhost:8000/api/auth/login",{
            method:"post",
            body:JSON.stringify({userName,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const userData= await user.json();
        console.log(userData)
        if(userData.error){
          alert(userData.error)
          return
        }
        navigation('/chart')
        localStorage.setItem("jwt_token",userData.token)
        localStorage.setItem("userId",userData._id)
        localStorage.setItem("userName",userData.userName)
    }catch(error){
        console.log("error form login",error.message)
    }
    }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" >
        <div>
          <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-200 ">
            User Name 
          </label>
          <div className="mt-2">
            <input
              id="userName"
              name="userName"
              type="userName"
              value={userName}
              onChange={(e)=>handleSetUserName(e)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
            value={password}
            onChange={(e)=>handleSetPassword(e)}
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
        </div>

        <div>
          <button
           onClick={(e)=>handleLogin(e)}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign up
        </a>
      </p>
    </div>
  </div>
  )
}

export default Login