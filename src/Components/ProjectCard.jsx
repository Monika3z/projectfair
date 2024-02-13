import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import SERVER_URL from '../services/serverUrl';

function ProjectCard({project}) {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>  
    <Card className='shadow mb-5 btn ' style={{ width: '28rem' }} onClick={handleShow} >
    <Card.Img variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
    <Card.Body>
    <Card.Title>{project?.title}</Card.Title>

    </Card.Body>
    </Card>
    
    <Modal size='lg' show={show} onHide={handleClose}> 
        <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<Row className='align-items-center'>
  <Col sm={12} md={6}>
  <img height={'200px'} width={'300px'} src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
  </Col>
  <Col sm={12} md={6}>
<h2 className='fw-bold text-primary'>{project?.title}</h2>
<p className='text-black fw-bold'> <span className='text-success'>Project Overview :</span> {project?.overview}</p>
<p className='text-black fw-bold'> <span className='text-success'>Language used : </span>{project?.languages}</p>
</Col>
</Row>

<div className='mt-3'>
  <a href={project?.github} target='_blank' className='btn'> 
  <i style={{color:"black" , cursor:"pointer"}} className='fa-brands fa-github'></i> </a>
 <a href={project?.website}> <i style={{color:"black" , cursor:"pointer"}} className='fa-solid fa-link'></i></a>
</div>

  </Modal.Body>
  </Modal>

</>
)
}

export default ProjectCard