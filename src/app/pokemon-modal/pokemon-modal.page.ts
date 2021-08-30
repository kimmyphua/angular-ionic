import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.page.html',
  styleUrls: ['./pokemon-modal.page.scss'],
})
export class PokemonModalPage implements OnInit {

  @Input() pokemon = [];
  math = Math;
  id: number;
  info:any = [];
  subscription : Subscription;

  constructor(public modalController: ModalController, private router: Router, public dataService : DataService) {
    this.subscription = this.dataService.onClickPokemon().subscribe((id)=> (this.id = id))
   }

  async fullDetails(id:number) {
    
    // await this.dataService.getDetails(id).subscribe((res:any) => {
    //   this.info.push(res)
    //   console.log(this.info)
    // })
    await this.dataService.setPokemonDetails(id)
    // console.log(id)
   
    this.dismiss()
    return this.router.navigate(['/pokemon-bio'])
  }


  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
       this.modalController.dismiss({
      'dismissed': true
    });
  }

}
