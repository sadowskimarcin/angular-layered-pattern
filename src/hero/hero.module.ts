import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from './hero.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [HeroService]
})
export class HeroModule {}
