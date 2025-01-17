import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { catchError, of } from 'rxjs'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { NgIf } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
    private router: Router,
    private destroyRef: DestroyRef,
  ) { }

  login() {
    const loginKey = this.key.value.trim()
    this.hasRequiredError = false
    this.hasLoginError = undefined
    if (loginKey) {
      of(this.authService.setToken(loginKey)).pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(error => {
          console.error(error)
          this.hasLoginError = error
          return []
        }),
      ).subscribe(() => this.router.navigate(['products']))
    } else {
      this.hasRequiredError = true
    }
  }

}