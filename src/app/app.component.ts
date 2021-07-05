import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { HeroFacade } from '../hero/hero.facade';
import { HeroModel } from '../hero/models/hero.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private heroFacade: HeroFacade) {}

  public add(): void {
    const hero = new HeroModel('Vladimir');

    this.heroFacade
      .addHero(hero)
      .pipe(take(1))
      .subscribe();
  }
}
