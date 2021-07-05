import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HeroService } from '../../hero.service';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnDestroy {
  public heroes: HeroModel[] = [];
  public form: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.subscription.add(
      this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes;
      })
    );
  }

  public addHero(): void {
    const nameControl = this.form.get('name');

    const hero = new HeroModel(nameControl.value);

    this.heroService
      .addHero(hero)
      .pipe(take(1))
      .subscribe(heros => {
        this.heroes.push(heros);
      });

    nameControl.setValue('');
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
