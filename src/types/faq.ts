export interface ApiFaq {
    id: string;
    question: string;
    answer: string;
    display_order: number;
    created_at: string;
}

export interface FaqResponse {
    success: boolean;
    message: string;
    data: ApiFaq[];
}
export interface WashWithPurposeFaq {
  id: string
  updated_at: string
  created_at: string
  icon: string | null
  question: string
  ans: string
  is_publish: boolean
  display_order: number
}

export interface FaqResponse {
    success: boolean;
    message: string;
    data: ApiFaq[];
}
export interface WashWithPurposeFaq {
  id: string
  updated_at: string
  created_at: string
  icon: string | null
  question: string
  ans: string
  is_publish: boolean
  display_order: number
}

export interface WashWithPurposeFaqResponse {
  success: boolean
  message: string
  data: WashWithPurposeFaq[]
}
