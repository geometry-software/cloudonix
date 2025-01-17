import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ProfileType } from '../../models/product.model';
import { ProfileSpinboxComponent } from '../profile-spinbox/profile-spinbox.component';
import { NgFor, NgIf } from '@angular/common';
import { addNewKeyValueGroup } from '../../utils/dynamic-form';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-profile',
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    ProfileSpinboxComponent,
    NgFor,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './product-profile.component.html',
  styleUrl: './product-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductProfileComponent {

  @Input()
  profileGroup!: FormGroup

  readonly profileTypes = Object.values(ProfileType)

  get customControl(): FormArray {
    return this.profileGroup.get('customControl') as FormArray
  }

  add(index: number): void {
    this.customControl.insert(index, addNewKeyValueGroup())
  }

  remove(index: number): void {
    this.customControl.removeAt(index)
  }

  disable(control: AbstractControl) {
    return (control as FormGroup).controls['key'].value
  }

}