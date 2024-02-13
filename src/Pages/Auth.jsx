import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Loginimg from '../assets/Benefits-of-OTP.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { Spinner } from 'react-bootstrap';
import { tokenAuthContext } from '../Context/TokenAuth';

function Auth({insideRegister}) {

  const{isAuthoried,setIsAuthoried} = useContext(tokenAuthContext)
  const[loginStatus,setLoginStatus] = useState(false)
  const navigate = useNavigate()
  const [userInputData,setUserInputData] = useState({
  username:"",email:"",password:"" 
  })
  const handleRegister = async (e)=>{
    e.preventDefault()
    // console.log(userDataInput)
    const {username,email,password} = userInputData 
    if(!username||!email||!password){
    alert("Please fill the form completely!!")
    }else{
    // alert("Proceed to register Api")   
    try{
      const result = await registerAPI(userInputData) 
      console.log(result);
      if(result.status===200){
      toast.info(`Welcom ${result.data.username}...please login to enter our site`)
      setUserInputData({username:"",email:"",password:""}) 
      // navigate to login
      setTimeout(()=>{
      navigate("/login"),2000})
      }else{
      toast.error(result.response.data)
      }
    }catch(err){
      console.log(err);  
    }
    }
  }

// login
  const handleLogin = async (e)=>{
  e.preventDefault()
  // console.log(userDataInput)
  const {email,password} = userInputData
  if(!email||!password){
    alert("Please fill the form completely!!") 
  }else{
  try{
    const result = await loginAPI({email,password}) 
    console.log(result);
    if(result.status===200){
    // store token,username
    sessionStorage.setItem("username",result.data.exitingUser.username)
    sessionStorage.setItem("token",result.data.token)
    sessionStorage.setItem("userDetails",JSON.stringify(result.data.exitingUser))

    setLoginStatus(true)
    setIsAuthoried(true) 
    setTimeout(()=>{
    setUserInputData({email:"",password:""})
    // navigate to landingpage
    navigate("/")
    setLoginStatus(false)
    },2000)
    }else{
    toast.error(result.response.data)
    }
  }catch(err){
    console.log(err);  
  }
  }
}

  return (
    <div style={{width:'100%', height:'100vh'}} className='justify-content-center align-items-center d-flex'>
    <div className='container w-75'>
    <Link to={'/'} className='text-black fw-bold' style={{textDecoration:'none'}}> <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Back To Home</Link>
    <div className='card-shadow p-5 bg-primary'>
    <div className='row align-items-center'>

    <div className='col-lg-6'>
    <img className='w-100 img-fluid' src={Loginimg} alt="" />
    </div>

  <div className='col-lg-6'>
  <h1 className='fw-bold text-light mt-2'><i style={{height:'41px'}} class="fa-solid fa-fire"></i> PROJECT FAIR</h1>
  <h5>Sign {insideRegister?'Up':'In'} to your Account</h5>
  
   <Form>
    {
    insideRegister&&
  
     <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control type="email" placeholder="Enter name" 
        value={userInputData.username} onChange={e=>setUserInputData({...userInputData,username:e.target.value})} />
        </Form.Group>
      }
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" 
        value={userInputData.email} onChange={e=>setUserInputData({...userInputData,email:e.target.value})} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPswd">
        <Form.Control type="password" placeholder="Enter password"
        value={userInputData.password} onChange={e=>setUserInputData({...userInputData,password:e.target.value})} />
        </Form.Group>
        {
          insideRegister?
          <div>
            <button onClick={handleRegister} className='btn btn-success mb-2'>Register</button>
            <p className='text-light'>Already have an Account? Click here to <Link to={'/login'} className='text-info'> Login</Link></p>
          </div> : 
          <div>
            <button onClick={handleLogin} className='btn btn-success mb-2'>Login  {loginStatus&&<Spinner animation="border" variant="dark" />}</button>
            <p className='text-light'>New User? Click here to <Link to={'/register'} className='text-info'>Register</Link></p>
          </div>
        }
 
    </Form>
   </div>
   <ToastContainer autoClose={3000} theme='colored'/>

    </div>
    </div>
    </div>
    </div>

  )
}

export default Auth