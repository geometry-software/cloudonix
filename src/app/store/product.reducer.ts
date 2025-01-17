import { createReducer, on } from '@ngrx/store'
import { ProductActions as ItemActions } from './product.actions'
import { initialState, State } from './product.state'

export const reducer = createReducer<State>(
    initialState,
    on(ItemActions.getProducts, (state,) => ({
        ...state,
        loading: true
    })),
    on(ItemActions.getProductsSuccess, (state, { products }) => ({
        ...state,
        products,
        loading: false
    })),
    on(ItemActions.createProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(ItemActions.editProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(ItemActions.deleteProduct, (state) => ({
        ...state,
        loading: true
    }))
)