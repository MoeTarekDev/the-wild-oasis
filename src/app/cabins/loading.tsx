import React from "react";

export default function Loading() {
  return (
    <div className="container px-5 mx-auto w-full h-full flex-1 flex justify-center items-center flex-col gap-2">
      <div className="loader"></div>
      <p className="text-primary-100">Loading Cabin</p>
    </div>
  );
}
