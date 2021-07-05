import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroModel } from '../models/hero.model';

@Injectable()
export class HeroState {
  private pending$ = new BehaviorSubject<boolean>(false);
  private heroes$ = new BehaviorSubject<HeroModel[]>([]);

  public isPending$(): Observable<boolean> {
    return this.pending$.asObservable();
  }

  public setPending(isPending: boolean): void {
    this.pending$.next(isPending);
  }

  public getHeroes$(): Observable<HeroModel[]> {
    return this.heroes$.asObservable();
  }

  public setHeroes(heroes: HeroModel[]): void {
    this.heroes$.next(heroes);
  }

  public addHero(hero: HeroModel): void {
    const currentValue = this.heroes$.getValue();
    this.heroes$.next([...currentValue, hero]);
  }

  public updateHero(updatedhero: HeroModel): void {
    const heroes = this.heroes$.getValue();
    const indexOfUpdated = heroes.findIndex(hero => hero.id === updatedhero.id);
    heroes[indexOfUpdated] = updatedhero;
    this.heroes$.next([...heroes]);
  }

  public removeHero(heroRemove: HeroModel): void {
    const currentValue = this.heroes$.getValue();
    this.heroes$.next(currentValue.filter(hero => hero !== heroRemove));
  }
}
