import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HeroFacade } from '../../hero.facade';
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

  constructor(
    private heroFacade: HeroFacade,
    private heroService: HeroService
  ) {
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
        const heroIndex = this.heroes.findIndex(val => val.id === hero.id);
        delete this.heroes[heroIndex];
      })
    );
  }

  public updateHero(hero: HeroModel): void {
    this.subscription.add(this.heroService.updateHero(hero).subscribe());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
