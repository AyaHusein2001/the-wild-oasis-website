"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirect: "/" });
}

export async function updateGuestAction(data) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile");
  }
  const nationalID = data.get("nationalID");
  const [nationality, countryFlag] = data.get("nationality").split("%");
  //   const fullName = data.get('fullName');
  //   const email = data.get('email');
  const guestId = session.user.guestId;

  if (!/^[0-9]{14}$/.test(nationalID)) {
    throw new Error("National ID must be 14 digits");
  }
  const updateData = await updateGuest(guestId, {
    nationality,
    nationalID,
    countryFlag,
  });

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile");
  }
  //For testing useOptimistic
  // throw new Error("You can only delete your own reservations");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You can only delete your own reservations");
  }

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(data) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile");
  }
  const reservationId = Number(data.get("reservationId"));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(reservationId)) {
    throw new Error("You can only update your own reservations");
  }
  const numGuests = data.get("numGuests");
  const observations = data.get("observations").slice(0, 1000);
  await updateBooking(reservationId, {
    numGuests,
    observations,
  });

  revalidatePath("/account/reservations");
  revalidatePath("/account/reservations/edit/" + reservationId);

  redirect("/account/reservations");
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile");
  }
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  await createBooking(newBooking);
  revalidatePath("/cabins/" + newBooking.cabinId);
  redirect("/cabins/thankyou");
}
