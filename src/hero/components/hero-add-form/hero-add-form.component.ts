import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroAddData } from '../../models/hero-add-data';

@Component({
  selector: 'app-hero-add-form',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']
})
export class HeroAddFormComponent {
  @Output() submitForm = new EventEmitter<HeroAddData>();
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

    nameControl.setValue('');
  }
}