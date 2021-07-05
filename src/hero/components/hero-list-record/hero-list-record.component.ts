import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroEditData } from '../../models/hero-edit-data';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list-record',
  templateUrl: './hero-list-record.component.html',
  styleUrls: ['./hero-list-record.component.scss']
})
export class HeroListRecordComponent {
  @Input() public hero: HeroModel;
  @Output() public update = new EventEmitter<HeroEditData>();
  @Output() public remove = new EventEmitter<HeroModel>();

  public updateHero(hero: HeroEditData): void {
    this.update.emit(hero);
  }

  public removeHero(): void {
    this.remove.emit(this.hero);
  }
}
