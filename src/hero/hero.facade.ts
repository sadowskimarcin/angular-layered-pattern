import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { HeroFireService } from './hero-fire.service';
import { HeroService } from './hero.service';
import { HeroModel } from './models/hero.model';
import { HeroState } from './state/hero.state';

@Injectable()
export class HeroFacade {
  constructor(
    // private heroService: HeroService,
    private heroService: HeroFireService,
    private heroState: HeroState
  ) {}

  public isPending$(): Observable<boolean> {
    return this.heroState.isPending$();
  }

  public getHeroes$(): Observable<HeroModel[]> {
    return this.heroState.getHeroes$();
  }

  public loadHeroes(): void {
    this.heroState.setPending(true);
    this.heroService
      .getHeroes()
      .pipe(finalize(() => this.heroState.setPending(false)))
      .subscribe(
        heroes => this.heroState.setHeroes(heroes),
        error => this.handleError(error),
        () => this.heroState.setPending(false)
      );
  }

  public updateHero(hero: HeroModel): void {
    this.heroState.setPending(true);
    this.heroService
      .updateHero(hero)
      .pipe(finalize(() => this.heroState.setPending(false)))
      .subscribe(
        updatedHero => this.heroState.updateHero(updatedHero),
        error => this.handleError(error),
        () => this.heroState.setPending(false)
      );
  }

  public addHero(hero: HeroModel): void {
    this.heroState.setPending(true);
    this.heroService
      .addHero(hero)
      .pipe(finalize(() => this.heroState.setPending(false)))
      .subscribe(
        newHero => this.heroState.addHero(newHero),
        error => this.handleError(error),
        () => this.heroState.setPending(false)
      );
  }

  public removeHero(hero: HeroModel): void {
    this.heroState.setPending(true);
    this.heroService
      .removeHero(hero)
      .pipe(finalize(() => this.heroState.setPending(false)))
      .subscribe(
        () => this.heroState.removeHero(hero),
        error => this.handleError(error)
      );
  }

  private handleError(error: string): void {
    console.log(error);
  }
}
