import { supabase } from "@/lib/dbclient";

interface CreateBookingArgs {
  room: string;
  booked_by: string;
  authorizer: string;
  booking_date: string;
  booking_time_start: string;
  booking_time_end: string;
  booking_unique_timestamp: string;
}

export async function createBooking({
  authorizer,
  booked_by,
  booking_date,
  booking_time_end,
  booking_time_start,
  room,
  booking_unique_timestamp,
}: CreateBookingArgs) {
  const { data, error } = await supabase
    .from("schedule_computer_lab")
    .insert([
      {
        authorizer,
        booked_by,
        booking_date,
        booking_time_end,
        booking_time_start,
        room,
        booking_unique_timestamp,
      },
    ])
    .select();

  return { data, error };
}

export async function getAllBookings() {
  let { data, error } = await supabase
    .from("schedule_computer_lab")
    .select("*");

  return { data, error };
}

export async function removeBooking(id: number) {
  const { error } = await supabase
    .from("schedule_computer_lab")
    .update({ status: "cancel" })
    .eq("id", id)
    .select();

  return { error };
}
