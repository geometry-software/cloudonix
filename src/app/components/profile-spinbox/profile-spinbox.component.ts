import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile-spinbox',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './profile-spinbox.component.html',
  styleUrl: './profile-spinbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileSpinboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSpinboxComponent implements ControlValueAccessor {

  value: number = 0
  onChange: any = () => { }
  onTouched: any = () => { }

  writeValue(value: number): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  increment() {
    this.value++
    this.onChange(this.value)
  }

  decrement() {
    this.value--
    this.onChange(this.value)
  }

  onInput(event: Event) {
    this.value = Number((event.target as HTMLInputElement).value)
    this.onChange(this.value)
  }

}