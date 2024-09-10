import { getSettings } from "@/app/cabins/[id]/page";
import { getBookedDatesByCabinId } from "../app/cabins/[id]/page";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }: any) {
  const [settings, bookedDates]: any = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin[0].id),
  ]);
  const session = await auth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-primary-800 min-h-[400px] overflow-hidden mb-5">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin[0]}
      />
      {session?.user ? (
        <ReservationForm user={session.user} cabin={cabin[0]} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
