import { DayOfWeek } from "../ennum"
import { BaseModel } from "./base"

export interface Schedule extends BaseModel {
  dayOfWeek: DayOfWeek
  opensAt: string        // "08:00"
  closesAt: string       // "23:00"
  isClosed: boolean
}