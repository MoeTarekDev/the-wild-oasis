import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";
import { auth } from "@/app/_lib/auth";

export default async function Navbar() {
  const session = await auth();
  const links = [
    {
      href: "/cabins",
      label: "Cabins",
      imageSrc: "",
      alt: "",
    },
    {
      href: "/about",
      label: "About",
      imageSrc: "",
      alt: "",
    },
    {
      href: "/account",
      label: "Guest Area",
      imageSrc: session?.user?.image,
      alt: `${session?.user?.name} avatar image`,
    },
  ];
  return (
    <nav className="bg-transparent border-b border-zinc-200/10 relative z-10">
      <div className="container px-5 mx-auto flex flex-col space-y-3 md:space-y-0 md:flex-row items-center justify-between py-5">
        <h1>
          <Link
            href="/"
            className="flex items-center gap-5 text-xl text-accent-100"
          >
            <Image
              className="w-10 h-10 md:w-[60px] md:h-[60px]"
              src={logo}
              alt="logo image"
              placeholder="blur"
              quality={80}
              width={60}
              height={60}
            />
            <span>The Wild Oasis</span>
          </Link>
        </h1>
        <ul className="flex items-center gap-4 sm:gap-8">
          {links.map((link, index) => (
            <li key={index}>
              {session?.user?.image ? (
                <Link
                  className="text-accent-100 text-xl flex items-center gap-4 hover:text-accent-500 transition-colors duration-200"
                  href={link.href}
                >
                  <img
                    className="h-8 rounded-full"
                    //@ts-ignore
                    src={link.imageSrc}
                    alt={link.alt}
                    referrerPolicy="no-referrer"
                  />
                  <span>{link.label}</span>
                </Link>
              ) : (
                <Link
                  className="text-accent-100 text-xl hover:text-accent-500 transition-colors duration-200"
                  href={link.href}
                >
                  <span>{link.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
