import { isAxiosError } from "axios";
// types
import api from "@/lib/axios";
import type {
  Game,
  NewGameForm,
  NewPlayerForm,
  User,
  UserLoginForm,
} from "@/types/index";

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

export async function createGame(formData: NewGameForm) {
  try {
    const url = "api/games";
    await api.post(url, formData);
    return;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getGames() {
  try {
    const url = "api/games";
    const { data } = await api<Game[]>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getGameById(gameId: string) {
  try {
    const url = `api/games/${gameId}`;
    const { data } = await api<Game>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createPlayer(
  formData: NewPlayerForm & { gameId: string }
) {
  try {
    const url = "api/auth/create-player";
    await api.post(url, formData);
    return;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
