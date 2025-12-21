"use client";
import { differenceInDays, isAfter, isBefore, isSameDay } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReservationAction } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";
function ReservationForm({ cabin, user, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const startDate = range?.from;
  const endDate = range?.to;

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - (discount || 0));

  const bookingData = {
    cabinId: id,
    startDate,
    endDate,
    totalPrice: cabinPrice,
    numNights,
  };
  const createBookingWithData = createReservationAction.bind(null, bookingData);
  function rangeIntersectsBookedDates(start, end, bookedDates) {
    if (!start || !end) return false;

    return bookedDates.some((date) => {
      return (
        (isAfter(date, start) || isSameDay(date, start)) &&
        (isBefore(date, end) || isSameDay(date, end))
      );
    });
  }
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* Form */}
      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);

          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        {/* Guests */}
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Date inputs */}

        <div className="space-y-2 flex flex-col ">
          <label htmlFor="startDate">Start Date</label>
          <ReactDatePicker
            required
            selected={range?.from}
            minDate={new Date()}
            excludeDates={bookedDates}
            placeholderText="yyyy-mm-dd"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            onChange={(start) => {
              setRange({ from: start, to: null });
            }}
          />
        </div>

        <div className="space-y-2 flex flex-col ">
          <label htmlFor="endDate">End Date</label>
          <ReactDatePicker
            required
            selected={range?.to}
            minDate={range?.from || new Date()}
            excludeDates={bookedDates}
            placeholderText="yyyy-mm-dd"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            onChange={(end) => {
              if (!range?.from) return;

              // BLOCK invalid ranges
              if (rangeIntersectsBookedDates(range.from, end, bookedDates)) {
                alert(
                  "Selected dates overlap with an existing reservation, please choose different dates."
                );
                resetRange();
                return;
              }

              setRange({ ...range, to: end });
            }}
          />
        </div>

        {/* Nights & Price */}
        {numNights > 0 && (
          <div className="flex items-center gap-6 mt-4">
            <p className="bg-accent-600 px-3 py-2 text-2xl">× {numNights}</p>
            <p>
              <span className="text-lg font-bold uppercase">Total:</span>{" "}
              <span className="text-2xl font-semibold">${cabinPrice}</span>
            </p>
          </div>
        )}

        {/* Observations */}
        <div className="space-y-2 mt-4">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end items-center gap-6 mt-4">
          <SubmitButton>Reserve Now</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
