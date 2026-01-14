import { TooltipProvider } from "@/components/ui/tooltip";
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
      <TooltipProvider>
        <div className="bg-[#1A1A1A] text-white min-h-screen">{children}</div>
      </TooltipProvider>
    </ClerkProvider>
  );
}
