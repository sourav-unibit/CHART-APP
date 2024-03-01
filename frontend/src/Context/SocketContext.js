import { Children, createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"
export const SocketContext=createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket,setSoket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const user=localStorage.getItem("jwt_token")
    useEffect(()=>{
        if(user){
            const socketConn=io("http://localhost:8000",{
                transports: ['websocket'],
                upgrade: false,
                query:{
                    userId:localStorage.getItem("userId")
                }
            })
            setSoket(socketConn);
            
            socketConn.on("getOnlieUsers",(users)=>{
                setOnlineUsers(users)
            })

            return () => {
                // Check if the socket is defined and connected before closing
                if (socketConn && socketConn.connected) {
                    console.log('Closing socket connection');
                    socketConn.close();
                }
        
                // Set the socket in state to null
                setSoket(null);
            };
        
        }else{
            if(socket){
                socket.close()
                setSoket(null)
            }
        }
    },[user])
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}