import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectAPI } from '../services/allAPI';
import { updateResponseContext } from '../Context/ContextShare';



function Edit({project}) {

  const{editResponse,setEditResponse} = useContext(updateResponseContext)
  const[projectData,setProjectData] = useState({
  id:project._id, title:project.title,languages:project.languages,
  overview:project.overview,github:project.github,website:project.website,projectImage:""})
  
  const[preview,setPreviw] = useState()
  const [show,setShow] = useState(false)
  const handleShow = ()=>setShow(true)
  const handleClose = ()=>{
  setShow(false)
  setProjectData({   id:project._id, title:project.title,languages:project.languages,
  overview:project.overview,github:project.github,website:project.website,projectImage:""}) 
  setPreviw("")

  }

  useEffect(()=>{
    if(projectData.projectImage){
      setPreviw(URL.createObjectURL(projectData.projectImage))
    }else{
      setPreviw("")
    }
  },[projectData.projectImage])

  const handleUpadeProject = async ()=>{
    const{id,title,languages,overview,github,website,projectImage} = projectData 
    if(!title|| !languages||!overview||!github||!website){
    toast.info("please fill the form completely")

    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type": preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        console.log("proceed to API call"); 
        try{
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            handleClose()

            // share response to my project component
            setEditResponse(result.data)
            
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    
    }
  }

  return (

    <>
    <button onClick={handleShow} style={{textDecoration:'none'}} className='btn btn-link text-success d-flex fw-bold'><i className='fa-solid fa-edit fa-2x me-2'></i></button>
  
    <Modal size='lg'
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='row'>
          <div className='col-lg-4'>
         <label>
          <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
          <img className='img-fluid' src={ preview?preview:`${SERVER_URL}/uploads/${project?.projectImage}`} alt="project upload pic" />
         </label>
          </div>
          <div className='col-lg-8'>
            <div className='mb-3'>
            <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />  
            </div>
            <div className='mb-3'>
            <input className=' border rounded p-2 w-100 ' type="text" placeholder='Language Used' value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />  
            </div>
            <div className='mb-3'>
            <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Github link' value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} />  
            </div>
            <div className='mb-3'>
            <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Website link' value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />  
            </div>
            <div className='mb-3'>
            <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Overview' value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />  
            </div>
  
  
          </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
          Cancel
          </Button>
          <Button onClick={handleUpadeProject}  variant="primary">Update</Button>
          </Modal.Footer>
          </Modal>
          <ToastContainer autoClose={3000} theme='colored'/>

    </>
  
  )
}

export default Edit