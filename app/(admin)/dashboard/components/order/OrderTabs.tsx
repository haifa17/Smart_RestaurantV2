import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order } from "@/lib/models/order";
import { OrderStatus } from "@/lib/types";
import { Filter } from "lucide-react";
import { toast } from "react-toastify";

const OrderTabs = ({
  activeTab,
  setActiveTab,
  orders,
  statusFilter,
  setStatusFilter,
}: {
  activeTab: "active" | "completed";
  setActiveTab: React.Dispatch<React.SetStateAction<"active" | "completed">>;
  orders: Order[];
  statusFilter: OrderStatus | "ALL";
  setStatusFilter: React.Dispatch<React.SetStateAction<OrderStatus | "ALL">>;
}) => {
  const handleTabChange = (v: string) => {
    setActiveTab(v as "active" | "completed");
  };

  const handleStatusChange = (v: OrderStatus | "ALL") => {
    setStatusFilter(v);
    toast(`Filtre appliqué: ${v === "ALL" ? "Tous les statuts" : v}`);
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="active">
            Actives (
            {
              orders.filter(
                (o) => o.status !== "COMPLETED" && o.status !== "CANCELLED",
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="completed">
            Terminées (
            {
              orders.filter(
                (o) => o.status === "COMPLETED" || o.status === "CANCELLED",
              ).length
            }
            )
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Select value={statusFilter} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px] cursor-pointer">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Tous les statuts</SelectItem>
          <SelectItem value="PENDING">En attente</SelectItem>
          <SelectItem value="CONFIRMED">Confirmé</SelectItem>
          <SelectItem value="PREPARING">En préparation</SelectItem>
          <SelectItem value="READY">Prêt</SelectItem>
          <SelectItem value="COMPLETED">Terminé</SelectItem>
          <SelectItem value="CANCELLED">Annulé</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderTabs;
