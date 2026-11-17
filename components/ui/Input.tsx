import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  prefix?: string;
};

export function Input({ label, hint, error, id, className, prefix, ...props }: Props) {
  const fieldId = id ?? props.name ?? label.replace(/\s+/g, "-").toLowerCase();
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
  return (
    <div className="grid gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn("field tabular", prefix && "field-prefix", className)}
          {...props}
        />
      </div>
      {hint && !error ? (
        <p id={`${fieldId}-hint`} className="text-sm leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm font-medium text-danger-ink" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
