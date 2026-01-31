import { Card } from "@/components/ui/card";
import {
  Order,
  ORDER_STATUS_CONFIG,
  ORDER_TYPE_CONFIG,
} from "@/lib/models/order";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTab } from "@/components/contexts/TabContext";

interface Props {
  orders: Order[];
  restaurantId: string;
}

export function RecentOrdersList({ orders, restaurantId }: Props) {
  const { setActiveTab } = useTab();

  // Get only active orders (not completed or cancelled) sorted by most recent
  const recentOrders = orders
    .filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Commandes actives</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab("orders")}
          className="text-blue-600 hover:text-blue-700"
        >
          Voir tout
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {recentOrders.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucune commande active</p>
          <p className="text-sm mt-1">
            Les nouvelles commandes apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((order) => {
            const statusConfig = ORDER_STATUS_CONFIG[order.status];
            const typeConfig = ORDER_TYPE_CONFIG[order.type];

            return (
              <div
                key={order.id}
                className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setActiveTab("orders")}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{order.orderNumber}</p>
                    <Badge
                      className={`${statusConfig.bgColor} ${statusConfig.color} text-xs`}
                      variant="secondary"
                    >
                      {statusConfig.label}
                    </Badge>
                    {order.tableNumber && (
                      <Badge variant="outline" className="text-xs">
                        Table {order.tableNumber}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customerName || "Client non spécifié"} •{" "}
                    {order.items.length} article
                    {order.items.length > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(order.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {" "}
                    {Number(order.total).toFixed(2)} £
                  </p>
                  {!order.isPaid && (
                    <Badge variant="destructive" className="text-xs mt-1">
                      Non payé
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
