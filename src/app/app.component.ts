import { Component, OnInit } from '@angular/core';
import { HeroFireService } from '../hero/hero-fire.service';
import { HeroFacade } from '../hero/hero.facade';
import { HeroAddData } from '../hero/models/hero-add-data';
import { HeroModel } from '../hero/models/hero.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public heroes$ = this.heroFacade.getHeroes$();

  constructor(private heroFacade: HeroFacade) {}

  public addHero(heroData: HeroAddData): void {
    const hero = new HeroModel(heroData.name);

    this.heroFacade.addHero(hero);
  }
}
