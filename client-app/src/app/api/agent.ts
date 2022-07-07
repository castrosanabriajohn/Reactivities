import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

// Create an object to store the common requests to be sent to axios [post, put, delete]

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body = {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body = {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

// Create an object to store the requests to a particular entity

const activitiesRequests = {
  list: () => requests.get("/activities"),
};

const agent = {
  activitiesRequests,
};

export default agent;
