import axios from "axios";

function configToken(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function singIn(body) {
  const res = axios.post(`${process.env.REACT_APP_API_URL}/signin`, body);
  return res;
}

function signUp(body) {
  const res = axios.post(`${process.env.REACT_APP_API_URL}/signup`, body);
  return res;
}

function logout(token) {
  const config = configToken(token);
  const res = axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, config);
  return res;
}

const apis = {
singIn,
  signUp,
  logout
};

export default apis;
