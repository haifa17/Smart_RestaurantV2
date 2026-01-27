import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DayOfWeek, DAYS_OF_WEEK } from "@/lib/ennum";
import { Schedule } from "@/lib/models/schedule";
import { Plus, Trash2 } from "lucide-react";

interface ScheduleEditorProps {
  schedules: Schedule[];
  onChange: (schedules: Schedule[]) => void;
}

export function ScheduleEditor({ schedules, onChange }: ScheduleEditorProps) {
  const addSchedule = () => {
    const newSchedule: Schedule = {
      id: `temp-${Date.now()}`,
      dayOfWeek: 'MONDAY',
      opensAt: '09:00',
      closesAt: '18:00',
      isClosed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onChange([...schedules, newSchedule]);
  };

  const updateSchedule = (index: number, field: keyof Schedule, value: any) => {
    const updated = [...schedules];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeSchedule = (index: number) => {
    onChange(schedules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base">Horaires d'ouverture</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSchedule}
          className="gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Ajouter un horaire
        </Button>
      </div>

      {schedules.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">
          Aucun horaire défini. Cliquez sur "Ajouter un horaire" pour commencer.
        </p>
      ) : (
        <div className="space-y-3">
          {schedules.map((schedule, index) => (
            <Card key={schedule.id || index} className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Day of Week */}
                  <div className="space-y-2">
                    <label htmlFor={`day-${index}`}>Jour</label>
                    <select
                      id={`day-${index}`}
                      value={schedule.dayOfWeek}
                      onChange={(e) =>
                        updateSchedule(index, 'dayOfWeek', e.target.value as DayOfWeek)
                      }
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Opens At */}
                  <div className="space-y-2">
                    <label htmlFor={`opens-${index}`}>Ouverture</label>
                    <Input
                      id={`opens-${index}`}
                      type="time"
                      value={schedule.opensAt}
                      onChange={(e) =>
                        updateSchedule(index, 'opensAt', e.target.value)
                      }
                      disabled={schedule.isClosed}
                    />
                  </div>

                  {/* Closes At */}
                  <div className="space-y-2">
                    <label htmlFor={`closes-${index}`}>Fermeture</label>
                    <Input
                      id={`closes-${index}`}
                      type="time"
                      value={schedule.closesAt}
                      onChange={(e) =>
                        updateSchedule(index, 'closesAt', e.target.value)
                      }
                      disabled={schedule.isClosed}
                    />
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <label className="invisible">Actions</label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSchedule(index)}
                      className="w-full gap-2 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </div>

                {/* Is Closed Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`closed-${index}`}
                    checked={schedule.isClosed}
                    onCheckedChange={(checked) =>
                      updateSchedule(index, 'isClosed', checked === true)
                    }
                  />
                  <label
                    htmlFor={`closed-${index}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    Fermé ce jour
                  </label>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}