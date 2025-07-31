import commonAPI from "./commonAPI";

export const registerUser = async (reqBody) => {
  return await commonAPI("post", "/register", reqBody);
};

export const loginUser = async (reqBody) => {
  return await commonAPI("post", "/login", reqBody);
};