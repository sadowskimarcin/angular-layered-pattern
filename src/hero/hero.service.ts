import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroModel } from './models/hero.model';

@Injectable()
export class HeroService {
  // private apiUrl = 'https://60e2b8149103bd0017b474cc.mockapi.io/';
  // private apiUrl = 'https://sadowskimarcin.free.beeceptor.com/';
  private apiUrl = 'https://jsonplaceholder.typicode.com/';
  public heroes: HeroModel[] = [];

  constructor(private http: HttpClient) {}

  public getHeroes(): Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.apiUrl + 'todos', {
      params: {
        _limit: 10
      }
    });
  }

  public addHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.post<HeroModel>(this.apiUrl + 'todos', {
      ...hero
    });
  }

  public updateHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.put<HeroModel>(this.apiUrl + 'todos/' + hero.id, {
      title: hero.title
    });
  }

  public removeHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.delete<HeroModel>(this.apiUrl + 'todos/' + hero.id);
  }
}
