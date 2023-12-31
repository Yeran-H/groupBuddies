import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getStaffBoard = () => {
  return axios.get(API_URL + "staff", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "manager", { headers: authHeader() });
};

const getOwnerBoard = () => {
  return axios.get(API_URL + "owner", { headers: authHeader() });
};

const updateStudent = async (username, data) => {
  return await axios.patch("http://localhost:8080/api/student/" + username, data);
};

const getUser = (username) => {
  return axios.get("http://localhost:8080/api/user/" + username);
};

const createStudyGroup = async (data) => {
  return await axios.post(`http://localhost:8080/api/${data.username}/createStudyGroup`, data);
}

const getStudyGroups = (username) => {
  return axios.get(`http://localhost:8080/api/${username}/getStudyGroups`);
}

const deleteStudyGroup = (groupId) => {
  return axios.delete(`http://localhost:8080/api/deleteStudyGroup/${groupId}`);
}

const joinStudyGroup = (data) => {
  return axios.patch(`http://localhost:8080/api/joinStudyGroup/${data.groupId}`, data);
}

const leaveStudyGroup = (data) => {
  return axios.patch(`http://localhost:8080/api/leaveStudyGroup/${data.groupId}`, data);
}

// eslint-disable-next-line
export default {
  getPublicContent,
  getUserBoard,
  getStaffBoard,
  getManagerBoard,
  getOwnerBoard,
  updateStudent,
  getUser,
  createStudyGroup,
  getStudyGroups,
  deleteStudyGroup,
  joinStudyGroup,
  leaveStudyGroup
};