import { createContext, useContext, useReducer } from "react";
import Reducer from "./Reducer";

const MyContext=createContext();

const initialState={
    sliderUser:null,
    onlineUserInfo:[],
    
}


export const MyContextProvider=({children})=>{
    const [state,dispatch]=useReducer(Reducer,initialState);
    return(
        <MyContext.Provider value={{state,dispatch}}>
            {children}
        </MyContext.Provider>
    )
}

export default function AllState(){
    const context=useContext(MyContext);
    if(!context){
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
}