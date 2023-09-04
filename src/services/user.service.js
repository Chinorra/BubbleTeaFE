import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:3000'

const getPublicContent = () => {
    return axios.get(API_URL + 'all')
}

const getUserBoard = () => {
    return axios.get(API_URL + 'user', {headers: authHeader() })
}

const getModerateBoard = () => {
    return axios.get(API_URL + 'mod', { headers: authHeader() })
}

const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader()})
}

const userService = {
    getPublicContent,
    getUserBoard,
    getModerateBoard,
    getAdminBoard
}

export default userService