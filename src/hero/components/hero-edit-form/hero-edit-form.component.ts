import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-edit-form',
  templateUrl: './hero-edit-form.component.html',
  styleUrls: ['./hero-edit-form.component.css']
})
export class HeroEditFormComponent {
  @Output() submitForm = new EventEmitter<HeroModel>();
  @Input() hero: HeroModel;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [this.hero.name, Validators.required]
    });
  }

  public submit(): void {
    this.submitForm.emit({
      ...this.hero,
      name: this.form.get('name').value
    });
  }
}
