export interface ShippingOrderForm {
  route_id?: number;
  transporter_id?: number;
  user_id: number;
  packageInfo: PackageInfo;
  exitAddress: Address;
  destinationAddress: Address;
}

export type ShippingOrderAssignForm = Pick<
  ShippingOrderForm,
  "route_id" | "transporter_id"
> & {
  id: number;
};

export interface PackageInfo {
  weight: string;
  height: string;
  width: string;
  length: string;
  productType: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  recipientName: string;
  recipientPhone: string;
}

export type ValidationAddressForm = Omit<
  Address,
  "recipientName" | "recipientPhone"
> & {};

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  recipientName: string;
  recipientPhone: string;
}
export interface ShipmentDTO {
  id?: number;
  userId: number;
  routeId?: number;
  transporterId?: number;
  transporter?: string;
  route?: string;
  packageInfo: PackageInfo;
  exitAddress: Address;
  destinationAddress: Address;
  status: ShipmentStatus;
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  cost?: number;
}

export enum ShipmentStatus {
  PENDING = "En espera",
  PROCESSING = "En procesamiento",
  SHIPPING = "En camino",
  DELIVERED = "Entregado",
  CANCELLED = "Cancelado",
}

export interface Filter {
  search?: string;
  route_id?: number;
  transporter_id?: number;
  startDate?: string;
  endDate?: string;
  page?: number; // Added page property
  pageSize?: number; // Added pageSize proper
}

export type ParamUpdateStatus = Pick<ShipmentDTO, "id" | "status"> & {};

export interface TransporterMetrics {
  transporter_name: string;
  total_shipments: number;
  completed_shipments: number;
  pending_shipments: number;
  cancelled_shipments: number;
}

export interface MonthlyMetrics {
  transporter_id: number;
  transporter_name: string;
  year: number;
  month: number;
  total_shipments: number;
  completed_shipments: number;
  avg_delivery_time_days: string;
}

export interface RouteMetrics {
  route_id: number;
  route_name: string;
  transporter_id: number;
  transporter_name: string;
  total_shipments: number;
  avg_delivery_time_days: string;
}

export interface TransporterForm {
  name: string;
  vehicle_capacity: number;
}
