import React from "react";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

const Reservation = async ({ cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id),
  ]);
  const session = await auth();

  return (
    <div className="grid  gap-8 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
      {session?.user ? (
        <ReservationForm
          bookedDates={bookedDates}
          cabin={cabin}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
