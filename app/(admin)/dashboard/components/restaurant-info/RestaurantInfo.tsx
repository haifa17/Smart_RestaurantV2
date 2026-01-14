import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Restaurant } from "@/lib/models/restaurant";
import { toast } from "react-toastify";
import { RestaurantHeader } from "./RestaurantHeader";
import { HeroImageSection } from "./HeroImageSection";
import { FormField } from "./FormField";
import { SaveButton } from "@/components/buttons/SaveButton";
import { LogoImageSection } from "./LogoImageSection";

interface RestaurantInfoProps {
  restaurant: Restaurant;
  isLoading: boolean;
  onUpdate: (data: Partial<Restaurant>) => void;
  onUploadImage: (
    file: File,
    folder: "logos" | "heroes"
  ) => Promise<{ url: string }>;
}

interface FormData {
  name: string;
  phone: string;
  tagline: string;
  story: string;
}

const SAVE_SUCCESS_TIMEOUT = 2000;

export function RestaurantInfo({
  restaurant,
  isLoading,
  onUpdate,
  onUploadImage,
}: RestaurantInfoProps) {
  const [saved, setSaved] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [localData, setLocalData] = useState<FormData>({
    name: restaurant.name || "",
    phone: restaurant.phone || "",
    tagline: restaurant.tagline || "",
    story: restaurant.story || "",
  });
  const [heroImage, setHeroImage] = useState<string | null>(
    restaurant.heroImage || null
  );
  const [logoImage, setLogoImage] = useState<string | null>(
    restaurant.logo || null
  );
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    setHeroImage(restaurant.heroImage || null);
  }, [restaurant.heroImage]);
  const updateField = useCallback((field: keyof FormData, value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploadingHero(true);
      try {
        const { url } = await onUploadImage(file, "heroes");
        setHeroImage(url);
        onUpdate({ heroImage: url });
        toast.success("Hero image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload hero image");
      } finally {
        setIsUploadingHero(false);
      }
    },
    [onUpdate, onUploadImage]
  );
  const handleLogoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploadingLogo(true);
      try {
        const { url } = await onUploadImage(file, "logos"); 
        setLogoImage(url);
        onUpdate({ logo: url });
        toast.success("Logo uploaded successfully");
      } catch (error) {
        console.error("Error uploading logo:", error);
        toast.error("Failed to upload logo");
      } finally {
        setIsUploadingLogo(false);
      }
    },
    [onUpdate, onUploadImage]
  );
  const handleRemoveLogo = useCallback(() => {
    setLogoImage(null);
    onUpdate({ logo: null });
  }, [onUpdate]);

  const handleRemoveHeroImage = useCallback(() => {
    setHeroImage(null);
    onUpdate({ heroImage: null });
  }, [onUpdate]);

  const handleSave = useCallback(() => {
    onUpdate({
      name: localData.name,
      phone: localData.phone || null,
      tagline: localData.tagline || null,
      story: localData.story || null,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), SAVE_SUCCESS_TIMEOUT);
  }, [localData, onUpdate]);

  const isButtonDisabled = isLoading || isUploadingHero;

  return (
    <div className="w-full mx-auto space-y-6">
      <RestaurantHeader />

      <Card className="p-6 space-y-6 bg-transparent border-none">
        <LogoImageSection
          logoImage={logoImage}
          isUploading={isUploadingLogo}
          onUpload={handleLogoUpload}
          onRemove={handleRemoveLogo}
        />
        <HeroImageSection
          heroImage={heroImage}
          isUploading={isUploadingHero}
          onUpload={handleImageUpload}
          onRemove={handleRemoveHeroImage}
        />

        <FormField
          id="name"
          label="Restaurant Name"
          value={localData.name}
          onChange={(value) => updateField("name", value)}
          placeholder="Your Restaurant Name"
        />

        <FormField
          id="tagline"
          label="Tagline"
          optional
          value={localData.tagline}
          onChange={(value) => updateField("tagline", value)}
          placeholder="A short description of your restaurant..."
          rows={2}
        />

        <FormField
          id="story"
          label="Story"
          optional
          value={localData.story}
          onChange={(value) => updateField("story", value)}
          placeholder="Tell your restaurant's story..."
          rows={4}
        />

        <FormField
          id="phone"
          label="Phone Number"
          optional
          type="tel"
          value={localData.phone}
          onChange={(value) => updateField("phone", value)}
          placeholder="+1 (555) 123-4567"
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
