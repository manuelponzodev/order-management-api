export interface Product {
    id: bigint
    name: string
    price: number
    stock: number
    deletedAt: Date | null
    updatedAt: Date
    createdAt: Date
}
