import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  options: Option[];
};

export function Select({ label, hint, options, id, className, ...props }: Props) {
  const fieldId = id ?? props.name ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="grid gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={fieldId}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        className={cn(
          "h-12 rounded-xl border border-line bg-white px-3 text-base text-ink outline-none focus:border-brand",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={`${fieldId}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
