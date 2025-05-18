
import { useState } from "react";
import Table from "../components/Table";
import { useShippingOrderQuery } from "../hooks/Queries/useShippingOrderQuery";
import { Filter, ShipmentDTO } from "../types/TShipmentOrder";
import { EmptyState } from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { formatISODate } from "../utils/formateDate";
import { Calendar, CarIcon, EyeIcon, Search, X } from "lucide-react";
import { shipmentStatusOptions } from '../utils/data';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useQueryContext } from '../context/QueryContext';
import Modal from "../components/Modal";


export default function ListShippingOrderView() {

  const { routes, transporters } = useQueryContext();

  const [filter, setFilter] = useState<Filter>();
  const [search, setSearch] = useState<string>("");
  const [titleModal, setTitleModal] = useState<string>();
  const { data, isLoading, isError, refresh } = useShippingOrderQuery(filter);
  const shipments = (data as { shipments: ShipmentDTO[] })?.shipments;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentDTO | null>(null);

  const handleOpenModal = (shipment: ShipmentDTO, type: string) => {
    if (type == "show") {
      setTitleModal("Detalles del Envío")
      setSelectedShipment(shipment);
    } else {
      setTitleModal("Asignar paquete")
    }
    setIsModalOpen(true);
  };

  const changeStatusShipping = (shipment: Pick<ShipmentDTO, "id">, status: string) => {
    console.log("shipment", shipment.id);
    console.log("status", status);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShipment(null);
  };
  const handleDateChange = () => {
    setFilter((prev) => ({ ...prev, search, startDate: formatDateForSQL(startDate), endDate: formatDateForSQL(endDate) }));
    refresh()
  };
  const navigate = useNavigate();
  const formatDateForSQL = (date: string): string => {
    if (date) {
      return date.replace("T", " ") + ":00";
    } else {
      return "";
    }
  };

  const handleSearch = () => {
    setFilter((prev) => ({ ...prev, search, startDate: formatDateForSQL(startDate), endDate: formatDateForSQL(endDate) }));
    refresh()
  };
  const handleClear = () => {
    setFilter({ search: "" });
    setSearch("");
    setStartDate("");
    setEndDate("");
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
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <div className="flex gap-2 items-center">
          <button className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-500 text-white rounded" onClick={handleDateChange}>
            <Calendar size={20} className="m-auto" />
            Fecha
          </button>

          <button className="flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded" onClick={handleClear}>
            <X size={20} className="m-auto" />
            Limpiar
          </button>
        </div>
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
          <Search size={20} className="m-auto" />
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
              <th className="px-6 py-3">Ver</th>
              <th className="px-6 py-3">Asignar</th>
              <th className="px-6 py-3">Cambio de estado</th>
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
                  <td>
                    <button onClick={() => handleOpenModal(shipment, 'show')}
                      className="px-4 py-2  text-white rounded"
                      style={{ backgroundColor: '#1063AC' }}
                    ><EyeIcon size={20} className="m-auto" /></button>
                  </td>
                  <td>
                    <button onClick={() => handleOpenModal(shipment, 'assig')}
                      className="px-4 py-2 m-2 text-white rounded"
                      style={{ backgroundColor: '#F05A28' }}
                    ><CarIcon size={20} className="m-auto" /></button>
                  </td>
                  <td>
                    <Select options={shipmentStatusOptions || []} placeholder="Selecciona una ruta" onChange={(value) => {
                      changeStatusShipping(shipment, value.toString());
                    }
                    } />
                  </td>
                </tr>
              ))}
              {/* Más filas... */}
            </Table.Body>
          </Table>
          <Modal title={titleModal || "Default Title"} isOpen={isModalOpen} onClose={handleCloseModal}>
            {selectedShipment ? (
              <div>
                <h1><strong>Información del paquete</strong></h1>
                <p>Altura: {selectedShipment.packageInfo.height}</p>
                <p>Ancho: {selectedShipment.packageInfo.width}</p>
                <p>Longitud: {selectedShipment.packageInfo.length}</p>
                <p>Tipo: {selectedShipment.packageInfo.productType}</p>
                <p>Peso: {selectedShipment.packageInfo.weight}</p>
                <h1><strong>Dirección de recogida</strong></h1>
                <p>Quien recibe: {selectedShipment.exitAddress.recipientName}</p>
                <p>Contacto: {selectedShipment.exitAddress.recipientPhone}</p>
                <p>País: {selectedShipment.exitAddress.country}</p>
                <p>Estado: {selectedShipment.exitAddress.state}</p>
                <p>Ciudad: {selectedShipment.exitAddress.city}</p>
                <p>Dirección: {selectedShipment.exitAddress.street}</p>
                <h1><strong>Dirección de llegada</strong></h1>
                <p>Quien recibe: {selectedShipment.destinationAddress.recipientName}</p>
                <p>Contacto: {selectedShipment.destinationAddress.recipientPhone}</p>
                <p>País: {selectedShipment.destinationAddress.country}</p>
                <p>Estado: {selectedShipment.destinationAddress.state}</p>
                <p>Ciudad: {selectedShipment.destinationAddress.city}</p>
                <p>Dirección: {selectedShipment.destinationAddress.street}</p>
              </div>
            ) : (
              <form className="p-6 rounded-lg shadow-md space-y-6">
                <Select options={routes.data || []} placeholder="Selecciona una ruta" onChange={(value) => {
                  console.log("ruta", value);
                }
                } />
                <Select options={transporters.data || []} placeholder="Selecciona un transporte" onChange={(value) => {
                  console.log("transporte", value);
                }
                } />
                <div className="text-center mt-4">
                  <input type="submit" className="bg-[#1063AC] text-white p-3 rounded-lg font-bold hover:bg-[#0E568E] cursor-pointer" value="Asignar Orden" />
                </div>
              </form>
            )}


          </Modal>
        </div>
      }

    </div>
  )
}
