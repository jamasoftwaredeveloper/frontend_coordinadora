export function formatISODate(
    isoString: string,
    locale = 'es-ES',
    options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }
  ) {
    // 1. Parsear la cadena ISO a Date (UTC)  
    const date = new Date(isoString); // Date acepta ISO-8601 nativamente :contentReference[oaicite:1]{index=1}

    // 2. Crear un formateador Intl.DateTimeFormat  
    const formatter = new Intl.DateTimeFormat(locale, options); // Intl.DateTimeFormat para formato localizado :contentReference[oaicite:2]{index=2}

    // 3. Devolver la fecha formateada  
    return formatter.format(date);
  }