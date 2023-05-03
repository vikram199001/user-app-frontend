import axios from "axios";

const token = JSON.parse(localStorage.getItem("accessToken"));

const instance = axios.create({
  baseURL: process.env.BASE_API_URL || "http://localhost:5000/",
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'

  },
});

instance.interceptors.response.use(
  function (response) {
    console.log(response);
    // Any status code within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    console.log(error);
    // Any status codes outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((request) => {
  // add auth header with jwt if account is logged in and request is to the api url
  request.headers.authorization = `Bearer ${JSON.parse(
    localStorage.getItem("accessToken")
  )}`;

  return request;
});

export default instance;
