import { Check, Loader2 } from "lucide-react"
import { Button } from "../ui/button"

interface SaveButtonProps {
  onClick: () => void
  disabled: boolean
  isLoading: boolean
  saved: boolean
}

export function SaveButton({ onClick, disabled, isLoading, saved }: SaveButtonProps) {
  return (
    <Button onClick={onClick} className="w-full gap-2" disabled={disabled}>
      {saved ? (
        <>
          <Check className="h-4 w-4" />
          Saved!
        </>
      ) : isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  )
}