import axios from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.type";

const BASE_URL = "http://localhost:3000/api/auth";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/login`, data);
  return response.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/register`, data);
  return response.data;
};
