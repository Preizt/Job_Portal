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

export const getAllJobPosts = async(reqHeader)=>{
  return await commonAPI("get","/alljobpost",reqHeader)
}