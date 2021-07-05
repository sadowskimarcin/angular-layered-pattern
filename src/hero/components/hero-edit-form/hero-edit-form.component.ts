import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroEditData } from '../../models/hero-edit-data';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditFormComponent {
  @Output() submitForm = new EventEmitter<HeroEditData>();
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  public submit(): void {
    const nameControl = this.form.get('name');

    this.submitForm.emit({
      name: nameControl.value
    });
  }
}