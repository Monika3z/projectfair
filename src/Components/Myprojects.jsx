import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, getUserProjectAPI, } from '../services/allAPI'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'

function Myprojects() {

  const{editResponse,setEditResponse} = useContext(updateResponseContext)
  const{addResponse,setAddResponse} = useContext (addResponseContext) 


  const [allProjects, setAllProjects]=useState([])

  const getUserProject = async ()=>{
    try{
      const token = sessionStorage.getItem("token")
      if (token){
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await getUserProjectAPI(reqHeader)
        if (result.status === 200){
          setAllProjects(result.data);
        }
      }
    } catch (err){
      console.log(err);
    }
  };
  console.log(allProjects);
  useEffect(()=>{
    getUserProject()
  },[addResponse,editResponse])

  const handleDeleteProject = async(projectId,reqHeader)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteProjectAPI(projectId,reqHeader)
        if(result.status==200){
          getUserProject()
        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (

  <div className='border rounded p-2'>
  <div className='d-flex justify-content-between'> 

  <h4>My Projects</h4>
  <Add></Add>
  </div>
<div className='mt-4 '>

{allProjects.length>0? allProjects.map((project,index)=>(
    <div key={index} className='border rounded d-flex justify-content-between align-items-center mb-3 p-2'>
  <h5>{project?.title}</h5>
  <div className='icons d-flex align-items-center'>
  <Edit project={project}></Edit>
  <a href={project?.github} target='_blank'className='btn btn-link ms-2'><i style={{height:'34px'}} className='fa-brands fa-github fa-2x'></i></a>
  <button onClick={()=>handleDeleteProject(project._id)} className='btn btn-link text-danger ms-2'><i className='fa-solid fa-trash fa-2x'></i></button>

</div>
</div>

  ))  : <div className='fw-bold'> No projects Added </div>
}
</div>
</div>
  )
}

export default Myprojects