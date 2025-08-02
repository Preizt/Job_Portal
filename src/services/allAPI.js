import commonAPI from "./commonAPI";

export const registerUser = async (reqBody) => {
  return await commonAPI("post", "/register", reqBody);
};

export const loginUser = async (reqBody) => {
  return await commonAPI("post", "/login", reqBody);
};

export const postJob = async(reqBody,reqHeader)=>{
  return await commonAPI("post","/postjob",reqBody,reqHeader)
}

export const getAllJobPosts = async(reqHeader,searchKey)=>{
return await commonAPI("get",`/alljobpost?search=${searchKey}`,"",reqHeader)
}

export const deletePost = async(reqHeader,id)=>{
  return await commonAPI("delete",`/job/${id}`,{},reqHeader)
}

export const updateJob = async (reqBody, reqHeader, id) => {
  return await commonAPI("put", `/job/${id}`, reqBody, reqHeader);
};

export const singlePostView = async (id) => {
  return await commonAPI("get",`/job/${id}`, "");
};

export const getApplicantAllPost = async()=>{
 return await commonAPI("get","/alljob","")
}

