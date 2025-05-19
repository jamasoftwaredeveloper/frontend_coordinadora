
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { useShippingOrderQuery } from "../hooks/Queries/useShippingOrderQuery";
import { Filter, ShipmentDTO, ShipmentStatus } from "../types/TShipmentOrder";
import { EmptyState } from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { formatDateForSQL, formatISODate } from "../utils/formateDate";
import { Calendar, CarIcon, EyeIcon, Search, X } from "lucide-react";
import { shipmentStatusOptions } from '../utils/data';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useQueryContext } from '../context/QueryContext';
import Modal from "../components/Modal";
import { useShippingOrderUpdateMutation } from "../hooks/Mutations/useShippingOrderUpdateMutation";
import { useShippingOrderUpdateStatusMutation } from "../hooks/Mutations/useShippingOrderUpdateStatusMutation";
import LoadingSpinner from "../components/LoadingSpinner";
import { io } from 'socket.io-client';
import { useUserAuthQuery } from "../hooks/Queries/useAuthQuery";

export default function ListShippingOrderView() {
  const { data: user } = useUserAuthQuery();
  const { routes, transporters } = useQueryContext();
  const { mutate: shippingOrderAssign } = useShippingOrderUpdateMutation();
  const { mutate: updateStatus } = useShippingOrderUpdateStatusMutation();
  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize] = useState<number>(5);
  const [filter, setFilter] = useState<Filter>();
  const [trackingNumber, setSearch] = useState<string>("");
  const [titleModal, setTitleModal] = useState<string>();
  const { data, isLoading, isError, refresh } = useShippingOrderQuery({ ...filter, page, pageSize });
  const shipments = (data as { shipments: ShipmentDTO[] })?.shipments;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentDTO | null>(null);
  const [routeId, setRouteId] = useState<string | number>();
  const [transporterId, setTransporterId] = useState<string | number>();
  const [errors, setErrors] = useState({ route: '', transporter: '' });
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const socket = io(import.meta.env.VITE_SERVE_URL);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    // Escuchar actualizaciones de mensajes
    socket.on('update', (newMessage) => {
      console.log("socket", newMessage);

    });

    return () => {
      socket.off('update');
    };
  }, []);

  const handleOpenModal = (shipment: ShipmentDTO, type: string) => {
    setSelectedShipment(shipment);
    setType(type)
    if (type == "show") {
      setTitleModal("Detalles del Envío")
    } else {
      setTitleModal("Asignar paquete")
    }
    setIsModalOpen(true);
  };

  const changeStatusShipping = (shipment: Pick<ShipmentDTO, "id">, status: string) => {
    updateStatus({ id: shipment.id, status: status as ShipmentStatus })
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShipment(null);
    setErrors({ route: '', transporter: '' });
  };
  const handleDateChange = () => {
    setFilter((prev) => ({ ...prev, startDate: formatDateForSQL(startDate), endDate: formatDateForSQL(endDate) }));
    refresh()
  };


  const handleSearch = () => {
    setFilter((prev) => ({ ...prev, search: trackingNumber }));
    refresh()
  };
  const handleClear = () => {
    setFilter({});
    setSearch("");
    setStartDate("");
    setEndDate("");
    refresh()
  };
  const submitShippingOrderAssign = () => {
    // Validación de campos
    const formErrors = { route: '', transporter: '' };
    if (!routeId) formErrors.route = 'La ruta es obligatoria.';
    if (!transporterId) formErrors.transporter = 'El transporte es obligatorio.';

    // Si hay errores, actualiza el estado y no envía el formulario
    if (formErrors.route || formErrors.transporter) {
      setErrors(formErrors);
      return;
    }

    console.log("selectedShipment", selectedShipment)
    if (selectedShipment) {
      console.log("entro a update")

      shippingOrderAssign({
        route_id: Number(routeId), transporter_id: Number(transporterId), id: selectedShipment.id || 0
      });
    }
    setErrors({ route: '', transporter: '' });  // Limpia los errores
    setTransporterId("")
    setRouteId("")
    refresh()
    setIsModalOpen(false);
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
          setFilter((prev) => ({ ...prev, route_id: parseInt(value.toString()) }));
          refresh()
        }
        } />
        <Select options={transporters.data || []} placeholder="Selecciona un transporte" onChange={(value) => {
          setFilter((prev) => ({ ...prev, transporter_id: parseInt(value.toString()) }));
          refresh()
        }
        } />
        <Select options={shipmentStatusOptions || []} placeholder="Selecciona un estado" onChange={(value) => {
          setFilter((prev) => ({ ...prev, status: value }));
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
          <button className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-500 text-white rounded" title="Filtrar por fecha" onClick={handleDateChange}>
            <Calendar size={20} className="m-auto" />
            Fecha
          </button>

          <button className="flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded" title="Limpiar filtro" onClick={handleClear}>
            <X size={20} className="m-auto" />
            Limpiar
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar por número de tracking"
          value={trackingNumber}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          className="px-3 py-2 border rounded flex-1 focus:outline-none focus:ring"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2  text-white rounded "
          style={{ backgroundColor: '#1063AC' }} // Cambia el color aquí
          title="Buscar"
        >
          <Search size={20} className="m-auto" />
        </button>
      </div>

      {/* Estados de la petición */}
      {isLoading && (
        <LoadingSpinner
          message="Cargando envios..."
        />
      )}
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
              {user?.role === "admin" && (
                <>
                  <th className="px-6 py-3">Cambio de estado</th>
                  <th className="px-6 py-3">Asignar</th>
                </>
              )
              }

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
                  <td className="text-center">
                    <button onClick={() => handleOpenModal(shipment, 'show')}
                      className="px-4 py-2 ml-2 text-white rounded"
                      style={{ backgroundColor: '#1063AC' }}
                      title="Ver envio"
                    ><EyeIcon size={20} className="m-auto" /></button>
                  </td>
                  {user?.role === "admin" && (
                    <>
                      <td>
                        <Select options={shipmentStatusOptions || []} placeholder="Selecciona un estado" onChange={(value) => {
                          changeStatusShipping(shipment, value.toString());
                        }
                        } />
                      </td>
                      <td className="text-center">
                        <button onClick={() => handleOpenModal(shipment, 'assig')}
                          className="px-4 py-2 ml-2 text-white rounded"
                          style={{ backgroundColor: '#F05A28' }}
                          title="Asignar en envio"
                        ><CarIcon size={20} className="m-auto" /></button>
                      </td>
                    </>)}
                </tr>
              ))}
              {/* Más filas... */}
            </Table.Body>
          </Table>
          <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={`p-2 text-white font-semibold rounded-md transition-colors ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[rgb(16,99,172)] hover:bg-blue-900"
                }`}
            >
              Anterior
            </button>
            <span className="text-gray-700 font-medium">Página {page}</span>
            <button
              onClick={nextPage}
              className="p-2 text-white font-semibold rounded-md transition-colors bg-[rgb(16,99,172)] hover:bg-blue-700"
            >
              Siguiente
            </button>
          </div>


          <Modal title={titleModal || "Default Title"} isOpen={isModalOpen} onClose={handleCloseModal}>
            {
              selectedShipment &&
                type === "show" ? (
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
                  <p
                    className="text-red-500"
                  >
                    <strong>Costo: </strong> {selectedShipment.cost}</p>
                </div>
              ) : (
                <form className="p-6 rounded-lg shadow-md space-y-6" onSubmit={(event) => {
                  event.preventDefault();  // Evita el recargado de la página
                  submitShippingOrderAssign();  // Ejecuta la función
                }}>
                  <Select options={routes.data || []} placeholder="Selecciona una ruta" onChange={(value) => {
                    setRouteId(value)
                  }
                  } />
                  {errors.route && <p className="text-red-600">{errors.route}</p>}
                  <Select options={transporters.data || []} placeholder="Selecciona un transporte" onChange={(value) => {
                    setTransporterId(value)
                  }
                  } />
                  {errors.transporter && <p className="text-red-600">{errors.transporter}</p>}
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
