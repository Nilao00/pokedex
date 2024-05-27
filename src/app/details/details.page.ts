import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  objetoRecebido: any;
  isAlertOpen = false;
  msgInfo: string = "";
  alertButtons = ['OK'];
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params['objectInfoPokemon']) {
        this.objetoRecebido = JSON.parse(params['objectInfoPokemon']);
      }
    });
  }

  dimissAlert(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  ngOnInit() { }

  ionViewDidEnter() {
    if (localStorage.getItem("favorites")) {
      const infos = JSON.parse(localStorage.getItem("favorites") || '');
      if (infos?.some((value: any) => this.objetoRecebido.id == value?.id)) {
        this.isFavorite = true;
      }
    }
  }

  addFavorite(isOpen: boolean) {
    if (localStorage.getItem("favorites")) {
      const getValues = [...JSON.parse(localStorage.getItem("favorites") || ''), this.objetoRecebido];
      localStorage.setItem("favorites", JSON.stringify(getValues));
      this.msgInfo = "Pokémon adicionado a lista de favorito";
      this.isAlertOpen = isOpen;
      this.isFavorite = true;
      return;
    }
    localStorage.setItem("favorites", JSON.stringify([this.objetoRecebido]));
    this.msgInfo = "Pokémon adicionado a lista de favorito";
    this.isAlertOpen = isOpen;
    this.isFavorite = true;
  }

  removeFavorite(isOpen: boolean) {
    if (localStorage.getItem("favorites")) {
      const infos = JSON.parse(localStorage.getItem("favorites") || '');
      infos?.map((value: any, index: number) => {
        if (this.objetoRecebido.id == value?.id) {
          infos.splice(index, 1);
        }
      })
      localStorage.setItem("favorites", JSON.stringify(infos));
      this.msgInfo = "Pokemon removido da lista de favorito";
      this.isAlertOpen = isOpen;
      this.isFavorite = false;
      return;
    }
  }
}
