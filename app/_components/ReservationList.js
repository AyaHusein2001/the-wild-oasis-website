"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

const ReservationList = ({ bookings }) => {
  //think of 2 states : one is the actual state and the other is the optimistic state
  //1st -> pass the actual state that will be rendered if no sync operation is running
  //2nd (similar to the reducer function) -> pass the update function (takes the currState) and it also takes in whatever we pass to the
  // returned wetter function (optimisticDelete) .. this value should help us determine the next optimistic state (usually the same as the real async operation needs) -- a bit similar to the useReducer -- what it returns is the optimistic state that we then use
  // optimisticDelete-- similar to the dispatch in the useReducer

  // just like [state , dispacth] = useReducer(initialState, reducer)
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
