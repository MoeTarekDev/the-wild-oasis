"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";
function isAlreadyBooked(range: any, datesArr: any) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: any) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }: any) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();

  const { regularPrice, discount } = cabin;
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;
  const defaultClassNames = getDefaultClassNames();
  return (
    <div className="flex flex-col flex-wrap justify-between overflow-hidden">
      <DayPicker
        className="md:pt-12 place-self-center text-amber-100 text-xs md:text-sm "
        mode="range"
        classNames={{
          today: `border-amber-500`, // Add a border to today's date
          selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
          root: `${defaultClassNames.root} shadow-lg p-2`, // Add a shadow to the root element
          chevron: `${defaultClassNames.chevron} fill-amber-500`,
        }}
        //@ts-ignore
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) => {
          return (
            isPast(curDate) ||
            bookedDates.some((date: any) => isSameDay(date, curDate))
          );
        }}
      />

      <div className="flex items-center justify-between px-2 w-full  lg:px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-center gap-1 lg:gap-3 md:gap-4 h-full">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-lg lg:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg lg:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2  text-lg lg:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-sm lg:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-base lg:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
