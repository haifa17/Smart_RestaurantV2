import { Category } from "@/lib/models/category";
import { MenuItem } from "@/lib/models/menuItem";
import { Restaurant } from "@/lib/models/restaurant";
import { StoryCard } from "@/lib/models/story";
import { ApiResponse } from "@/lib/types";

/* ============================================================================
 * API ERROR
 * ========================================================================== */

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

/* ============================================================================
 * ADMIN API CLIENT
 * ========================================================================== */

export class AdminApiClient {
  constructor(private readonly baseUrl = "/api/admin") {}

  /* ----------------------------------
   * CORE REQUEST HANDLER
   * ---------------------------------- */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const payload: ApiResponse<T> = await response.json();

    if (!response.ok || !payload.success) {
      throw new ApiError(
        payload.success === false
          ? payload.error.message
          : "Unexpected API error",
        response.status
      );
    }

    return payload.data;
  }

  /* ----------------------------------
   * HTTP HELPERS
   * ---------------------------------- */
  private get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  private post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  private patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  private delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  /* ============================================================================
   * CATEGORIES
   * ========================================================================== */

  getCategories(restaurantId: string) {
    const params = new URLSearchParams({ restaurantId });
    return this.get<Category[]>(`/categories?${params}`);
  }

  createCategory(data: {
    restaurantId: string;
    name: string;
    visible?: boolean;
    order?: number;
  }) {
    return this.post<Category>("/categories", data);
  }

  updateCategory(
    id: string,
    data: Partial<Omit<Category, "id" | "restaurantId">>
  ) {
    return this.patch<Category>(`/categories/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.delete<{ message: string }>(`/categories/${id}`);
  }

  reorderCategories(categories: Array<{ id: string; order: number }>) {
    return this.patch<Category[]>("/categories/reorder", { categories });
  }

  /* ============================================================================
   * MENU ITEMS
   * ========================================================================== */

  getMenuItems(restaurantId: string) {
    const params = new URLSearchParams({ restaurantId });
    return this.get<MenuItem[]>(`/menu-items?${params}`);
  }

  createMenuItem(data: Omit<MenuItem, "id">) {
    return this.post<MenuItem>("/menu-items", data);
  }

  updateMenuItem(id: string, data: Partial<MenuItem>) {
    return this.patch<MenuItem>(`/menu-items/${id}`, data);
  }

  deleteMenuItem(id: string) {
    return this.delete<{ message: string }>(`/menu-items/${id}`);
  }

  /* ============================================================================
   * RESTAURANT
   * ========================================================================== */

  getRestaurant(id: string) {
    return this.get<Restaurant>(`/restaurants/${id}`);
  }

  updateRestaurant(id: string, data: Partial<Restaurant>) {
    return this.patch<Restaurant>(`/restaurants/${id}`, data);
  }

  /* ============================================================================
   * STORY CARDS
   * ========================================================================== */

  getStoryCards(restaurantId: string) {
    const params = new URLSearchParams({ restaurantId });
    return this.get<StoryCard[]>(`/story-cards?${params}`);
  }

  createStoryCard(data: Omit<StoryCard, "id">) {
    return this.post<StoryCard>("/story-cards", data);
  }

  updateStoryCard(id: string, data: Partial<StoryCard>) {
    return this.patch<StoryCard>(`/story-cards/${id}`, data);
  }

  deleteStoryCard(id: string) {
    return this.delete<{ message: string }>(`/story-cards/${id}`);
  }

  /* ============================================================================
   * IMAGE UPLOAD (multipart)
   * ========================================================================== */

  async uploadImage(
    file: File,
    folder: "logos" | "heroes" | "menu-items" | "story-cards"
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const payload: ApiResponse<{ url: string }> = await response.json();

    if (!response.ok || !payload.success) {
      throw new ApiError(
        payload.success === false ? payload.error.message : "Upload failed",
        response.status
      );
    }

    return payload.data;
  }

  /* ============================================================================
   * CACHE REVALIDATION
   * ========================================================================== */

  async revalidateCache(tag: string) {
    return this.post<{ revalidated: boolean; tag: string; now: number }>(
      `/revalidate?tag=${tag}`
    );
  }
}

/* ============================================================================
 * SINGLETON EXPORT
 * ========================================================================== */

export const apiClient = new AdminApiClient();
