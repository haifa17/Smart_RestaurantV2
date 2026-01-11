import { Schedule } from "./schedule"

export type Restaurant = {
    id: string
    slug: string
    name: string
    phone: string | null
    logo: string | null
    heroImage: string | null
    schedules: Schedule[]
    description?: string
    tagline: string | null
    storyAr: string | null
    storyFr: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string

}