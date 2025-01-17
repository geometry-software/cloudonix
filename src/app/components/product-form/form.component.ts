import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';
import { Product, ProfileType } from '../../models/product.model';
import { ProductActions } from '../../store/product.actions';
import { getProductById } from '../../store/product.selectors';
import { ProductProfileComponent } from '../product-profile/product-profile.component';
import { addNewKeyValueGroup } from '../../utils/dynamic-form';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    NgxMaskDirective,
    ProductProfileComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef,
  ) { }

  products: Product[] = [];
  productId: number | undefined
  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    cost: new FormControl<string | null>(null, Validators.required),
    sku: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    profile: new FormGroup({
      type: new FormControl(ProfileType.FURNITURE),
      available: new FormControl(true),
      backlog: new FormControl<number | null>(null),
      customControl: new FormArray([addNewKeyValueGroup()])
    })
  })

  ngOnInit(): void {
    if (this.router.url.includes('create')) {
      this.productId = undefined
    } else {
      this.productId = Number(this.route.snapshot.params['id'])
      this.form.controls.sku.disable()
      this.store.dispatch(ProductActions.getProduct({ id: this.productId }))
      this.store.select(getProductById(this.productId)).pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(console.warn)
      ).subscribe((product: Product) => {
        product.profile?.customControl?.forEach(() => this.form.controls.profile.controls.customControl.push(addNewKeyValueGroup()))
        this.form.patchValue({
          ...product,
          cost: product.cost,
          profile: {
            ...product.profile,
          }
        })
      })
    }
  }

  submit() {
    if (this.form.valid) {
      const product = this.form.value as Product;
      console.log(product);

      if (!this.productId) {
        this.store.dispatch(ProductActions.createProduct({ product }))
      } else {
        this.store.dispatch(ProductActions.editProduct({ product: { ...product, id: this.productId } }))
      }
    }
  }

}