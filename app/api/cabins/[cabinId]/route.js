import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  const id = cabinId.toString();
  try {
    const [cabin, bookedDates] = Promise.all([
      getCabin(id),
      getBookedDatesByCabinId(id),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "cabin not found" }, { status: 500 });
  }
}

// export async function POST(request) {
//   return new Response("Hello, Next.js!");
// }
