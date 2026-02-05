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
import {
  Plus,
  Minus,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { MenuItem } from "@/lib/models/menuItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import { OrderType, SelectedSupplement, SupplementType } from "@/lib/types";
import { SelectedCheese, SelectedSauce } from "@/lib/models/OrderItem";
import { CheeseType, SauceType } from "@/lib/ennum";
import { CHEESE_OPTIONS, SAUCE_OPTIONS } from "../menu/constants";
import {
  getSupplementLabel,
  getSupplementPrice,
  getSupplementsByCategory,
} from "@/lib/utils";

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
  selectedSupplements?: SelectedSupplement[]; // ← Added
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
  const [expandedCartItem, setExpandedCartItem] = useState<string | null>(null);

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
      // Initialize with the menu item's default sauces and cheeses
      const selectedSauces: SelectedSauce[] =
        menuItem.sauces?.map((sauce) => ({
          sauceType: sauce.sauceType,
          customName: sauce.customName,
          isIncluded: true,
        })) || [];

      const selectedCheeses: SelectedCheese[] =
        menuItem.cheeses?.map((cheese) => ({
          cheeseType: cheese.cheeseType,
          customName: cheese.customName,
          isIncluded: true,
        })) || [];
      const selectedSupplements: SelectedSupplement[] = [];

      setCart([
        ...cart,
        {
          menuItem,
          quantity: 1,
          selectedSauces,
          selectedCheeses,
          selectedSupplements,
        },
      ]);
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

  // Calculate subtotal including supplements
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = Number(item.menuItem.price) * item.quantity;
    const supplementsPrice = (item.selectedSupplements || []).reduce(
      (suppSum, supp) => suppSum + supp.price * supp.quantity,
      0,
    );
    return sum + itemPrice + supplementsPrice;
  }, 0);
  // Toggle existing sauce in the cart item
  const toggleSauceInclusion = (menuItemId: string, sauceIndex: number) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        const newSauces = [...(item.selectedSauces || [])];
        newSauces[sauceIndex] = {
          ...newSauces[sauceIndex],
          isIncluded: !newSauces[sauceIndex].isIncluded,
        };
        return { ...item, selectedSauces: newSauces };
      }),
    );
  };

  // Toggle existing cheese in the cart item
  const toggleCheeseInclusion = (menuItemId: string, cheeseIndex: number) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        const newCheeses = [...(item.selectedCheeses || [])];
        newCheeses[cheeseIndex] = {
          ...newCheeses[cheeseIndex],
          isIncluded: !newCheeses[cheeseIndex].isIncluded,
        };
        return { ...item, selectedCheeses: newCheeses };
      }),
    );
  };
  const updateItemNotes = (menuItemId: string, notes: string) => {
    setCart(
      cart.map((item) =>
        item.menuItem.id === menuItemId ? { ...item, notes } : item,
      ),
    );
  };
  // Add a new sauce to the cart item (from the full list)
  const addSauceToItem = (menuItemId: string, sauceType: SauceType) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        // Check if sauce already exists
        const exists = item.selectedSauces?.some(
          (s) => s.sauceType === sauceType,
        );
        if (exists) return item;

        const newSauces = [
          ...(item.selectedSauces || []),
          {
            sauceType,
            isIncluded: true,
          },
        ];
        return { ...item, selectedSauces: newSauces };
      }),
    );
  };

  // Add a new cheese to the cart item (from the full list)
  const addCheeseToItem = (menuItemId: string, cheeseType: CheeseType) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        // Check if cheese already exists
        const exists = item.selectedCheeses?.some(
          (c) => c.cheeseType === cheeseType,
        );
        if (exists) return item;

        const newCheeses = [
          ...(item.selectedCheeses || []),
          {
            cheeseType,
            isIncluded: true,
          },
        ];
        return { ...item, selectedCheeses: newCheeses };
      }),
    );
  };

  // Remove a sauce completely from the cart item
  // Update this function
  const removeSauceFromItem = (menuItemId: string, sauceIndex: number) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        const newSauces = (item.selectedSauces || []).filter(
          (_, idx) => idx !== sauceIndex,
        ); // ✅ Handle undefined
        return { ...item, selectedSauces: newSauces };
      }),
    );
  };

  // Update this function
  const removeCheeseFromItem = (menuItemId: string, cheeseIndex: number) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        const newCheeses = (item.selectedCheeses || []).filter(
          (_, idx) => idx !== cheeseIndex,
        ); // ✅ Handle undefined
        return { ...item, selectedCheeses: newCheeses };
      }),
    );
  };
  // Add a supplement to cart item
  const addSupplementToItem = (
    menuItemId: string,
    supplementType: SupplementType,
  ) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        // Check if supplement already exists
        const existingIndex = (item.selectedSupplements || []).findIndex(
          (s) => s.supplementType === supplementType,
        );

        if (existingIndex >= 0) {
          // Increment quantity if exists
          const newSupplements = [...(item.selectedSupplements || [])];
          newSupplements[existingIndex] = {
            ...newSupplements[existingIndex],
            quantity: newSupplements[existingIndex].quantity + 1,
          };
          return { ...item, selectedSupplements: newSupplements };
        } else {
          // Add new supplement
          const price = getSupplementPrice(supplementType);
          const newSupplements = [
            ...(item.selectedSupplements || []),
            {
              supplementType,
              quantity: 1,
              price,
            },
          ];
          return { ...item, selectedSupplements: newSupplements };
        }
      }),
    );
  };

  // Update supplement quantity
  const updateSupplementQuantity = (
    menuItemId: string,
    supplementIndex: number,
    delta: number,
  ) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        const newSupplements = [...(item.selectedSupplements || [])];
        const newQuantity = Math.max(
          0,
          newSupplements[supplementIndex].quantity + delta,
        );

        if (newQuantity === 0) {
          // Remove supplement if quantity is 0
          return {
            ...item,
            selectedSupplements: newSupplements.filter(
              (_, idx) => idx !== supplementIndex,
            ),
          };
        }

        newSupplements[supplementIndex] = {
          ...newSupplements[supplementIndex],
          quantity: newQuantity,
        };

        return { ...item, selectedSupplements: newSupplements };
      }),
    );
  };

  // Remove supplement completely
  const removeSupplementFromItem = (
    menuItemId: string,
    supplementIndex: number,
  ) => {
    setCart(
      cart.map((item) => {
        if (item.menuItem.id !== menuItemId) return item;

        const newSupplements = (item.selectedSupplements || []).filter(
          (_, idx) => idx !== supplementIndex,
        );
        return { ...item, selectedSupplements: newSupplements };
      }),
    );
  };

  // const tax = subtotal * 0.1; // 10% tax
  const tax = 0;
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
        selectedSauces: item.selectedSauces?.filter((s) => s.isIncluded),
        selectedCheeses: item.selectedCheeses?.filter((c) => c.isIncluded),
        selectedSupplements: item.selectedSupplements || [],
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
  const getSauceLabel = (sauce: SelectedSauce): string => {
    if (sauce.customName) return sauce.customName;
    const option = SAUCE_OPTIONS.find((opt) => opt.type === sauce.sauceType);
    return option?.label || sauce.sauceType;
  };

  const getCheeseLabel = (cheese: SelectedCheese): string => {
    if (cheese.customName) return cheese.customName;
    const option = CHEESE_OPTIONS.find((opt) => opt.type === cheese.cheeseType);
    return option?.label || cheese.cheeseType;
  };

  // Get available sauces that are not already added to this cart item
  const getAvailableSauces = (item: CartItem) => {
    const existingSauceTypes = new Set(
      item.selectedSauces?.map((s) => s.sauceType),
    );
    return SAUCE_OPTIONS.filter((sauce) => !existingSauceTypes.has(sauce.type));
  };

  // Get available cheeses that are not already added to this cart item
  const getAvailableCheeses = (item: CartItem) => {
    const existingCheeseTypes = new Set(
      item.selectedCheeses?.map((c) => c.cheeseType),
    );
    return CHEESE_OPTIONS.filter(
      (cheese) => !existingCheeseTypes.has(cheese.type),
    );
  };
  // Group supplements by category for better UX
  const supplementsByCategory = getSupplementsByCategory();
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Nouvelle commande</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
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
                <ScrollArea className="h-96 border rounded-md p-2">
                  {cart.map((item) => {
                    const isExpanded = expandedCartItem === item.menuItem.id;
                    const availableSauces = getAvailableSauces(item);
                    const availableCheeses = getAvailableCheeses(item);

                    // Calculate item total including supplements
                    const itemBasePrice = Number(item.menuItem.price);
                    const supplementsTotal = (
                      item.selectedSupplements || []
                    ).reduce(
                      (sum, supp) => sum + supp.price * supp.quantity,
                      0,
                    );
                    const itemTotal =
                      (itemBasePrice + supplementsTotal) * item.quantity;

                    return (
                      <div
                        key={item.menuItem.id}
                        className="border rounded-md p-2 mb-2 bg-card"
                      >
                        {/* Main Item Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {item.menuItem.nameEn || item.menuItem.nameFr}
                              </p>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5"
                                onClick={() =>
                                  setExpandedCartItem(
                                    isExpanded ? null : item.menuItem.id,
                                  )
                                }
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-3 w-3" />
                                ) : (
                                  <ChevronDown className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <p>Base: {itemBasePrice.toFixed(2)} EUR</p>
                              {supplementsTotal > 0 && (
                                <p className="text-orange-600">
                                  Suppléments: +{supplementsTotal.toFixed(2)}{" "}
                                  EUR
                                </p>
                              )}
                              <p className="font-semibold">
                                Total: {itemTotal.toFixed(2)} EUR
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.menuItem.id, -1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.menuItem.id, 1)
                              }
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

                        {/* Expanded Customizations */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t space-y-3">
                            {/* Sauces Section */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-semibold">Sauces:</p>
                              </div>

                              {/* Current Sauces */}
                              {item.selectedSauces &&
                              item.selectedSauces.length > 0 ? (
                                <div className="space-y-1 mb-2">
                                  {item.selectedSauces.map((sauce, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between gap-2 text-xs p-1 rounded hover:bg-muted"
                                    >
                                      <label className="flex items-center gap-2 cursor-pointer flex-1">
                                        <input
                                          type="checkbox"
                                          checked={sauce.isIncluded}
                                          onChange={() =>
                                            toggleSauceInclusion(
                                              item.menuItem.id,
                                              idx,
                                            )
                                          }
                                          className="cursor-pointer"
                                        />
                                        <span>{getSauceLabel(sauce)}</span>
                                      </label>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-5 w-5 text-red-600"
                                        onClick={() =>
                                          removeSauceFromItem(
                                            item.menuItem.id,
                                            idx,
                                          )
                                        }
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground mb-2">
                                  Aucune sauce sélectionnée
                                </p>
                              )}

                              {/* Add Sauce Dropdown */}
                              {availableSauces.length > 0 && (
                                <Select
                                  onValueChange={(value) =>
                                    addSauceToItem(
                                      item.menuItem.id,
                                      value as SauceType,
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="+ Ajouter une sauce" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableSauces.map((sauce) => (
                                      <SelectItem
                                        key={sauce.type}
                                        value={sauce.type}
                                      >
                                        {sauce.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </div>

                            {/* Cheeses Section */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-semibold">
                                  Fromages:
                                </p>
                              </div>

                              {/* Current Cheeses */}
                              {item.selectedCheeses &&
                              item.selectedCheeses.length > 0 ? (
                                <div className="space-y-1 mb-2">
                                  {item.selectedCheeses.map((cheese, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between gap-2 text-xs p-1 rounded hover:bg-muted"
                                    >
                                      <label className="flex items-center gap-2 cursor-pointer flex-1">
                                        <input
                                          type="checkbox"
                                          checked={cheese.isIncluded}
                                          onChange={() =>
                                            toggleCheeseInclusion(
                                              item.menuItem.id,
                                              idx,
                                            )
                                          }
                                          className="cursor-pointer"
                                        />
                                        <span>{getCheeseLabel(cheese)}</span>
                                      </label>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-5 w-5 text-red-600"
                                        onClick={() =>
                                          removeCheeseFromItem(
                                            item.menuItem.id,
                                            idx,
                                          )
                                        }
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground mb-2">
                                  Aucun fromage sélectionné
                                </p>
                              )}

                              {/* Add Cheese Dropdown */}
                              {availableCheeses.length > 0 && (
                                <Select
                                  onValueChange={(value) =>
                                    addCheeseToItem(
                                      item.menuItem.id,
                                      value as CheeseType,
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="+ Ajouter un fromage" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableCheeses.map((cheese) => (
                                      <SelectItem
                                        key={cheese.type}
                                        value={cheese.type}
                                      >
                                        {cheese.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </div>

                            {/* ============================================ */}
                            {/* SUPPLEMENTS SECTION - NEW */}
                            {/* ============================================ */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-semibold">
                                  Suppléments:
                                </p>
                              </div>

                              {/* Current Supplements */}
                              {item.selectedSupplements &&
                              item.selectedSupplements.length > 0 ? (
                                <div className="space-y-1 mb-2">
                                  {item.selectedSupplements.map(
                                    (supplement, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between gap-2 text-xs p-1 rounded hover:bg-muted bg-orange-50 border border-orange-200"
                                      >
                                        <div className="flex-1">
                                          <p className="font-medium">
                                            {getSupplementLabel(supplement)}
                                          </p>
                                          <p className="text-orange-600">
                                            {supplement.price.toFixed(2)} EUR ×{" "}
                                            {supplement.quantity} ={" "}
                                            {(
                                              supplement.price *
                                              supplement.quantity
                                            ).toFixed(2)}{" "}
                                            EUR
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6"
                                            onClick={() =>
                                              updateSupplementQuantity(
                                                item.menuItem.id,
                                                idx,
                                                -1,
                                              )
                                            }
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <span className="w-6 text-center">
                                            {supplement.quantity}
                                          </span>
                                          <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6"
                                            onClick={() =>
                                              updateSupplementQuantity(
                                                item.menuItem.id,
                                                idx,
                                                1,
                                              )
                                            }
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-6 w-6 text-red-600"
                                            onClick={() =>
                                              removeSupplementFromItem(
                                                item.menuItem.id,
                                                idx,
                                              )
                                            }
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground mb-2">
                                  Aucun supplément sélectionné
                                </p>
                              )}

                              {/* Add Supplement Dropdown - Grouped by Category */}
                              <Select
                                onValueChange={(value) =>
                                  addSupplementToItem(
                                    item.menuItem.id,
                                    value as SupplementType,
                                  )
                                }
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="+ Ajouter un supplément" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(supplementsByCategory).map(
                                    ([category, supplements]) => (
                                      <div key={category}>
                                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                          {category}
                                        </div>
                                        {supplements.map((supplement) => (
                                          <SelectItem
                                            key={supplement.type}
                                            value={supplement.type}
                                          >
                                            {supplement.label} (+
                                            {supplement.price.toFixed(2)} EUR)
                                          </SelectItem>
                                        ))}
                                      </div>
                                    ),
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Item Notes */}
                            <div>
                              <p className="text-xs font-semibold mb-1">
                                Notes:
                              </p>
                              <Textarea
                                placeholder="Instructions spéciales pour cet article..."
                                value={item.notes || ""}
                                onChange={(e) =>
                                  updateItemNotes(
                                    item.menuItem.id,
                                    e.target.value,
                                  )
                                }
                                className="text-xs"
                                rows={2}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
