import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { HeroService } from './hero.service';
import { HeroModel } from './models/hero.model';
import { HeroState } from './state/hero.state';

@Injectable()
export class HeroFacade {
  constructor(private heroService: HeroService, private heroState: HeroState) {}

  public isPending$(): Observable<boolean> {
    return this.heroState.isPending$();
  }

  public getHeroes$(): Observable<HeroModel[]> {
    return this.heroState.getHeroes$();
  }

  public loadHeroes(): Observable<HeroModel[]> {
    return this.heroService
      .getHeroes()
      .pipe(tap(heroes => this.heroState.setHeroes(heroes)));
  }

  public updateHero(hero: HeroModel): Observable<HeroModel> {
    this.heroState.setPending(true);
    return this.heroService.updateHero(hero).pipe(
      tap(updatedHero => this.heroState.updateHero(updatedHero)),
      finalize(() => this.heroState.setPending(false))
    );
  }

  public addHero(hero: HeroModel): Observable<HeroModel> {
    this.heroState.setPending(true);
    return this.heroService.addHero(hero).pipe(
      tap(newHero => this.heroState.addHero(newHero)),
      finalize(() => this.heroState.setPending(false))
    );
  }

  public removeHero(hero: HeroModel): Observable<HeroModel> {
    this.heroState.setPending(true);
    return this.heroService.removeHero(hero).pipe(
      tap(() => this.heroState.removeHero(hero)),
      finalize(() => this.heroState.setPending(false))
    );
  }
}
