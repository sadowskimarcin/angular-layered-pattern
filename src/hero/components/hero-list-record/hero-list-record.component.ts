import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list-record',
  templateUrl: './hero-list-record.component.html',
  styleUrls: ['./hero-list-record.component.scss']
})
export class HeroListRecordComponent implements OnInit {
  @Input() public hero: HeroModel;
  @Output() public update = new EventEmitter<HeroModel>();
  @Output() public remove = new EventEmitter<HeroModel>();
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.hero.name, Validators.required]
    });
  }

  public updateHero(): void {
    this.hero.name = this.form.get('name').value;
    this.update.emit(this.hero);
  }

  public removeHero(): void {
    this.remove.emit(this.hero);
  }
}
