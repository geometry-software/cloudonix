import { Product } from "../models/product.model"

export interface State {
    products: Product[]
    loading: boolean
}

export const initialState: State = {
    products: [],
    loading: false
}
