import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HeroFacade } from '../../hero.facade';
import { HeroAddData } from '../../models/hero-add-data';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {
  public heroes$: Observable<HeroModel[]> = this.heroFacade.getHeroes$();
  public isPending$: Observable<boolean> = this.heroFacade.isPending$();

  constructor(private heroFacade: HeroFacade) {
    this.heroFacade.loadHeroes().toPromise();
  }

  public addHero(heroData: HeroAddData): void {
    const hero = new HeroModel(heroData.name);
    this.heroFacade.addHero(hero).toPromise();
  }

  public removeHero(hero: HeroModel): void {
    this.heroFacade.removeHero(hero).toPromise();
  }

  public updateHero(hero: HeroModel): void {
    this.heroFacade
      .updateHero(hero)
      .pipe(take(1))
      .subscribe(hero => {
        console.log('update success', hero);
      });
  }
}
