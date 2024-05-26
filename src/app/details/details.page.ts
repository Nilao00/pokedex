import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  objetoRecebido: any;
  
  constructor(private route: ActivatedRoute) { }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params['objectInfoPokemon']) {
        this.objetoRecebido = JSON.parse(params['objectInfoPokemon']);
        console.log(this.objetoRecebido)
      }
    });
  }

  ngOnInit() { }


}
