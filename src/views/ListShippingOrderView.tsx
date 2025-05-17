
import { useState } from "react";
import Table from "../components/Table";
import { useShippingOrderQuery } from "../hooks/Queries/useShippingOrderQuery";
import { ShipmentDTO } from "../types/TUser";
import { EmptyState } from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
export default function ListShippingOrderView() {

  // const queryClient = useQueryClient();
  // const data: ShipmentDTO = queryClient.getQueryData(['getShippingOrders'])!;
  const [filter, setFilter] = useState<string | undefined>();
  const { data, isLoading, isError, refresh } = useShippingOrderQuery(filter);
  const shipments = (data as { shipments: ShipmentDTO[] })?.shipments;
  const navigate = useNavigate();
  const handleSearch = () => {
    // aquí podrías pasar el filter como parámetro si tu API acepta query params
    // por ejemplo: refetch({ queryKey: ['getShippingOrders', filter] })
    console.log('Buscando envíos con el filtro:', filter);
    setFilter(filter);
    refresh()
  };

  // 3) Capturar Enter en el input
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  /**
   * Formatea una cadena ISO-8601 a un string legible.
   *
   * @param {string} isoString - Fecha en formato ISO, por ejemplo "2025-05-20T03:01:06.000Z".
   * @param {string} [locale='es-ES'] - Código de localización BCP47 para el idioma/país.
   * @param {Object} [options] - Opciones de formateo compatibles con Intl.DateTimeFormat.
   * @returns {string} - Fecha formateada, e.g. "20/05/2025, 03:01:06".
   */
  function formatISODate(
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

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar por estado o número de tracking"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          onKeyDown={onKeyDown}
          className="px-3 py-2 border rounded flex-1 focus:outline-none focus:ring"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2  text-white rounded "
          style={{ backgroundColor: '#1063AC' }} // Cambia el color aquí
        >
          Buscar
        </button>
      </div>

      {/* Estados de la petición */}
      {isLoading && <p>Cargando envíos…</p>}
      {isError && <p className="text-red-600">Error al cargar envíos.</p>}

      {/* 2) Empty State cuando no hay envíos */}
      {!isLoading && !isError && shipments.length === 0 && (
        <EmptyState
          title="¡Vaya, no hay envíos!"
          description="Parece que aún no has generado ningún pedido de envío."
          actionLabel="Crear nuevo envío"
          onAction={() => {
            // Navegar a página de creación, o refrescar, etc.
            navigate("/admin/shipping/order");
          }}
        />
      )}
      {shipments?.length > 0 &&
        <div>
          <Table striped>
            <Table.Head>
              <th className="px-6 py-3">Id</th>
              <th className="px-6 py-3">Número de tracking</th>
              <th className="px-6 py-3">Ruta</th>
              <th className="px-6 py-3">Transporte</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Fecha estipulada de llegada</th>
            </Table.Head>

            <Table.Body striped>
              {shipments?.map((shipment: ShipmentDTO) => (
                <tr key={shipment.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.trackingNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.transporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shipment.estimatedDeliveryDate 
                      ? formatISODate(shipment.estimatedDeliveryDate.toString()) 
                      : "Fecha no disponible"}
                  </td>
                </tr>
              ))}
              {/* Más filas... */}
            </Table.Body>
          </Table>
        </div>
      }
    </div>
  )
}
