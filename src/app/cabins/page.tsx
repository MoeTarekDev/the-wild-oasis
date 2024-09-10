import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";
import { Metadata } from "next";
import { Suspense } from "react";
import CabinList from "../../components/CabinList";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Cabins",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s",
};
export default function Page({ searchParams }: any) {
  const filter: any = searchParams?.capacity ?? "all";
  return (
    <div className="container px-5 mx-auto py-10">
      <h2 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h2>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Loading />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
