import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/lib/models/order";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const OrderDetailsDialog = ({
  selectedOrder,
  setSelectedOrder,
}: {
  selectedOrder: Order;
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}) => {
  return (
    <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Détails de la commande {selectedOrder?.orderNumber}
          </DialogTitle>
        </DialogHeader>
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium">
                  {selectedOrder.customerName || "Non spécifié"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">
                  {selectedOrder.customerPhone || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">
                  {selectedOrder.type === "DINE_IN"
                    ? "Sur place"
                    : "À emporter"}
                </p>
              </div>
              {selectedOrder.tableNumber && (
                <div>
                  <p className="text-sm text-muted-foreground">Table</p>
                  <p className="font-medium">{selectedOrder.tableNumber}</p>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Articles</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
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
                      {(item.price * item.quantity).toFixed(2)} TND
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{Number(selectedOrder.subtotal).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>TVA</span>
                <span>{Number(selectedOrder.tax).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span> {Number(selectedOrder.total).toFixed(2)} TND </span>
              </div>
            </div>

            {selectedOrder.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Créé{" "}
              {formatDistanceToNow(new Date(selectedOrder.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
