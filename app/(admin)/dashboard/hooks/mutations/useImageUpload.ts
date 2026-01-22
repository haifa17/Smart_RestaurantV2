import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";

export function useImageUpload() {
  return useMutation({
    mutationFn: ({
      file,
      folder,
    }: {
      file: File;
      folder: "logos" | "heroes" | "menu-items";
    }) => apiClient.uploadImage(file, folder),
    onError: (error: Error) => {
      toast.error(`Échec du chargement de l'image: ${error.message}`);
    },
  });
}
