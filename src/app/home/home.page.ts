import { Component, TemplateRef, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { orderBy } from 'lodash';
import { pokemonPros } from './Interfaces/pokemon';
import { ErrorHttpHandle } from 'src/service/HttpErrors/ErrorHttpHandle';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  limit: number = 20;
  total: number = 0;
  offset: number = 0;
  search: string = "";
  loading: boolean = false;
  objectParams: any = null;
  pokemonsPros: pokemonPros | null = null;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  informationsResult:
    [{
      name: string;
      url: string;
    }] | null
    =
    null
  imagePathNotFound = '../assets/images/notfound.jpg';
  results: {
    name: string,
    url: string,
    types: [{ type: string }],
    moves?: [{ move: { name: string } }],
    height?: number,
    weight?: number
  }[] =
    [{
      name: "", url: "", types: [{ type: "" }]
    }];
  constructor(
    private service: ApiService,
    private erroHttpHandle: ErrorHttpHandle,
    private nav: NavController,
  ) {
  }

  ionViewDidEnter() {
    this.results = [];
    this.listPokemons();
  }

  listPokemons(event?: any) {
    this.loading = true;
    this.service.methodGet<pokemonPros | null>(`pokemon?limit=${this.limit}&offset=${this.offset}`).pipe(
      catchError(this.erroHttpHandle.handleError)
    ).subscribe((data: pokemonPros | null) => {
      this.informationsResult = data?.results || null;
      this.total = data?.count || 0;
      this.informationsResult?.forEach((pokemon) => {
        this.getDetailsPokemon(pokemon.name, false, false);
      })
      this.loading = false;
    })
  }

  changeForClear(search: any) {
    if (!search) {
      this.results = [];
      this.offset = 0;
      this.listPokemons();
    }
  }

  getDetailsPokemon(name: string, isSearch?: boolean, isDeailsPage?: boolean) {

    if (!name) {
      return;
    }

    this.service.methodGet<{
      sprites: { front_default: string },
      types: [{ type: string }],
      moves?: [{ move: { name: string } }],
      height?: number,
      weight?: number,
    }>(`pokemon/${name}`).pipe(
      catchError(this.erroHttpHandle.handleError)
    ).toPromise().then((data) => {

      if (isDeailsPage) {
        this.nav.navigateForward("details", {
          queryParams: {
            objectInfoPokemon: JSON.stringify(data)
          }
        });
        return;
      }

      if (!isSearch) {
        this.results.push({
          name,
          url: data?.sprites.front_default || "",
          types: data?.types || [{ type: "" }],
          moves: data?.moves || [{ move: { name: "" } }],
          height: 0,
          weight: 0
        });
        this.results = orderBy(this.results.filter((info) => info.name != ""), ['name'], "asc");
        return;
      }
      this.results = [];
      this.results.push({
        name,
        url: data?.sprites.front_default || "",
        types: data?.types || [{ type: "" }],
        moves: data?.moves || [{ move: { name: "" } }],
        height: 0,
        weight: 0
      });
      this.results = orderBy(this.results.filter((info) => info.name != ""), ['name'], "asc");
    }).catch(() => {
      this.results = [];
    })
  }

  doInfinite(event?: any) {
    this.offset += 20;
    setTimeout(() => {
      event.target.complete();
      this.listPokemons(event);
      if (this.results.length == this.total) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
