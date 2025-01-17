import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { ProductActions as ItemActions } from './product.actions'
import { Action } from '@ngrx/store'
import { ProductService } from '../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { catchError, map, switchMap } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
export class ProductEffects implements OnInitEffects {

    constructor(
        private actions: Actions,
        private productService: ProductService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngrxOnInitEffects(): Action {
        return ItemActions.getProducts()
    }

    getProducts = createEffect(() =>
        this.actions.pipe(
            ofType(ItemActions.getProducts),
            switchMap(() =>
                this.productService.getProducts()
                    .pipe(
                        map(products => ItemActions.getProductsSuccess({ products })),
                        catchError(error => this.handleError(error))))))

    createProduct = createEffect(() =>
        this.actions.pipe(
            ofType(ItemActions.createProduct),
            switchMap(({ product }) =>
                this.productService.createProduct(product)
                    .pipe(
                        map(() => this.handleSuccess('Successfully created')),
                        catchError(error => this.handleError(error))))))

    editProduct = createEffect(() =>
        this.actions.pipe(
            ofType(ItemActions.editProduct),
            switchMap(({ product }) =>
                this.productService.editProduct(product)
                    .pipe(
                        map(() => this.handleSuccess('Successfully edited')),
                        catchError(error => this.handleError(error))))))

    deleteProduct = createEffect(() =>
        this.actions.pipe(
            ofType(ItemActions.deleteProduct),
            switchMap(({ id }) =>
                this.productService.deleteProduct(id)
                    .pipe(
                        map(() => this.handleSuccess('Successfully deleted')),
                        catchError(error => this.handleError(error))))))

    private handleSuccess(message: string) {
        this.toastr.success(message)
        this.router.navigate(['products'])
        return ItemActions.getProducts()
    }

    private handleError(message: string) {
        this.toastr.error('Error', message)
        return []
    }

}