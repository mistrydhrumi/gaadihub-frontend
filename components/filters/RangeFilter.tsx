import { Slider } from "@/components/ui/slider";

interface RangeFilterProps {
  title: string;
  min: number;
  max: number;
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

export default function RangeFilter({
  title,
  min,
  max,
  value,
  onValueChange,
}: RangeFilterProps) {
  const currentValue = value ?? [min, max];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

      <Slider
        value={currentValue}
        min={min}
        max={max}
        step={1}
        className="py-1"
        onValueChange={(nextValues) => onValueChange?.(nextValues as number[])}
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{currentValue[0]}</span>
        <span>{currentValue[1]}</span>
      </div>
    </div>
  );
}