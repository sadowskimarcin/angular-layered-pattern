import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroFacade } from '../../hero.facade';
import { HeroAddData } from '../../models/hero-add-data';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent {
  public heroes$: Observable<HeroModel[]> = this.heroFacade.getHeroes$();
  public isPending$: Observable<boolean> = this.heroFacade.isPending$();

  constructor(private heroFacade: HeroFacade) {
    this.heroFacade.loadHeroes();
  }

  public addHero(heroData: HeroAddData): void {
    const hero = new HeroModel(heroData.title);

    this.heroFacade.addHero(hero);
  }

  public removeHero(hero: HeroModel): void {
    this.heroFacade.removeHero(hero);
  }

  public updateHero(hero: HeroModel): void {
    this.heroFacade.updateHero(hero);
  }
}
