import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGame } from "@/hooks/useGame";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

type GameType = {
  value: number;
  label: string;
};

const gameTypes: GameType[] = [
  { value: 0, label: "Cartón Completo" },
  { value: 1, label: "Diagonal" },
  { value: 2, label: "Cuatro Esquinas" },
  { value: 3, label: "Marco" },
];

type ChangeGameTypeFormProps = {
  handleOnClick: (gameType: number) => void;
};

const ChangeGameTypeForm = ({ handleOnClick }: ChangeGameTypeFormProps) => {
  const {
    state: { selectedGame: game },
  } = useGame();

  const hasGameStarted = useMemo(
    () => game.drawnBalls.length > 0,
    [game.drawnBalls]
  );

  const form = useForm<{ gameType: number }>({
    defaultValues: {
      gameType: game.gameType,
    },
  });

  const onSubmit = (data: { gameType: number }) => {
    const selectedType = gameTypes.find((type) => type.value === data.gameType);
    console.log(`Value: ${data.gameType}, Text: ${selectedType?.label}`);
    console.log(typeof data.gameType);
    handleOnClick(data.gameType);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-4">
        <FormField
          control={form.control}
          name="gameType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-900">
                Tipo de Juego
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={String(field.value)}
                disabled={hasGameStarted}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo de juego" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gameTypes.map((type) => (
                    <SelectItem key={type.value} value={String(type.value)}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={hasGameStarted}>
          Cambiar Tipo de Juego
        </Button>
      </form>
    </Form>
  );
};

export default ChangeGameTypeForm;
