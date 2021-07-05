import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-edit-form',
  templateUrl: './hero-edit-form.component.html',
  styleUrls: ['./hero-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroEditFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<HeroModel>();
  @Input() hero: HeroModel;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
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
