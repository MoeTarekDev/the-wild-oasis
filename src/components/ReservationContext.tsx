"use client";
import { createContext, useContext, useState } from "react";
const ReservationContext = createContext<any>({});

export default function ReservationProvider({ children }: any) {
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });

  function resetRange() {
    setRange({
      from: undefined,
      to: undefined,
    });
  }
  return (
    <ReservationContext.Provider
      //@ts-ignore
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
