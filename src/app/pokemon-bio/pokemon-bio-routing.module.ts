import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonBioPage } from './pokemon-bio.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonBioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonBioPageRoutingModule {}
