
import { UtensilsCrossed, QrCode, Store, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface TabNavProps {
  activeTab: "menu" | "qr" | "info" | "story"
  setActiveTab: (tab: "menu" | "qr" | "info" | "story") => void
}

const tabs = [
  { id: "menu" as const, label: "Menu", icon: UtensilsCrossed },
  { id: "story" as const, label: "Story Cards", icon: BookOpen },
  { id: "qr" as const, label: "QR Code", icon: QrCode },
  { id: "info" as const, label: "Restaurant Info", icon: Store },
]

export function TabNav({ activeTab, setActiveTab }: TabNavProps) {
  return (
    <nav className="border-b border-border ">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center cursor-pointer gap-2 px-4 py-3 text-sm lg:text-base font-medium transition-colors border-b-2 -mb-px",
                  isActive
                    ? "font-bold "
                    : "border-transparent text-white/70 hover:border-border",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
