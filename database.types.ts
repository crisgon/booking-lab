export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      schedule: {
        Row: {
          authorizer: string;
          booked_by: string;
          booking_date: string;
          booking_time_end: string;
          booking_time_start: string;
          created_at: string;
          id: number;
          room: string;
          status?: string;
        };
        Insert: {
          authorizer: string;
          booked_by: string;
          booking_date: string;
          booking_time_end: string;
          booking_time_start: string;
          created_at?: string;
          id?: number;
          room: string;
        };
        Update: {
          authorizer?: string;
          booked_by?: string;
          booking_date?: string;
          booking_time_end?: string;
          booking_time_start?: string;
          created_at?: string;
          id?: number;
          room?: string;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface Schedule {
  authorizer: string;
  booked_by: string;
  booking_date: string;
  booking_time_end: string;
  booking_time_start: string;
  created_at: string;
  id: number;
  room: string;
  status?: string;
}
