import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
