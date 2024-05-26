import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favorites: any[];

  constructor() {
    this.favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
  }

  ngOnInit() {
  }

}
