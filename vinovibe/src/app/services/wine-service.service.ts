import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private baseUrl = 'https://wineapiservice.onrender.com/wine';

  constructor(private http: HttpClient) {}

  getWines(itemInicio: number, itemFim: number): Observable<any> {
    const token = sessionStorage.getItem('token_api');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/buscalAllWine?itemInicio=${itemInicio}&itemFim=${itemFim}`, { headers });
  }
}
