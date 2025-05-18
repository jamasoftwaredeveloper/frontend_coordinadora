
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
    "route_id" | "transporter_id" | "user_id"
  > & {};
  
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
  }
  
  export enum ShipmentStatus {
    PENDING = "En espera",
    PROCESSING = "En procesamiento",
    SHIPPING = "En camino",
    DELIVERED = "Entregado",
    CANCELLED = "Cancelado",
  }
  
  export interface Filter {
    search: string;
    route_id?: number;
    transporter_id?: number;
    startDate?: string;
    endDate?: string;
  }