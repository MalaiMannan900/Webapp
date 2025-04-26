import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class serverLocations {
  apiServerAddress: any;
  constructor( ) {
    
    if (window.location.hostname === 'localhost') {
      this.apiServerAddress = 'http://localhost:8040/';
    } else {
      this.apiServerAddress = 'https://your-production-api.com/'; 
    }
    
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];