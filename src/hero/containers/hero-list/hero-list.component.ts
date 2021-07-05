import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HeroFacade } from '../../hero.facade';
import { HeroAddData } from '../../models/hero-add-data';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnDestroy {
  public heroes$: Observable<HeroModel[]> = this.heroFacade.getHeroes$();
  public isPending$: Observable<boolean> = this.heroFacade.isPending$();

  private subscription = new Subscription();

  constructor(private heroFacade: HeroFacade) {
    this.subscription.add(this.heroFacade.loadHeroes().subscribe());
  }

  public addHero(heroData: HeroAddData): void {
    const hero = new HeroModel(heroData.name);

    this.subscription.add(this.heroFacade.addHero(hero).subscribe());
  }

  public removeHero(hero: HeroModel): void {
    this.subscription.add(this.heroFacade.removeHero(hero).subscribe());
  }

  public updateHero(hero: HeroModel): void {
    this.subscription.add(
      this.heroFacade.updateHero(hero).subscribe(hero => {
        console.log('update success', hero);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
