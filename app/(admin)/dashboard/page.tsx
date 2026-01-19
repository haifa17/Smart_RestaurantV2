import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./components/DashboardClient";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense } from "react";

export const metadata = {
  title: "Admin Dashboard",
};
const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {" "}
      <DashboardClient />{" "}
    </Suspense>
  );
};

export default DashboardPage;
