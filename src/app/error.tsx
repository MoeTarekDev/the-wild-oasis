"use client";
export default function Error({ error, reset }: any) {
  return (
    <div className="flex justify-center items-center flex-col gap-6 container mx-auto px-5 py-12 text-primary-100">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}!</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
