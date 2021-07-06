import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, EMPTY, map, of } from 'rxjs';
import { HeroModel } from './models/hero.model';

@Injectable()
export class HeroFireService {
  constructor(private firestore: AngularFirestore) {}

  public getHeroes(): Observable<HeroModel[]> {
    return this.firestore
      .collection<any>('heroes')
      .valueChanges({ idField: 'id' });
  }

  public addHero(hero: HeroModel): Observable<HeroModel> {
    return EMPTY;
  }

  public updateHero(hero: HeroModel): Observable<HeroModel> {
    return EMPTY;
  }

  public removeHero(hero: HeroModel): Observable<HeroModel> {
    return EMPTY;
  }
}
