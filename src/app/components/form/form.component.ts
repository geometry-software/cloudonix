import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProfileType } from '../../models/product.model';

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
export class FormComponent {

  constructor(
    private productService: ProductService
  ) { }

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    cost: new FormControl(null, Validators.required),
    sku: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    profile: new FormGroup({
      type: new FormControl(ProfileType.FURNITURE),
      available: new FormControl(true),
      backlog: new FormControl(null),
    })
  })

  submit() {
    // console.log(this.form.value)
    if (this.form.valid) {
      const formValue = this.form.value;
      this.productService.createProduct(formValue as Partial<Product>).subscribe()
    }
  }

}
