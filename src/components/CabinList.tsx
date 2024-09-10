import React from "react";
import CabinCard from "./CabinCard";

export async function getCabins() {
  const url = new URL(
    "https://vezodrkeglazdgxzvpab.supabase.co/rest/v1/cabins?select=*"
  );
  const options: any = {
    method: "GET",
    headers: {
      apikey: process.env.SUPABASE_APIKEY,
      SUPABASE_APIKEY: process.env.SUPABASE_AUTHORIZATION,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
export default async function CabinList({ filter }: any) {
  const cabins = await getCabins();

  if (!cabins.length) return null;
  let displayedCabins;
  if (filter === "all") {
    displayedCabins = cabins;
  }
  if (filter === "small") {
    displayedCabins = cabins.filter((cabin: any) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin: any) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin: any) => cabin.maxCapacity >= 8);
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabins.map((cabin: any) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </>
  );
}
