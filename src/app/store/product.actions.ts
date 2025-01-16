import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { storeFeatureKey } from '../models/store.model'
import { Product } from '../models/product.model'

export const ProductActions = createActionGroup({
    source: storeFeatureKey,
    events: {
        'Get Items': emptyProps(),
        'Get Items Success': props<{ products: Product[] }>(),
    },
})
