import { supabase } from "./supabase";
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);
  if (error) {
    throw new Error("Guest could not be created");
  }
  return data;
}
export async function updateGuest() {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error("Guest could not be updated");
  }
}
export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");
  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBooking(bookingID) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingID)
    .single();

  if (error) throw new Error("Booking could not get loaded");

  return data;
}
