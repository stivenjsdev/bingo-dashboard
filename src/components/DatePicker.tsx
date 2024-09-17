import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { NewGameForm } from "@/types";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

type DatePickerProps = {
  field: ControllerRenderProps<NewGameForm, "date">;
};

export function DatePicker({ field }: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
          onClick={() => setIsCalendarOpen(true)}
        >
          {field.value ? (
            format(field.value, "EEEE, d 'de' MMMM 'del' yyyy", { locale: es })
          ) : (
            <span>Elige una fecha para el Juego</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={(date) => {
            field.onChange(date);
            setIsCalendarOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
