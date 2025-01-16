import { Injectable } from '@angular/core'
import { authTokenName } from '../models/auth.model'

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    setToken(key: string) {
        return localStorage.setItem(authTokenName, key)
    }

    getToken() {
        return localStorage.getItem(authTokenName)
    }

}