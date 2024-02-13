import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import Homeimg from '../assets/Project-image.webp'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getHomeProjectAPI } from '../services/allAPI';




function Home() {

    const [allProjects,setAllProjects]= useState([])
    const[loginStatus,setLoginStatus]=useState(false)
    const navigate = useNavigate()
    
    const getHomeProject = async ()=>{
        try{
            const result = await getHomeProjectAPI()
            if(result.status===200){
                setAllProjects(result.data)
            }
        }catch(err){
            console.log(err);
        }
    }
    console.log(allProjects);
    useEffect(()=>{
        getHomeProject();
        if(sessionStorage.getItem("token")){
            setLoginStatus(true)
        }else{
            setLoginStatus(false)
        }
    },[])
    
    const handleNavigate = () =>{
    
        if(loginStatus===true){
            navigate('/projects')
    
        }else{
            toast.warning("Please Login First")
        }
    }

  return (
    <>
    <div style={{height:"100vh"}} className='w-100 d-flex bg-dark justify-content-center align-items-center'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6'>
                <h1 className='fw-bold fs-1 text-white my-3'><i class="fa-solid fa-fire"></i> PROJECT FAIR</h1>
                <p style={{ textAlign:'justify' , color:"white"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quisquam, in pariatur ad neque sed. 
                Quisquam, iste recusandae exercitationem eligendi fuga est officiis fugit doloribus 
                laboriosam sint vitae distinctio sequi!</p>
                {loginStatus?  
                <Link className='btn btn-success text-black mt-3' to={'/dashboard'}>Manage your Projects <i class="fa-regular fa-paper-plane"></i> </Link> :
                <Link className='btn btn-success fw-bold text-black' to={'/login'}>Explore <i class="fa-regular fa-paper-plane"></i></Link> 
                }
                </div>
                <div className='col-lg-1'></div>
                <div className='col-lg-4'>
                <img className='img-fluid my-4 rounded' src={Homeimg} alt="" />
                </div>
            </div>
        </div>
    </div>

    <div className='mt-5'>
    <h1 className='text-center'>Explore Our Projects</h1>


    <marquee>
    <div className='d-flex'>
   {allProjects.length >0 &&
   allProjects.map((project,index)=>(
  <div key={index} className='project me-3'>
  <ProjectCard project={project}/> 
  </div>
  ))      
  }
  </div>
</marquee> 
 

<div className='text-center mb-3'>
<button onClick={handleNavigate} className='btn btn-primary'>View More Projects</button>
</div>
</div>
<ToastContainer theme='colored'/>
</>
)
}

export default Home