import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./components/DashboardClient";
export const metadata = {
  title: "Admin Dashboard",
};
const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <DashboardClient />;
};

export default DashboardPage;
