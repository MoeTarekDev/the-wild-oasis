import { getBookedDatesByCabinId, getCabin } from "@/app/cabins/[id]/page";

export async function GET(request: any, { params }: any) {
  const { id } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(id),
      getBookedDatesByCabinId(id),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin could not be found" });
  }
}
