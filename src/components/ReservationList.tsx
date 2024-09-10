"use client";
import ReservationCard from "./ReservationCard";

export default function ReservationList({ bookings }: any) {
  return (
    <ul className="space-y-6">
      {bookings.map((booking: any) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  );
}
