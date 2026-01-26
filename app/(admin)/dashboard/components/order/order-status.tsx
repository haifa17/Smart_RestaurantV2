import { Card } from "@/components/ui/card";

export interface OrderStatsCards {
  pending: number;
  preparing: number;
  ready: number;
  completedToday: number;
}
const OrderStatusCards = ({ stats }: { stats: OrderStatsCards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-yellow-50 border-border p-4 hover:cursor-pointer hover:border-primary/50 transition-colors duration-200">
        <p className="text-sm text-muted-foreground">En attente</p>
        <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
      </Card>
      <Card className="bg-purple-50 border-border p-4 hover:cursor-pointer hover:border-primary/50 transition-colors duration-200">
        <p className="text-sm text-muted-foreground">En préparation</p>
        <p className="text-2xl font-bold text-purple-700">{stats.preparing}</p>
      </Card>
      <Card className="bg-green-50 border-border p-4 hover:cursor-pointer hover:border-primary/50 transition-colors duration-200">
        <p className="text-sm text-muted-foreground">Prêtes</p>
        <p className="text-2xl font-bold text-green-700">{stats.ready}</p>
      </Card>
      <Card className="bg-blue-50 border-border p-4 hover:cursor-pointer hover:border-primary/50 transition-colors duration-200">
        <p className="text-sm text-muted-foreground">Terminées (aujourd'hui)</p>
        <p className="text-2xl font-bold text-blue-700">
          {stats.completedToday}
        </p>
      </Card>
    </div>
  );
};

export default OrderStatusCards;
