import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


interface FormFieldProps {
  id: string
  label: string
  optional?: boolean
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  dir?: "ltr" | "rtl"
  className?: string
}

export function FormField({ 
  id, 
  label, 
  optional, 
  type, 
  value, 
  onChange, 
  placeholder, 
  rows,
  dir,
  className 
}: FormFieldProps) {
  const isTextarea = rows !== undefined

  return (
    <div className="space-y-2">
      <label htmlFor={id}>
        {label} {optional && <span className="text-muted-foreground">(optional)</span>}
      </label>
      
      {isTextarea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          dir={dir}
          className={className}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}