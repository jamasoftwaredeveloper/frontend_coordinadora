
import { useState } from "react";
import Table from "../components/Table";
import { useShippingOrderQuery } from "../hooks/Queries/useShippingOrderQuery";
import { ShipmentDTO } from "../types/TUser";
import { EmptyState } from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { formatISODate } from "../utils/formateDate";
import { useQueryContext } from '../context/QueryContext';


export default function ListShippingOrderView() {

  const { routes, transporters } = useQueryContext();

  interface Filter {
    search: string;
    route_id?: number;
    transporter_id?: number;
  }

  const [filter, setFilter] = useState<Filter>();
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, refresh } = useShippingOrderQuery(filter);
  const shipments = (data as { shipments: ShipmentDTO[] })?.shipments;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateChange = () => {
    console.log("Selected range:", { start: startDate, end: endDate });
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    setFilter((prev) => ({ ...prev, search }));
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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 m-5">
        <Select options={routes.data || []} placeholder="Selecciona una ruta" onChange={(value) => {
          setFilter((prev) => ({ ...prev, search: prev?.search || "", route_id: parseInt(value.toString()) }));
          refresh()
        }
        } />
        <Select options={transporters.data || []} placeholder="Selecciona un transporte" onChange={(value) => {
          setFilter((prev) => ({ ...prev, search: prev?.search || "", transporter_id: parseInt(value.toString()) }));
          refresh()
        }
        } />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleDateChange}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Seleccionar Rango
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar por estado o número de tracking"
          value={search}
          onChange={e => setSearch(e.target.value)}
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
