import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { CountriesComponent } from './countries/countries.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'}, 
    {path : 'countries', component : CountriesComponent},
];
