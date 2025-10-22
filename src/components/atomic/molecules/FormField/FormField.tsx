import { ReactNode } from "react";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";

export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "tel" | "textarea";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
  [key: string]: any;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className,
  rows = 4,
}: FormFieldProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof onChange === "function") {
      onChange(e.target.value);
    }
  };

  const commonProps = {
    id: name,
    name,
    placeholder,
    value,
    onChange: handleChange,
    error,
    disabled,
    className,
    "aria-required": required,
    "aria-invalid": !!error,
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <Textarea {...commonProps} rows={rows} />
      ) : (
        <Input {...commonProps} type={type} />
      )}
    </div>
  );
}
