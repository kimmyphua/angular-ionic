import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Pokemon } from 'src/app/Pokemon'
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
private apiUrl = 'http://localhost:6060/pokemon';
public subject = new Subject<any>();
public id : number = 133;

  constructor(private http: HttpClient) { }

  getData(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.apiUrl)
  }

  deleteData(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.apiUrl}/${pokemon.id}`;
    return this.http.delete<Pokemon>(url);
  }

  updateData(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.apiUrl}/${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon, httpOptions);
  }

  addData(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.apiUrl, pokemon, httpOptions);
  }

  getList(limit:number, offset:number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  }

  getOne(name: string) {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }

  getDetails(id:number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
  }


  setPokemonDetails(id:number) {
    this.id = id
    this.subject.next(this.id)
    
  }

  onClickPokemon(): Observable<any>{
    console.log(this.id)
    return this.subject.asObservable();
  }
}
