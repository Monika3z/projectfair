import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getAllProjectAPI } from '../services/allAPI'


function Projects() {

  const[searchKey,setSerachKey] = useState("")
  const [allProjects, setAllProjects]=useState([])

  const getAllProject = async ()=>{
    try{
      const token = sessionStorage.getItem("token")
      if (token){
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await getAllProjectAPI(searchKey,reqHeader)
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
  getAllProject()
  },[searchKey])
    

return (

<div>
<Header></Header>
<div style={{marginTop:'100px'}} className='container-fluid'>
<div className='d-flex justify-content-center '>
<h1> All Projects</h1>
</div>

<div className='justify-content-center d-flex mt-4'>
<input onChange={e=>setSerachKey(e.target.value)} style={{width:"300px"}} className='rounded p-2 text-center ' placeholder='Seach project by language' type="text" />
</div>

<Row className="mt-5">
 { allProjects.length>0? allProjects.map((project,index)=>(
  <Col key={index} sm={12} md={6} lg={4}> 
  <ProjectCard project={project}/>
</Col>

 )) :
  <div className='fw-bold'>Nothing to see</div>
 }

</Row>

</div>
</div>

)
}

export default Projects