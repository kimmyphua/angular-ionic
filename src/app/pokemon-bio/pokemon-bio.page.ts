import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-bio',
  templateUrl: './pokemon-bio.page.html',
  styleUrls: ['./pokemon-bio.page.scss'],
})
export class PokemonBioPage implements OnInit {
  subscription : Subscription;
  // id:number
  info = []
  evolution = []
  constructor(public dataService : DataService,private http: HttpClient) {
    // this.subscription = this.dataService.onClickPokemon().subscribe((id)=> (this.id = id))
   }

  async ngOnInit() {

     await this.getMoreDetails()

  }


  async getMoreDetails() {
    
    return await this.dataService.getDetails(this.dataService.id).subscribe((res:any) => {
      this.info.push(res)
      console.log(this.info)
      this.http.get(res.evolution_chain.url).subscribe((response:any) => {
        this.evolution.push(response)
        console.log(response)
      })
    })

    
  }

}
