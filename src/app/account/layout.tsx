import AccountAside from "@/components/accountAside";
import React from "react";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="container flex-1 mx-auto px-5 grid grid-cols-10 space-x-8 py-12">
        <AccountAside />
        <div className="lg:col-span-8 md:col-span-7 sm:col-span-8 col-span-9">
          {children}
        </div>
      </div>
    </>
  );
}
