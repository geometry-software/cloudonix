export const productBaseUrl = 'http://rest-items.research.cloudonix.io/items'

export const productsDisplayedColumns = ['index', 'sku', 'name', 'price', 'expand']

export type Product = {
    id?: number | null
    cost: string | null
    description: string | null
    name: string | null
    profile?: ProductProfile | null
    sku: string | null
}

export type ProductProfile = {
    type: ProfileType | null
    available: boolean | null
    backlog: number | null
    customControl: CustomControl[]
}

export enum ProfileType {
    FURNITURE = "furniture",
    EQUIPMENT = "equipment",
    STATIONARY = "stationary",
    PART = "part"
}

export type CustomControl = {
    key: string,
    value: string
}