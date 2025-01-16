import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { catchError, delay, of } from 'rxjs'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  key = new FormControl()
  hasRequiredError: boolean | undefined
  hasLoginError: string | undefined

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    const loginKey = this.key.value
    this.hasRequiredError = false
    this.hasLoginError = undefined
    if (loginKey) {
      of(this.authService.setToken(loginKey)).pipe(
        delay(1000),
        catchError(error => {
          console.error(error)
          this.hasLoginError = error
          return []
        }),
        // no need to unsubscribe
      ).subscribe(() => this.router.navigate(['products']))
    } else {
      this.hasRequiredError = true
    }
  }

}