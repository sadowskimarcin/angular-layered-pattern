import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { HeroService } from '../../hero.service';
import { HeroAddData } from '../../models/hero-add-data';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnDestroy {
  public heroes: HeroModel[] = [];
  public isPending = false;
  private subscription = new Subscription();

  constructor(private heroService: HeroService) {
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

  public addHero(heroData: HeroAddData): void {
    const hero = new HeroModel(heroData.name);
    this.isPending = true;

    this.subscription.add(
      this.heroService
        .addHero(hero)
        .pipe(finalize(() => (this.isPending = false)))
        .subscribe(newHero => {
          this.heroes.push(newHero);
        })
    );
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
