import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from './hero.service';
import { HeroListComponent } from './containers/hero-list/hero-list.component';
import { HeroListRecordComponent } from './components/hero-list-record/hero-list-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeroFacade } from './hero.facade';
import { HeroAddComponent } from './components/hero-add/hero-add.component';
import { HeroEditFormComponent } from './components/hero-edit-form/hero-edit-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [
    HeroListComponent,
    HeroAddComponent,
    HeroEditFormComponent,
    HeroListRecordComponent
  ],
  providers: [HeroService, HeroFacade],
  exports: [HeroListComponent]
})
export class HeroModule {}
