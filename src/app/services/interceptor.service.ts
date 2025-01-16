import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CommonHttpRequest } from '../models/auth.model'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<CommonHttpRequest>, next: HttpHandler): Observable<HttpEvent<CommonHttpRequest>> {
        const token = this.authService.getToken()
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
        const header = request.clone({ headers })
        return next.handle(header)
    }

}