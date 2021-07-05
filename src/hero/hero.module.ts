import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from './hero.service';
import { HeroListComponent } from './containers/hero-list/hero-list.component';
import { HeroListRecordComponent } from './components/hero-list-record/hero-list-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeroAddFormComponent } from './components/hero-add-form/hero-add-form.component';
import { HeroEditFormComponent } from './components/hero-edit-form/hero-edit-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [
    HeroListComponent,
    HeroListRecordComponent,
    HeroAddFormComponent,
    HeroEditFormComponent
  ],
  providers: [HeroService],
  exports: [HeroListComponent]
})
export class HeroModule {}
