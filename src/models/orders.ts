export enum STATUSES {
    REQUESTED = "requested",
    SENT = "sent",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}

export interface Order {
    id: bigint
    status: STATUSES
    shippingPrice: number
    customerId: bigint
    deletedAt: Date
}