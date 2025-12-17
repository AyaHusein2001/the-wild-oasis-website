"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
const initialState = {
  from: undefined,
  to: undefined,
};
const reservationContext = createContext();

function ReservationContextProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <reservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </reservationContext.Provider>
  );
}

const useReservation = () => {
  const context = useContext(reservationContext);
  if (context === undefined) {
    throw new Error(
      "useReservationContext must be used within a ReservationContextProvider"
    );
  }
  return context;
};

export { ReservationContextProvider, useReservation };
