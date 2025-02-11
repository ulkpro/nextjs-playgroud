import api from "@/utils/axiosInstance";
import { Widget } from "@/components/homeWidget/types";

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data; // { user, role, permissions, token }
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const fetchWidgetData = async (role: string, userId: string) => {
  const response = await api.get(`/widgets?role=${role}&userId=${userId}`);
  return response.data;
};