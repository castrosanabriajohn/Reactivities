import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// Create an object to store the common requests to be sent to axios [post, put, delete]

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body = {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body = {}) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

// Create an object to store the requests to a particular entity

const activitiesRequests = {
  list: () => requests.get<Activity[]>("/activities"),
};

const agent = {
  activitiesRequests,
};

export default agent;
