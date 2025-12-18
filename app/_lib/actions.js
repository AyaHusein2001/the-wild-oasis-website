"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirect: "/" });
}

export async function updateGuestAction(data) {
  console.log("🚀 ~ updateGuestAction ~ data:", data);
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
