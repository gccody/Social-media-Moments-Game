import axios from "axios";
import { User } from "./types";

const DEVELOPMENT = true;
const url = DEVELOPMENT ? 'http://127.0.0.1:3030/api' : 'https://app.gccody.com/api';

export const login = (email: string, password: string) => 
  axios.get<User | undefined>(`${url}/login/${email}/${password}`);

export const register = (email: string, password: string) =>
  axios.get<User | string>(`${url}/register/${email}/${password}`);

export const updateUsername = (username: string, uid: string) =>
  axios.patch<User | string | undefined>(`${url}/username/${uid}/${username}`);

export const getProfile = (uid: string) => 
  axios.get<User | undefined>(`${url}/profile/${uid}`);