import { PRIVATE_API_URL } from "@/constants/apiRoute";
import axios from "axios";

export const api = axios.create({
    baseURL: PRIVATE_API_URL,
});
