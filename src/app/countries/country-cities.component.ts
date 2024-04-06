import { Component } from '@angular/core';
import { CountryCities } from './country-cities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-country-cities',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './country-cities.component.html',
  styleUrl: './country-cities.component.css'
})
export class CountryCitiesComponent {
  public countryCities: CountryCities[] = [];
  public displayedColumns : string[] = ['cityId','latitude','longitude','name','population'];
  id: number;
  constructor(private http: HttpClient, private activedRoute : ActivatedRoute){
    this.id = -1;
  }

      ngOnInit(){
        this.getCountryCities();
      }
      
      getCountryCities() {
        let idParam = this.activedRoute.snapshot.paramMap.get("id");
        this.id = idParam ? +idParam : 0;
        this.http.get<CountryCities[]>(`${environment.baseUrl}api/Countries/CountryCities/${this.id}`).subscribe(
          {
            next: result => this.countryCities = result,
            error: error => console.log(error)
          }
        );
      }
}
