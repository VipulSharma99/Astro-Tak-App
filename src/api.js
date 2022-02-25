import axios from "axios";


export const questionApi = () =>
  axios.get(
    "https://staging-api.astrotak.com/api/question/category/all"
  );

  const API = axios.create({ baseURL: "https://staging-api.astrotak.com/api/relative" });

  API.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ`;
  
    return req;
  });

  export const familyLst = () => API.get("/all");
  export const memberDelete = (uuid) => API.post(`/delete/${uuid}`);
  export const createProfile = (data)=> axios.post("https://staging-api.astrotak.com/api/relative",data,{headers:{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ"}});
  export const updateProfile = (uuid,data)=> axios.post(`https://staging-api.astrotak.com/api/relative/update/${uuid}`,data,{headers:{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ"}});