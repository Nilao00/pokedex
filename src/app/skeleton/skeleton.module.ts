import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkeletonPageRoutingModule } from './skeleton-routing.module';

import { SkeletonPage } from './skeleton.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonPageRoutingModule
  ],
  exports: [SkeletonPage],
  declarations: [SkeletonPage]
})
export class SkeletonPageModule { }
