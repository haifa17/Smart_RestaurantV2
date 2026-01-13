import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./components/DashboardClient";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <DashboardClient />;
};

export default DashboardPage;
