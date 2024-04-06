import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryCitiesComponent } from './countries/country-cities.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'}, 
    {path : 'countries', component : CountriesComponent},
    {path : 'countryCities/:id', component : CountryCitiesComponent},
];
