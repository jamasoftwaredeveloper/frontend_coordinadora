// Paso 1: Instalación de librerías
// Ejecuta el siguiente comando para instalar recharts:
// npm install recharts

import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Filter, MonthlyMetrics, RouteMetrics, TransporterMetrics } from '../types/TShipmentOrder';
import { ShippingOrderService } from '../services/shipping/OrderService';
import { formatDateForSQL } from '../utils/formateDate';
import { EmptyState } from '../components/EmptyState';
import { colors } from '../utils/data';


// Componente para visualizar métricas de transportistas
export default function TransporterMetricsComponent() {
    const [metricTransporters, setMetricTransporters] = useState<TransporterMetrics[]>([]);
    const [filter, setFilter] = useState<Pick<Filter, "startDate" | "endDate">>({ startDate: '', endDate: '' });
    const [routeData, setRouteData] = useState<RouteMetrics[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlyMetrics[]>([]);


    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const [transporterResponse, routeResponse, monthResponse] = await Promise.all([
                    ShippingOrderService().getTransporterPerformanceMetrics(filter),
                    ShippingOrderService().getRoutePerformanceMetrics(filter),
                    ShippingOrderService().getMonthlyPerformanceMetrics(filter),
                ]);

                const typedTransporterResponse = transporterResponse as { transporters: TransporterMetrics[] };
                setMetricTransporters(typedTransporterResponse.transporters);
                const typedRouteResponse = routeResponse as { routes: RouteMetrics[] };
                setRouteData(typedRouteResponse.routes);
                const typedMonthResponse = monthResponse as { data: MonthlyMetrics[] };
                setMonthlyData(typedMonthResponse.data);
            } catch (error) {
                console.error('Error fetching transporter metrics:', error);
            }
        };

        fetchMetrics();
    }, [filter]);

  
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 m-5">
                {(["startDate", "endDate"] as Array<"startDate" | "endDate">).map((key) => (
                    <input
                        key={key}
                        type="datetime-local"
                        value={filter[key]}
                        onChange={(e) => setFilter((prev) => ({ ...prev, [key]: formatDateForSQL(e.target.value) }))}
                        className="p-2 border rounded-md"
                    />
                ))}
            </div>
    
            {useMemo(() => {
                if (!monthlyData.length && !metricTransporters.length && !routeData.length) {
                    return (
                        <EmptyState
                            title="¡Vaya, no hay gráficas!"
                            description="Parece que aún no has seleccionado el rango de fechas para la generación de las gráficas."
                        />
                    );
                }
    
                return (
                    <>
                        {monthlyData.length > 0 && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Métricas Mensuales</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total_shipments" name="Total Envíos">
                                            {monthlyData.map((_, index) => (
                                                <Cell key={index} fill={colors[index % colors.length]} />
                                            ))}
                                        </Bar>
                                        <Bar dataKey="completed_shipments" name="Envíos Completados">
                                            {monthlyData.map((_, index) => (
                                                <Cell key={index} fill={colors[(index + 1) % colors.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </>
                        )}
    
                        {metricTransporters.length > 0 && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Métricas de Transportistas</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={metricTransporters} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="transporter_name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {["total_shipments", "completed_shipments", "pending_shipments", "cancelled_shipments"].map((key, i) => (
                                            <Bar key={key} dataKey={key} name={key.replace("_", " ")}>
                                                {metricTransporters.map((_, index) => (
                                                    <Cell key={index} fill={colors[(index + i) % colors.length]} />
                                                ))}
                                            </Bar>
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </>
                        )}
    
                        {routeData.length > 0 && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Métricas de Rutas</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={routeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="route_name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {["total_shipments", "avg_delivery_time_days"].map((key, i) => (
                                            <Bar key={key} dataKey={key} name={key.replace("_", " ")}>
                                                {routeData.map((_, index) => (
                                                    <Cell key={index} fill={colors[(index + i) % colors.length]} />
                                                ))}
                                            </Bar>
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </>
                        )}
                    </>
                );
            }, [monthlyData, metricTransporters, routeData])}
        </div>
    );
    

}

// Instrucciones adicionales:
// 1. El componente utiliza datos quemados para fines de prueba.
// 2. Puedes ajustar los datos directamente en la variable 'dummyMetrics'.
