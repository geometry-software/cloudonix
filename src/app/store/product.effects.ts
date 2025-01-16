import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { ProductActions as ItemActions } from './product.actions'
import { Action } from '@ngrx/store'
import { ProductService } from '../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { map, switchMap } from 'rxjs'

@Injectable()
export class ProductEffects implements OnInitEffects {

    constructor(
        private actions: Actions,
        private productService: ProductService,
        private toastr: ToastrService
    ) { }

    ngrxOnInitEffects(): Action {
        return ItemActions.getItems()
    }

    getProducts = createEffect(() =>
        this.actions.pipe(
            ofType(ItemActions.getItems),
            switchMap(() =>
                this.productService.getProducts().pipe(
                    map(products => ItemActions.getItemsSuccess({ products })))))
    )


}