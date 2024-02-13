import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Myprojects from '../Components/Myprojects'
import Myprofile from '../Components/Myprofile'


function Dashboard() {
  const[username,setUsername] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
    setUsername(sessionStorage.getItem("username"))
    }else{
    setUsername("")
    }
  },[])

  return (
<>
      <Header insideDashBoard></Header>
      <div style={{marginTop:"100px"}} className='container'>
        <h1> Welcome {username.split(" "[0])} </h1>
        <div className='row'>
        <div className='col-lg-8'>
        <Myprojects></Myprojects>
        </div>
        <div className='col-lg-4'>
        <Myprofile></Myprofile>
        </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard