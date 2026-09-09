export interface HoursResponse {
  success: boolean;
  message: string;
  data: Data;
}


export interface Data {
  id: string;
  section_key: string;
  section_type: string;
  content: Content;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Content {
  sunday: Sunday;
  fridaySaturday: FridaySaturday;
  mondayThursday: MondayThursday;
}

export interface Sunday {
  end_time: string;
  start_time: string;
}

export interface FridaySaturday {
  end_time: string;
  start_time: string;
}

export interface MondayThursday {
  end_time: string;
  start_time: string;
}
