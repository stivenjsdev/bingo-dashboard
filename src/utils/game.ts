export const dateFormatter = (date: Date) => {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "UTC", // Zona horaria de Colombia
    weekday: "long", // Día de la semana completo (ej. "lunes")
    year: "numeric", // Año con cuatro dígitos
    month: "long", // Mes completo (ej. "septiembre")
    day: "2-digit", // Día del mes (ej. "6")
  }).format(date);
};

export function capitalizeWords(str: string) {
  return str
    .split(" ")
    .reduce((acc, word) => {
      return acc + " " + word.charAt(0).toUpperCase() + word.slice(1);
    }, "")
    .trim();
}

export function getBingoLetter(number: number): string {
  const letters = ["b", "i", "n", "g", "o"];
  if (number < 1 || number > 75) {
    // Número fuera de rango
    return "";
  }
  return letters[Math.floor((number - 1) / 15)];
}
