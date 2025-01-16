import { createReducer, on } from '@ngrx/store'
import { ProductActions as ItemActions } from './product.actions'
import { initialState, State } from './product.state'


export const reducer = createReducer<State>(
    initialState,
    on(ItemActions.getItemsSuccess, (state, { products }) => ({
        ...state,
        products
    }))
)