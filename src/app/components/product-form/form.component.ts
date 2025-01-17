import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Product, ProfileType } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../store/product.actions';
import { getProductById } from '../../store/product.selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ProductFormComponent implements OnInit {

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) { }

  products: Product[] = [];
  productId: number | undefined
  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    cost: new FormControl<number | null>(null, Validators.required),
    sku: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    profile: new FormGroup({
      type: new FormControl(ProfileType.FURNITURE),
      available: new FormControl(true),
      backlog: new FormControl<number | null>(null),
    })
  })

  ngOnInit(): void {
    if (this.route?.snapshot.routeConfig?.path?.includes('create')) {
      this.productId = undefined
    } else {
      this.productId = Number(this.route.snapshot.params['id'])
      this.form.controls.sku.disable()
      this.store.dispatch(ProductActions.getProduct({ id: this.productId }))
      this.store.select(getProductById(this.productId)).pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean)
      ).subscribe(product => this.form.patchValue({
        ...product,
        profile: {
          ...product.profile,
        }
      }))
    }
  }

  submit() {
    if (this.form.valid) {
      const product = this.form.value as Product;
      if (!this.productId) {
        this.store.dispatch(ProductActions.createProduct({ product }))
      } else {
        this.store.dispatch(ProductActions.editProduct({ product: { ...product, id: this.productId } }))
      }
    }
  }

}