export function formatISODate(
  isoString: string,
  locale = "es-ES",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }
) {
  // Crear el objeto Date desde el ISO string
  const date = new Date(isoString);

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida");
  }

  // Crear el formateador de fecha localizado
  const formatter = new Intl.DateTimeFormat(locale, options);

  // Formatear la fecha
  return formatter.format(date);
}
