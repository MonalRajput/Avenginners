export interface AncillarySelection {
  ancillaryId: number;
  quantity: number;
}

export interface BookingRequest {
  userId: number;
  flightId: number;
  pickupRouteId: number;
  dropRouteId: number;
  pickupAddress: string;
  dropAddress: string;
  ancillaries: AncillarySelection[];
}
