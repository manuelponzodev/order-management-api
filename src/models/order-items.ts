export interface OrderItem {
    id: bigint
    productId: bigint
    orderId: bigint
    unitPrice: number
    quantity: number
    deletedAt: Date
}