import { HoursResponse } from "@/types/hours";
import { api } from "@/lib/http";

export async function fetchHours() {
  const { data } = await api.get<HoursResponse>(
    `/application/pages/business_hours`,
  );
  return data.data;
}
