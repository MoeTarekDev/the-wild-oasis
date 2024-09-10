import { getCabins } from "@/components/CabinList";
import Reservation from "@/components/Reservation";
import TextExpander from "@/components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { eachDayOfInterval } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../loading";
import { supabase } from "./../../_lib/supabase";

export async function getCabin(id: any) {
  const url = new URL(
    `https://vezodrkeglazdgxzvpab.supabase.co/rest/v1/cabins?id=eq.${id}&select=*`
  );
  const options: any = {
    method: "GET",
    headers: {
      apikey: process.env.SUPABASE_APIKEY,
      SUPABASE_APIKEY: process.env.SUPABASE_AUTHORIZATION,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (!data || data.length === 0) {
    notFound();
  }

  return data;
}

export async function generateMetadata({ params }: any) {
  // @ts-ignore

  if (!getCabin(params.id) || getCabin(params.id).length === 0) {
    notFound();
  } else {
    const name = await getCabin(params.id);
    return { title: `Cabin ${name[0].name}` };
  }
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin: any) => ({
    id: String(cabin.id),
  }));

  return ids;
}
export async function getSettings() {
  const url = new URL(
    `https://vezodrkeglazdgxzvpab.supabase.co/rest/v1/settings?select=*`
  );
  const options: any = {
    method: "GET",
    headers: {
      apikey: process.env.SUPABASE_APIKEY,
      SUPABASE_APIKEY: process.env.SUPABASE_AUTHORIZATION,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
export async function getBookedDatesByCabinId(id: number) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  //@ts-ignore
  today = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", id)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error("Error loading bookings:", error);
    throw new Error("Bookings could not get loaded");
  }
  const bookedDates = data
    .map((booking: any) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}
export default async function Page({ params }: any) {
  let { id } = params;
  const cabin = await getCabin(id);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(id);

  return (
    <div className="container px-5 mx-auto pt-10">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-7 md:gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative w-full h-[200px] md:h-full">
          <Image
            fill
            className="object-cover"
            src={cabin[0].image}
            alt={`Cabin ${cabin[0].name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-5xl md:text-7xl mb-[28px] md:mb-5 md:translate-x-[-254px] bg-primary-950 md:p-6 md:pb-1 md:w-[150%]">
            Cabin {cabin[0].name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            {/* {cabin[0].description} */}
            <TextExpander>{cabin[0].description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg text-primary-100">
                For up to{" "}
                <span className="font-bold">{cabin[0].maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg text-primary-100">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg text-primary-100">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center  mb-10 text-accent-400">
          Reserve cabin &quot;{cabin[0].name}&quot; today. Pay on arrival.
        </h2>
        <Suspense fallback={<Loading />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
