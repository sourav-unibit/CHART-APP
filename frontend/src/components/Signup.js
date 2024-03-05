import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [fullName,setFullName]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [reEnterPassword,setreEnterPassword]=useState("");
    const [gender,setGender]=useState("male");
    const navigation=useNavigate()
    const handleSetUserName=async(e)=>{
        setUserName(e.target.value)
    }
    const handleSetFullName=async(e)=>{
        setFullName(e.target.value)
    }
    const handleSetPassword=async(e)=>{
    
        setPassword(e.target.value)
    }
    const handlesetGender=async(e)=>{
    
        setGender(e.target.value)
    }
    const handleSetReEnterPassword=async(e)=>{
        setreEnterPassword(e.target.value)
    }
    const handleSignUp=async(e)=>{
        e.preventDefault()
       
        if(!password||!userName||!fullName||!reEnterPassword){
            alert("all field required")
            return;
        }
        if(password!==reEnterPassword){
            alert("password should match")
            return;
        }
        try{
        const user =await fetch("http://localhost:8000/api/auth/signup",{
            method:"post",
            body:JSON.stringify({
                fullName,
                userName,
                password,
                confirmPassword:reEnterPassword,
                gender
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const userData= await user.json();
        console.log(userData)
        // navigation('/login')
        navigation('/')
    }catch(error){
        console.log("error form login",error.message)
    }
    }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
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

    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" >
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-200 ">
            full Name 
          </label>
          <div className="mt-2">
            <input
              id="fullName"
              name="fullName"
              type="fullName"
              value={fullName}
              onChange={(e)=>handleSetFullName(e)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
          <div className="flex items-center justify-between">
            <label htmlFor="re-enter-password" className="block text-sm font-medium leading-6 text-gray-200">
             Re-enter-Password
            </label>
          </div>
          <div className="mt-2">
            <input
            value={reEnterPassword}
            onChange={(e)=>handleSetReEnterPassword(e)}
              id="re-enter-password"
              name="re-enter-password"
              type="password"
              
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
        </div>
        <select value={gender} onChange={(e)=>{handlesetGender(e)}}>
            <option> male </option>
            <option> female </option>
        </select>

        <div>
          <button
           onClick={(e)=>handleSignUp(e)}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already Member?{' '}
        <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          log in
        </a>
      </p>
    </div>
  </div>
  )
}

export default SignUp