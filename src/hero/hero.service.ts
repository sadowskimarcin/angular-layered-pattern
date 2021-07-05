import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroModel } from './models/hero.model';

@Injectable()
export class HeroService {
  private apiUrl = 'https://60e2b8149103bd0017b474cc.mockapi.io/';

  constructor(private http: HttpClient) {}

  public getHeroes(): Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.apiUrl + 'hero');
  }

  public addHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.post<HeroModel>(this.apiUrl + 'hero', {
      ...hero
    });
  }

  public updateHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.put<HeroModel>(this.apiUrl + 'hero/' + hero.id, {
      name: hero.name
    });
  }
}
