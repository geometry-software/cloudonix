import { Product } from "../models/product.model"

export interface State {
    products: Product[]
}

export const initialState: State = {
    products: []
}
