import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxFilterProps {
  options: string[];
  selectedValues?: string[];
  onOptionChange?: (option: string, checked: boolean) => void;
}

export default function CheckboxFilter({
  options,
  selectedValues = [],
  onOptionChange,
}: CheckboxFilterProps) {
  return (
    <div className="space-y-2">


      {options.map((option) => (
        <label
          key={option}
          htmlFor={option}
          className="flex items-center gap-2 text-sm text-slate-700"
        >
          <Checkbox
            id={option}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => onOptionChange?.(option, checked === true)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}