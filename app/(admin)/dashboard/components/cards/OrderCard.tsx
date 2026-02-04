import { Order } from "@/lib/models/order";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Eye,
  CheckCircle,
  ChefHat,
  ShoppingBag,
  XCircle,
  Banknote,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { ORDER_STATUS_CONFIG, ORDER_TYPE_CONFIG } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
  onUpdateStatus: (status: Order["status"]) => void;
  onMarkPaid: () => void;
  onCancel: () => void;
}

export function OrderCard({
  order,
  onViewDetails,
  onUpdateStatus,
  onMarkPaid,
  onCancel,
}: OrderCardProps) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const typeConfig = ORDER_TYPE_CONFIG[order.type];

  const getNextStatusAction = () => {
    switch (order.status) {
      case "PENDING":
        return {
          label: "Confirmer",
          icon: <CheckCircle className="h-4 w-4" />,
          action: () => onUpdateStatus("CONFIRMED"),
        };
      case "CONFIRMED":
        return {
          label: "En préparation",
          icon: <ChefHat className="h-4 w-4" />,
          action: () => onUpdateStatus("PREPARING"),
        };
      case "PREPARING":
        return {
          label: "Marquer comme prêt",
          icon: <ShoppingBag className="h-4 w-4" />,
          action: () => onUpdateStatus("READY"),
        };
      case "READY":
        return {
          label: "Terminer",
          icon: <CheckCircle className="h-4 w-4" />,
          action: () => onUpdateStatus("COMPLETED"),
        };
      default:
        return null;
    }
  };

  const nextAction = getNextStatusAction();

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
            <Badge
              className={`${statusConfig.bgColor} ${statusConfig.color}`}
              variant="secondary"
            >
              {statusConfig.label}
            </Badge>
            <Badge variant="outline">
              {typeConfig.icon} {typeConfig.label}
            </Badge>
            {order.tableNumber && (
              <Badge variant="outline">Table {order.tableNumber}</Badge>
            )}
            {!order.isPaid && (
              <Badge variant="destructive" className="bg-red-100 text-red-700">
                Non payé
              </Badge>
            )}
          </div>

          {/* Customer Info */}
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Client:</span>{" "}
              {order.customerName || "Non spécifié"}
            </p>
            {order.customerPhone && (
              <p>
                <span className="font-medium">Tél:</span> {order.customerPhone}
              </p>
            )}
          </div>

          {/* Items List */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {order.items.length} article{order.items.length > 1 ? "s" : ""}
            </p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantité: {item.quantity}
                    </p>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        {item.notes}
                      </p>
                    )}
                  </div>
                  <p className="font-medium">
                    {(item.price * item.quantity).toFixed(2)} EUR
                  </p>
                </div>
              ))}
            </div>
            <p className="font-semibold text-lg mt-3">
              Total: {Number(order.total).toFixed(2)} EUR
            </p>
          </div>

          {/* Time */}
          <p className="text-xs text-muted-foreground">
            Créé{" "}
            {formatDistanceToNow(new Date(order.createdAt), {
              addSuffix: true,
              locale: fr,
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {nextAction &&
            order.status !== "COMPLETED" &&
            order.status !== "CANCELLED" && (
              <Button
                size="sm"
                onClick={nextAction.action}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                {nextAction.icon}
                <span className="ml-2 hidden sm:inline">
                  {nextAction.label}
                </span>
              </Button>
            )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewDetails}>
                <Eye className="h-4 w-4 mr-2" />
                Voir les détails
              </DropdownMenuItem>
              {!order.isPaid && order.status !== "CANCELLED" && (
                <DropdownMenuItem onClick={onMarkPaid}>
                  <Banknote className="h-4 w-4 mr-2" />
                  Marquer comme payé
                </DropdownMenuItem>
              )}
              {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onCancel} className="text-red-600">
                    <XCircle className="h-4 w-4 mr-2" />
                    Annuler la commande
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
