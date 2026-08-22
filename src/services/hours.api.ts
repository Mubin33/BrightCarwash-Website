import { HoursResponse } from "@/types/hours";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchHours() {
  const { data } = await axios.get<HoursResponse>(`${API_BASE}/application/pages/business_hours`);
  return data.data;
}
