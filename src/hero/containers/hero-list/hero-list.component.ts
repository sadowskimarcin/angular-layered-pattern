import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
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
  public isPending = false;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.isPending = true;

    this.subscription.add(
      this.heroService
        .getHeroes()
        .pipe(
          take(1),
          finalize(() => (this.isPending = false))
        )
        .subscribe(heroes => {
          this.heroes = heroes;
        })
    );
  }

  public addHero(): void {
    const nameControl = this.form.get('name');
    const hero = new HeroModel(nameControl.value);

    this.isPending = true;
    this.subscription.add(
      this.heroService
        .addHero(hero)
        .pipe(finalize(() => (this.isPending = false)))
        .subscribe(newHero => {
          this.heroes.push(newHero);
        })
    );
    nameControl.setValue('');
  }

  public removeHero(hero: HeroModel): void {
    this.isPending = true;

    this.subscription.add(
      this.heroService
        .removeHero(hero)
        .pipe(finalize(() => (this.isPending = false)))
        .subscribe(() => {
          this.heroes = this.heroes.filter(val => val.id !== hero.id);
        })
    );
  }

  public updateHero(hero: HeroModel): void {
    this.isPending = true;

    this.subscription.add(
      this.heroService
        .updateHero(hero)
        .pipe(finalize(() => (this.isPending = false)))
        .subscribe(hero => {
          console.log('update success', hero);
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
