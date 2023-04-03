import axios from "axios";
import { User } from "./types";

const DEVELOPMENT = true;
const url = DEVELOPMENT ? 'http://127.0.0.1:3030/api' : 'https://app.gccody.com/api';

// Login using axios to the predefined url but instead of passing the email and password in the url we pass it in the body
export const login = (email: string, password: string) =>
  axios.get<User | string>(`${url}/login/${email}/${password}`);

export const register = (email: string, password: string) =>
  axios.get<User | string>(`${url}/register/${email}/${password}`);

export const updateUsername = (username: string, uid: string) =>
  axios.patch<User | string>(`${url}/username/${uid}/${username}`);

export const getProfile = (uid: string) => 
  axios.get<User | string>(`${url}/profile/${uid}`);