import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getLoading } from '../../store/product.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    MatProgressBarModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class ProductLayoutComponent {

  loading = inject(Store).select(getLoading)

}