import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeroModel } from '../models/hero.model';

@Injectable()
export class HeroState {
  private pending$ = new BehaviorSubject<boolean>(false);
  private heroes$ = new BehaviorSubject<HeroModel[]>([]);

  isPending$() {
    return this.pending$.asObservable();
  }

  setPending(isPending: boolean) {
    this.pending$.next(isPending);
  }

  getHeroes$() {
    return this.heroes$.asObservable();
  }

  setHeroes(heroes: HeroModel[]) {
    this.heroes$.next(heroes);
  }

  addHero(hero: HeroModel) {
    const currentValue = this.heroes$.getValue();
    this.heroes$.next([...currentValue, hero]);
  }

  updateHero(updatedhero: HeroModel) {
    const heroes = this.heroes$.getValue();
    const indexOfUpdated = heroes.findIndex(hero => hero.id === updatedhero.id);
    heroes[indexOfUpdated] = updatedhero;
    this.heroes$.next([...heroes]);
  }

  removeHero(heroRemove: HeroModel) {
    const currentValue = this.heroes$.getValue();
    this.heroes$.next(currentValue.filter(hero => hero !== heroRemove));
  }
}
