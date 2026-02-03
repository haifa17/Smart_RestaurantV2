import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateOrderData } from "@/lib/models/order";
import { Plus, Minus, Trash2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MenuItem } from "@/lib/models/menuItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import { OrderType } from "@/lib/types";
import { SelectedCheese, SelectedSauce } from "@/lib/models/OrderItem";

interface OrderEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateOrderData) => void;
  menuItems: MenuItem[];
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  selectedSauces?: SelectedSauce[];
  selectedCheeses?: SelectedCheese[];
}

export function OrderEditor({
  open,
  onClose,
  onSave,
  menuItems,
}: OrderEditorProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("DINE_IN");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.available &&
      item.isActive &&
      (item.nameEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameFr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr?.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const addToCart = (menuItem: MenuItem) => {
    const existing = cart.find((item) => item.menuItem.id === menuItem.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { menuItem, quantity: 1 }]);
    }
  };

  const updateQuantity = (menuItemId: string, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.menuItem.id === menuItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(cart.filter((item) => item.menuItem.id !== menuItemId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.menuItem.price) * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleSubmit = () => {
    if (cart.length === 0) return;

    const orderData: CreateOrderData = {
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      type: orderType,
      tableNumber: orderType === "DINE_IN" ? tableNumber : undefined,
      notes: notes || undefined,
      items: cart.map((item) => ({
        menuItemId: item.menuItem.id,
        name: item.menuItem.nameEn || item.menuItem.nameFr || "",
        price: Number(item.menuItem.price),
        quantity: item.quantity,
        notes: item.notes,
        selectedSauces: item.selectedSauces,
        selectedCheeses: item.selectedCheeses,
      })),
      subtotal,
      tax,
      discount: 0,
      total,
    };
    onSave(orderData);
    toast.success("commande créée succès");
    handleClose();
  };

  const handleClose = () => {
    setCustomerName("");
    setCustomerPhone("");
    setOrderType("DINE_IN");
    setTableNumber("");
    setNotes("");
    setCart([]);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Nouvelle commande</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1  gap-6">
          {/* Left: Order Details */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label>Nom du client</label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Entrez le nom"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Téléphone</label>
              <Input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+216 XX XXX XXX"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Type de commande</label>
              <Select
                value={orderType}
                onValueChange={(v) => setOrderType(v as OrderType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DINE_IN">Sur place</SelectItem>
                  <SelectItem value="TAKEAWAY">À emporter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {orderType === "DINE_IN" && (
              <div className="flex flex-col gap-1">
                <label>Numéro de table</label>
                <Input
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Ex: 5"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label>Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instructions spéciales..."
                rows={3}
              />
            </div>
          </div>

          {/* Right: Menu Items & Cart */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="pl-10"
              />
            </div>

            {/* Cart Items */}
            {cart.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">
                  Panier ({cart.length})
                </h3>
                <ScrollArea className="h-40 border rounded-md p-2">
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center justify-between p-2 hover:bg-muted rounded-md mb-1"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {item.menuItem.nameEn || item.menuItem.nameFr}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Number(item.menuItem.price).toFixed(2)} EUR
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.menuItem.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.menuItem.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-600"
                          onClick={() => removeFromCart(item.menuItem.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            )}

            {/* Menu Items */}
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-sm">Articles disponibles</h3>
              <ScrollArea className="h-64 border rounded-md p-2">
                {filteredMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-md mb-1 text-left"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {item.nameEn || item.nameFr || item.nameAr}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Number(item.price).toFixed(2)} EUR
                      </p>
                    </div>
                    <Plus className="h-4 w-4 text-blue-600" />
                  </button>
                ))}
              </ScrollArea>
            </div>
          </div>

          {/* Cart Summary */}
          <Card className="p-4 flex flex-col gap-2">
            <h3 className="font-semibold">Résumé</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>TVA (10%)</span>
                <span>{tax.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{total.toFixed(2)} EUR</span>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={cart.length === 0}
            className="cursor-pointer"
          >
            Créer la commande
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
