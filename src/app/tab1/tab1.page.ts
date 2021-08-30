import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalController } from '@ionic/angular';
import { PokemonModalPage } from '../pokemon-modal/pokemon-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
data:any = [];
page:number = 0;
total: number;
selected:any= []
searchText:string = ""

styles = {

  "bug" : '#ab2',
  "poison" : "#a59",
  "normal" : "#aa9",
  "fire" : "#f42",
  "water" : "#39f",
  "electric" : "#fc3",
  "grass" : "#7c5",
  "ice" : "#6cf",
  "fighting" : "#b54",
  "ground" : "#db5",
  "flying" : "#89f",
  "psychic" : "#f59",
  "rock" : "#ba6",
  "ghost" : "#66b",
  "dragon" : "#76e",
  "dark" : "#754",
  "steel" : "#aab",
  "fairy" : "#e9e"

}
  constructor(public dataService: DataService, public modalController: ModalController) {}

  ngOnInit():void {
  this.getData()
  }

  async selectedPoke(name:string) {
    this.selected = []
    await this.dataService.getOne(name)
        .subscribe((response:any)=> {
          this.selected.push(response)
          console.log(this.selected)
        })
    console.log(this.selected)

    this.presentModal()
  }

  async getData() {
    this.data=[]
    if (this.searchText === '' || null) {
   return await this.dataService.getList(100, 0).subscribe((res:any) => {
      this.total = res.count
      res.results.forEach(element => {
        this.dataService.getOne(element.name)
        .subscribe((response:any)=> {
          this.data.push(response)
          this.data.sort((a,b)=> a.id-b.id)
        })
      });
    });
  } else {
    return await this.dataService.getList(900, 0).subscribe((res:any) => {
      
      res.results.forEach(element => {
        this.dataService.getOne(element.name)
        .subscribe((response:any)=> {
          if(response.name.toLowerCase().includes(this.searchText.toLowerCase()) || response.types[0].type.name.toLowerCase().includes(this.searchText.toLowerCase() || response.types[1].type.name.toLowerCase().includes(this.searchText.toLowerCase()))) {
            this.data.push(response)
            this.data.sort((a,b)=> a.id-b.id)
            this.total = this.data.length
          }
        })
      });
  })
  }
 
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PokemonModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        pokemon: this.selected

      }
    });
    return await modal.present();
  }



}
