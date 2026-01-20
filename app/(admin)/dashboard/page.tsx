import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./components/DashboardClient";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/Loading";

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
