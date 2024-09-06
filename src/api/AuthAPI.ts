import { isAxiosError } from "axios";
// types
import api from "@/lib/axios";
import type { User, UserLoginForm } from "@/types/index";

export async function getUser() {
  try {
    const { data } = await api<User>("api/auth/admin/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = "api/auth/admin/login";
    const { data } = await api.post<{ token: string }>(url, formData);
    localStorage.setItem("AUTH_TOKEN", data.token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
