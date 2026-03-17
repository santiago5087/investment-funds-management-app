import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type InputType = 'text' | 'number' | 'email' | 'tel';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  id = input<string>(`input-${Math.random()}`);
  type = input<InputType>('text');
  label = input<string>('');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  helperText = input<string>('');
  error = input<string>('');
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);
  
  value = model<string | number>('');
}
