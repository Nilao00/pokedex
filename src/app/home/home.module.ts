import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SkeletonPageModule } from '../skeleton/skeleton.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SkeletonPageModule
  ],
  declarations: [HomePage],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomePageModule { }
