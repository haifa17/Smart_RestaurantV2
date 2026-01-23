import type React from "react";
import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Restaurant } from "@/lib/models/restaurant";
import { toast } from "react-toastify";
import { RestaurantHeader } from "./RestaurantHeader";
import { FormField } from "./FormField";
import { SaveButton } from "@/components/buttons/SaveButton";
import { LogoImageSection } from "./LogoImageSection";

interface RestaurantInfoProps {
  restaurant: Restaurant;
  isLoading: boolean;
  onUpdate: (data: Partial<Restaurant>) => void;
  onUploadImage: (
    file: File,
    folder: "logos" | "heroes",
  ) => Promise<{ url: string }>;
}

interface FormData {
  name: string;
  phone: string;
  tagline: string;
  story: string;
  menuBaseUrl: string;
}

const SAVE_SUCCESS_TIMEOUT = 2000;

export function RestaurantInfo({
  restaurant,
  isLoading,
  onUpdate,
  onUploadImage,
}: RestaurantInfoProps) {
  const [saved, setSaved] = useState(false);
  const [localData, setLocalData] = useState<FormData>({
    name: restaurant.name || "",
    phone: restaurant.phone || "",
    tagline: restaurant.tagline || "",
    story: restaurant.story || "",
    menuBaseUrl: restaurant.menuBaseUrl || "",
  });

  const [logoImage, setLogoImage] = useState<string | null>(
    restaurant.logo || null,
  );
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleLogoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploadingLogo(true);
      try {
        const { url } = await onUploadImage(file, "logos");
        setLogoImage(url);
        onUpdate({ logo: url });
        toast.success("Logo téléchargé avec succès");
      } catch (error) {
        console.error("Error uploading logo:", error);
        toast.error("Échec du chargement du logo");
      } finally {
        setIsUploadingLogo(false);
      }
    },
    [onUpdate, onUploadImage],
  );
  const handleRemoveLogo = useCallback(() => {
    setLogoImage(null);
    onUpdate({ logo: null });
  }, [onUpdate]);

  const handleSave = useCallback(() => {
    onUpdate({
      name: localData.name,
      phone: localData.phone || null,
      tagline: localData.tagline || null,
      story: localData.story || null,
      menuBaseUrl: localData.menuBaseUrl || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), SAVE_SUCCESS_TIMEOUT);
  }, [localData, onUpdate]);

  const isButtonDisabled = isLoading;

  return (
    <div className="w-full mx-auto space-y-6">
      <RestaurantHeader />

      <Card className="p-6 space-y-6 ">
        <LogoImageSection
          logoImage={logoImage}
          isUploading={isUploadingLogo}
          onUpload={handleLogoUpload}
          onRemove={handleRemoveLogo}
        />
        <FormField
          id="name"
          label="Nom du restaurant"
          value={localData.name}
          onChange={(value) => updateField("name", value)}
          placeholder="Nom de votre restaurant"
        />

        <FormField
          id="tagline"
          label="Slogan"
          optional
          value={localData.tagline}
          onChange={(value) => updateField("tagline", value)}
          placeholder="Une courte description de votre restaurant..."
          rows={2}
        />

        <FormField
          id="story"
          label="Histoire"
          optional
          value={localData.story}
          onChange={(value) => updateField("story", value)}
          placeholder="Racontez l'histoire de votre restaurant..."
          rows={4}
        />

        <FormField
          id="phone"
          label="Numéro de téléphone"
          optional
          type="tel"
          value={localData.phone}
          onChange={(value) => updateField("phone", value)}
          placeholder="+1 (555) 123-4567"
        />
        <FormField
          id="menuBaseUrl"
          label="Menu URL"
          optional
          value={localData.menuBaseUrl}
          onChange={(value) => updateField("menuBaseUrl", value)}
          placeholder="https://menu.myrestaurant.com"
        />
        <SaveButton
          onClick={handleSave}
          disabled={isButtonDisabled}
          isLoading={isLoading}
          saved={saved}
        />
      </Card>
    </div>
  );
}
