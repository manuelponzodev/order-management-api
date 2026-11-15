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
    shippingAddress: string
    customerId: bigint
    deletedAt: Date | null
    updatedAt: Date
    createdAt: Date
}