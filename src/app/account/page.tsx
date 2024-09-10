import { Metadata } from "next";
import { auth } from "../_lib/auth";
export const metadata: Metadata = {
  title: "Guest area",
};
export default async function Page() {
  const session = await auth();
  let name;
  if (session && session.user && session.user.name) {
    name = session.user.name
      .split(" ")
      .filter((word, index) => index <= 1)
      .join(" ");
  }

  return (
    <div className="">
      <h2 className="font-semibold text-2xl text-accent-400 mb-7 ">
        Welcome {name}
      </h2>
    </div>
  );
}
