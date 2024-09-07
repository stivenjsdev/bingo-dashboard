export const dateFormatter = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long", // Día de la semana completo (ej. "lunes")
    year: "numeric", // Año con cuatro dígitos
    month: "long", // Mes completo (ej. "septiembre")
    day: "numeric", // Día del mes (ej. "6")
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
