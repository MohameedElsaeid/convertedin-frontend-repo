import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'convertedin-currency-input',
  standalone: true,
  imports: [CommonModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent implements OnInit {
  @HostBinding('class') class = 'relative w-full flyerz__currency-input';
  @Input({ required: true }) currency!: string;
  @Input({ required: true }) controlName!: string;
  @Input() minValue: number = 0;
  @Input() placeholder!: string;

  get dir() {
    return document.documentElement.dir;
  }
  form!: FormGroup;

  constructor(private __formDir: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.__formDir.control;
  }
}
