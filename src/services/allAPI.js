import { commonAPI } from "./comonAPI"
import SERVER_URL from "./serverUrl"


// register API
export const registerAPI = async(user)=>{
  return  await commonAPI("POST",`${SERVER_URL}/register`,user,"") 
}

// login API
export const loginAPI = async(user)=>{
  return  await commonAPI("POST",`${SERVER_URL}/login`,user,"") 
}

// add project API
export const addProjectAPI = async(reqBody,reqHeader)=>{
  return  await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader) 
}

// get home project
export const getHomeProjectAPI = async()=>{
  return  await commonAPI("GET",`${SERVER_URL}/home-project`,"","") 
}

// get all project and searchKey
export const getAllProjectAPI = async(searchKey,reqHeader)=>{
  return  await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,"",reqHeader) 
}
 
// get user project
export const getUserProjectAPI = async(reqHeader)=>{
  return  await commonAPI("GET",`${SERVER_URL}/user-project`,"",reqHeader) 
}

//user/edit
export const updateUserProfileAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

// project/edit/
export const updateProjectAPI = async(projectId,reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// remove project
export const deleteProjectAPI = async (projectId,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader) 
}

