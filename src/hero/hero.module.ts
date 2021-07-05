import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from './hero.service';
import { HeroListComponent } from './containers/hero-list/hero-list.component';
import { HeroListRecordComponent } from './components/hero-list-record/hero-list-record.component';
import { HeroAddComponent } from './components/hero-add/hero-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [HeroListComponent, HeroListRecordComponent, HeroAddComponent],
  providers: [HeroService],
  exports: [HeroListComponent]
})
export class HeroModule {}
