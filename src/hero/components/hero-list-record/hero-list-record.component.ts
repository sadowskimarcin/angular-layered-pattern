import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../../hero.service';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list-record',
  templateUrl: './hero-list-record.component.html',
  styleUrls: ['./hero-list-record.component.scss']
})
export class HeroListRecordComponent implements OnInit {
  @Input() public hero: HeroModel;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.hero.name, Validators.required]
    });
  }

  public update(): void {
    this.hero.name = this.form.get('name').value;

    this.heroService.updateHero(this.hero).subscribe(heros => {
      console.log(heros);
    });
  }
}
