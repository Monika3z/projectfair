import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const tokenAuthContext = createContext()

function TokenAuth({children}) {
    const [isAuthoried,setIsAuthoried] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthoried(true)
        }else{
            setIsAuthoried(false)
        }

    },[isAuthoried])


  return (
    <>
    <tokenAuthContext.Provider value={{isAuthoried,setIsAuthoried}}>
         {children}
    </tokenAuthContext.Provider>
    </>
  )
}

export default TokenAuth