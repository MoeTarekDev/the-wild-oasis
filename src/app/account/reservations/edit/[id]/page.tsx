import { updateBooking } from "@/app/_lib/actions";
import { getBooking } from "@/app/_lib/data-service";
import { getCabin } from "@/app/cabins/[id]/page";
import UpdateButton from "@/components/updateButton";
import { useFormStatus } from "react-dom";

export default async function Page({ params }: any) {
  const { id } = params;
  const booking = await getBooking(id);
  const { numGuests, observations, cabinId } = booking;
  const cabin = await getCabin(cabinId);
  const maxCapacity = cabin[0].maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{id}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-primary-200">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="text-primary-200">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <input type="text" hidden name="bookingId" value={id} />

        <div className="flex justify-end items-center gap-6">
          <UpdateButton />
        </div>
      </form>
    </div>
  );
}
