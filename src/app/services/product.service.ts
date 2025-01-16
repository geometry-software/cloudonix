import { Injectable } from '@angular/core'
import { Product, productBaseUrl } from '../models/product.model'
import { HttpClient } from '@angular/common/http'
import { exhaustMap } from 'rxjs'

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

    createProduct(item: Partial<Product>) {
        return this.httpClient.post(this.url, item)
    }

    editProduct(item: Product) {
        return this.httpClient.patch(this.url + '/' + item.id, item)
    }

    deleteProduct(id: string) {
        return this.httpClient.delete(this.url + '/' + id).pipe(
            exhaustMap(() => this.getProducts())
        )
    }

}