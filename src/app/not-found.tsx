import Link from "next/link";

function NotFound() {
  return (
    <div className="text-center space-y-6 mt-4 container px-5 mx-auto py-12">
      <h1 className="text-3xl font-semibold text-primary-100">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
