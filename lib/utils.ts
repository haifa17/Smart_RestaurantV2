import { DayOfWeek } from "@prisma/client"
import { Restaurant } from "./models/restaurant"

const DAY_ORDER = Object.values(DayOfWeek)

export function formatSchedules(schedules: Restaurant["schedules"]) {
    if (!schedules?.length) return "12:00 - 23:00"

    return schedules
        .filter(s => !s.isClosed)
        .sort(
            (a, b) =>
                DAY_ORDER.indexOf(a.dayOfWeek) -
                DAY_ORDER.indexOf(b.dayOfWeek)
        )
        .map(s => `${s.opensAt} - ${s.closesAt}`)
        .join(", ")
}
