import { Component } from '@angular/core';
import { HeroFacade } from '../hero/hero.facade';
import { HeroModel } from '../hero/models/hero.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private heroFacade: HeroFacade) {}

  public addHero(): void {
    const hero = new HeroModel('Vladimir');

    this.heroFacade.addHero(hero);
  }
}
