import commonAPI from "./commonAPI";

export const registerUser = async (reqBody) => {
  return await commonAPI("post", "/register", reqBody);
};

export const loginUser = async (reqBody) => {
  return await commonAPI("post", "/login", reqBody);
};

export const postJob = async (reqBody, reqHeader) => {
  return await commonAPI("post", "/postjob", reqBody, reqHeader);
};

export const getAllJobPosts = async (reqHeader, searchKey) => {
  return await commonAPI(
    "get",
    `/alljobpost?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const deletePost = async (reqHeader, id) => {
  return await commonAPI("delete", `/job/${id}`, {}, reqHeader);
};

export const updateJob = async (reqBody, reqHeader, id) => {
  return await commonAPI("put", `/job/${id}`, reqBody, reqHeader);
};

export const singlePostView = async (id) => {
  return await commonAPI("get", `/job/${id}`, "");
};

export const getApplicantAllPost = async () => {
  return await commonAPI("get", "/alljob", "");
};

export const savedJobPost = async (reqHeader, jobId) => {
  return await commonAPI("post", `/job`, { jobId }, reqHeader);
};

export const getUserSavedPost = async (reqHeader) => {
  return await commonAPI("get","/job",{},reqHeader)
}

export const removeSavedPost = async(reqHeader,id)=>{
  return await commonAPI("patch",`/job/${id}`,{},reqHeader)
}

export const postApply = async (reqBody,reqHeader) => {
  return await commonAPI("post","/apply",reqBody,reqHeader)
}

export const getappliedJobs  = async(reqHeader)=>{
    return await commonAPI("get","/applications",{},reqHeader)
}

export const getUserDetail = async (reqHeader) => {
  return await commonAPI("get","/user",{},reqHeader)
}