import Link from "next/link";
import Image from "next/image";
import bg from "../../public/bg.png";
export default function Home() {
  return (
    <>
      <div className=" flex-1 w-full  flex justify-center items-center">
        <Image
          src={bg}
          alt="Mountain and forest image"
          fill
          placeholder="blur"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="container px-5 mx-auto py-12 flex flex-col justify-center items-center gap-6 relative z-10">
          <h2 className="text-accent-100  text-4xl sm:text-6xl md:text-8xl text-center">
            Welcome to paradise.
          </h2>
          <Link
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            href="/cabins"
          >
            Explore luxury cabins
          </Link>
        </div>
      </div>
    </>
  );
}
