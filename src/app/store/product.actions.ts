import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { storeFeatureKey } from '../models/store.model'
import { Product } from '../models/product.model'

export const ProductActions = createActionGroup({
    source: storeFeatureKey,
    events: {
        'Get Products': emptyProps(),
        'Get Products Success': props<{ products: Product[] }>(),
        'Get Product': props<{ id: number }>(),
        'Create Product': props<{ product: Product }>(),
        'Edit Product': props<{ product: Product }>(),
        'Delete Product': props<{ id: number }>(),
    },
})
