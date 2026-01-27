import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  dir?: "ltr" | "rtl";
  className?: string;
  disabled?: boolean;
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
  className,
  disabled,
}: FormFieldProps) {
  const isTextarea = rows !== undefined;

  return (
    <div className="flex flex-col gap-2 lg:gap-4 ">
      <label htmlFor={id}>
        {label} {optional && <span className="">(optional)</span>}
      </label>

      {isTextarea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          dir={dir}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}
    </div>
  );
}
