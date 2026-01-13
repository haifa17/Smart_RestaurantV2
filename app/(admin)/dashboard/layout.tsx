import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="">{children}</div>
    </ClerkProvider>
  );
}
