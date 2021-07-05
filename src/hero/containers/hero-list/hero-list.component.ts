import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  private subscription = new Subscription();

  constructor(private heroService: HeroService) {
    this.subscription.add(
      this.heroService
        .getHeroes()
        .pipe(take(1))
        .subscribe(heroes => {
          this.heroes = heroes;
        })
    );
  }

  public addHero(heroData: HeroAddData): void {
    const hero = new HeroModel(heroData.name);

    this.heroService
      .addHero(hero)
      .pipe(take(1))
      .subscribe(newHero => {
        this.heroes.push(newHero);
      });
  }

  public removeHero(hero: HeroModel): void {
    this.subscription.add(
      this.heroService.removeHero(hero).subscribe(() => {
        this.heroes = this.heroes.filter(val => val.id !== hero.id);
      })
    );
  }

  public updateHero(hero: HeroModel): void {
    this.subscription.add(
      this.heroService.updateHero(hero).subscribe(hero => {
        console.log('update success', hero);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
