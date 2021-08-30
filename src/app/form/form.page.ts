import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { DataService } from '../data.service';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  pokemon: Pokemon[] = [];
  id: number;
  name: string;
  description: string;
  favourite: boolean ;
  type = [];
  arr = [];
  searchText: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((pokemon) => (this.pokemon = pokemon));

  }

  deletePokemon(pokemon: Pokemon) {
    this.dataService
      .deleteData(pokemon)
      .subscribe(
        () => (this.pokemon = this.pokemon.filter((t) => t.id !== pokemon.id))
      );
  }
  togglePokemon(pokemon: Pokemon) {
    pokemon.favourite = !pokemon.favourite;
    this.dataService.updateData(pokemon).subscribe();
  }

  async onSubmit() {
    if (!this.name || !this.id) {
      alert('Please add a name and ID!');
      return;
    }
    if(this.pokemon.filter((t) => t.id === this.id)){
      alert("ID TAKEN!!!! Please change ID")
      return
    }
    this.type.forEach((i) => this.arr.push(i));

    const newPoke = {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.arr,
      favourite: this.favourite,
    };
    console.log(newPoke);

    try {
      await this.dataService
      .addData(newPoke)
      .subscribe((pokemon) => this.pokemon.push(newPoke)); 
      
    this.id = null;
    this.name = '';
    this.description = '';
    this.type = [];
    this.favourite = false;
    } catch (error) {
      alert(error)
      console.log("err",error)

    }
    
  }

  filter() {
    if (this.searchText === '' || null) {
      this.dataService.getData().subscribe((pokemon) => (this.pokemon = pokemon));
      return;
    } else {  
      this.dataService.getData().subscribe(
        () => (this.pokemon = this.pokemon.filter((t) => t.name.toLowerCase().includes(this.searchText.toLowerCase())
      )))
      return;
  }
}
}
