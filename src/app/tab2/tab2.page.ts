import { EventEmitter,Component,Output ,OnInit} from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  form = []
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  text!: string;
  searchText: string = "";

  constructor() {}

  places = [
      "Amsterdam",
      "Bogota",
      "Buenos Aires",
      "Cairo",
      "Dhaka",
      "Edinburgh",
      "Geneva",
      "Genoa",
      "Glasgow",
      "Hanoi",
      "Hong Kong",
      "Islamabad",
      "Istanbul",
      "Jakarta",
      "Kiel",
      "Kyoto",
      "Le Havre",
      "Lebanon",
      "Lhasa",
      "Lima",
      "London",
      "Los Angeles",
      "Madrid",
      "Manila",
      "New York",
      "Olympia",
      "Oslo",
      "Panama City",
      "Peking",
      "Philadelphia",
      "San Francisco",
      "Seoul",
      "Taipeh",
      "Tel Aviv",
      "Tokio",
      "Uelzen",
      "Washington"
];
filteredPlaces = [];
  

  ngOnInit() {
    return this.places.forEach(i => this.filteredPlaces.push(i))
  }

  filter() {
    if(this.searchText === "" || null){
      console.log(this.filteredPlaces)
      console.log(this.searchText)
      this.filteredPlaces = []
     this.places.forEach(i => this.filteredPlaces.push(i))
     return ;
    } else {
      console.log(this.searchText)
      console.log(this.filteredPlaces)
      this.filteredPlaces = []
      this.places.forEach(i => 
      i.toLowerCase().includes(this.searchText.toLowerCase()) ? this.filteredPlaces.push(i) : "")
      return 
    }
  }

  onSubmit() {
    if (!this.text) {
      alert('Please write something!');
      return;
    }
    
    const item = {
      text: this.text,
      // day: this.day,
      // reminder: this.reminder,
    };
    
    this.onAdd.emit(item);
    
    this.text = '';
    // this.day = '';
    // this.reminder = false;

    this.form.push(item)
    }


}
