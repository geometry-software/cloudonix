import { Injectable } from '@angular/core'
import { Product, productBaseUrl } from '../models/product.model'
import { HttpClient } from '@angular/common/http'
import { exhaustMap, tap } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) { }

    private url = productBaseUrl

    getProducts() {
        return this.httpClient.get<Product[]>(this.url)
    }

    createProduct(item: Product) {
        return this.httpClient.post<Product>(this.url, item).pipe(
            tap(v => console.log(v))
        )
    }

    editProduct(item: Product) {
        return this.httpClient.patch(this.url + '/' + item.id, item).pipe(
            tap(v => console.log(v))
        )
    }

    deleteProduct(id: number) {
        return this.httpClient.delete(this.url + '/' + id).pipe(
            exhaustMap(() => this.getProducts())
        )
    }

}