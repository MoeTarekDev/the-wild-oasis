import SignInButton from "@/components/SignInButton";
export const metadata = {
  title: "login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center container mx-auto px-5 text-accent-100">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
