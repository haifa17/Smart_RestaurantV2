import { DayOfWeek } from "../ennum"

export type Schedule = {
  id: string
  dayOfWeek: DayOfWeek
  opensAt: string        // "08:00"
  closesAt: string       // "23:00"
  isClosed: boolean
}