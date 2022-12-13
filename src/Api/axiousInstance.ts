import axios from "axios";
export const API_KEY_WEATHER = "2c07b8cc95e07c9de397352f452f6324";

export const instance = axios.create({
  baseURL: "https://api.openweathermap.org",
});
