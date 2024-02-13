import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../Context/TokenAuth';



function Header({insideDashBoard}) {

  const{isAuthoried,setIsAuthoried} = useContext(tokenAuthContext)

  // logout and navigate to landing page 
  const navigate = useNavigate()
  const handleLogout = ()=>{
  sessionStorage.clear() 
  setIsAuthoried(false)
  navigate('/')

  }


  return (
  <div>
  
  <Navbar style={{width:'100%', position:"fixed" , top:"0px" , zIndex:5}} className="bg-dark p-3">
        <Container>
        <Navbar.Brand>
        <Link to={"/"} style={{textDecoration:"none"}}>   <h4 className='text-light fw-bold'> <i class="fa-solid fa-fire"></i> PROJECT FAIR </h4> </Link>
        </Navbar.Brand>
        {
  insideDashBoard &&
  <div className='ms-auto'>
  <button onClick={handleLogout} style={{ textDecoration: "none" }} className='btn btn-link text-info fw-bold'> LOG OUT </button>
  </div>
}

    </Container>
    </Navbar>
    </div>

)
}

export default Header