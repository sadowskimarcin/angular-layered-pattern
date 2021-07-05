import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero-list-record',
  templateUrl: './hero-list-record.component.html',
  styleUrls: ['./hero-list-record.component.scss']
})
export class HeroListRecordComponent {
  @Input() public hero: HeroModel;
  @Output() public update = new EventEmitter<HeroModel>();
  @Output() public remove = new EventEmitter<HeroModel>();

  public updateHero(): void {
    this.update.emit(this.hero);
  }

  public removeHero(): void {
    this.remove.emit(this.hero);
  }
}
