import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from './hero.service';
import { HeroListComponent } from './containers/hero-list/hero-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  declarations: [HeroListComponent],
  providers: [HeroService],
  exports: [HeroListComponent]
})
export class HeroModule {}
